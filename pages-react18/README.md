# 后台管理项目前端搭建模板

- react v18.2.0
- react-router-dom v5.3.4
- antd v5.12.1

基于函数组件方式

# 启动

```shell
npm i
npm start
```

# 问题记录

## 路由报错 Cannot read properties of undefined (reading 'push')

1. 方法一：使用 useHistory

   ```js
   import { useHistory } from "react-router-dom";
   //下面这句必须写在组件里面
   const history = useHistory();
   // 路由跳转的地方使用
   history.push("/path");
   ```

2. 方法二：使用 withRouter

   ```js
   import { withRouter } from "react-router-dom";
   props.histoty.push("/path");
   export default withRouter(Index);
   ```

## 关于动态渲染表单数据问题

在编辑页面需要获取数据填入表单中，这里不能使用 Form 组件的 initialValues 属性，因为它只会在第一次渲染时生效，后续更新不会渲染，不适合做动态数据（目前只发现表单数据无法动态渲染，Table 数据可以正常渲染）

**错误示例：**

```js
const [currentData, setCurrentData] = useState({});
getOneById(id)
  .then((res) => {
    console.log("数据", res.data);
    setCurrentData(res.data);
  })
  .catch((err) => {
    message.error(err.message);
  });

// 组件
<Form
  form={form}
  initialValues={currentData} // 这里只会在第一次进行渲染，后续数据的更新并不会造成重新渲染。所以，initialValues不适用于动态设置表单初始值。
>
  <Form.Item name="name" label="商品名称">
    <Input placeholder="请输入商品名称" />
  </Form.Item>
</Form>;
```

**正确示例：**

```js
// 先导入
import { Form } from "antd";
// 函数组件中
const [form] = Form.useForm();
useEffect(() => {
  getOneById(id)
    .then((res) => {
      console.log("数据", res.data);
      form.setFieldsValue(res.data); // 使用form的setFieldsValue方法设置属性
    })
    .catch((err) => {
      message.error(err.message);
    });
}, []);
```

## 如何跨组件传参（状态存储库的使用）

需要几个插件：

> - redux：
> - react-redux：用作 react 和 redux 关联
> - redux-thunk：做异步请求的

18.x新版中被`@reduxjs/toolkit`替代，只需要安装：

```sh
npm install @reduxjs/toolkit react-redux
```

**场景：notice组件中全部已读，frame 组件中的用户名上面的小红点取消**

第一步：定义slice，创建noticSlice.js

```js
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    isAllRead: false
};
export const noticeSlice = createSlice({
    name: "noticeSlice", // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
    initialState: initialState,
    reducers: {
        // reducer函数 state当前组件的数据
        //第二个参数为{payload:{},type:"""}
        increment(state) {
            state.count ++;
            state.isAllRead = false
        },
        // 标记已读
        decrement(state) {
            if (state.count > 0) {
                state.count --;
                if (state.count === 0) {
                    state.isAllRead = true
                }
            }else {
                state.isAllRead = true
            }
        },
        readAll(state) {
            state.count = 0;
            state.isAllRead = true;
        },
        setNotice(state, {payload}) {
            state.count = payload.count
            if (payload.count > 0) {
                state.isAllRead = false
            }
        }
    },
});
export const { increment, decrement,readAll,setNotice} = noticeSlice.actions;
export const selectCount = (state) => state.noticeSlice.count;
export const selectIsAllRead = (state) => state.noticeSlice.isAllRead;
export default noticeSlice.reducer;

```

第二步：src 目录下创建 store.js 文件

```js
import { configureStore } from "@reduxjs/toolkit";
import noticeSlice from "./actions/noticeSlice";
export default  configureStore({
  reducer: {
    noticeSlice
  }
})
```

**第三步**：在 src 的 index.js 中使用 Provider 包裹组件

```react
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Switch>
          <Route
            path="/admin"
          />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </React.StrictMode>
  </Provider>
);
reportWebVitals();
```

第四步：在notice组件中使用

```react
import {useDispatch, useSelector} from "react-redux";

const count = useSelector(selectCount)
const isAllRead = useSelector(selectIsAllRead)
const dispatch = useDispatch()
// 初始化通知数量
useEffect(() => {
    // 这里可以做异步接口请求
    dispatch(setNotice({count:50}))
}, []);
return (
    <Card title="通知中心" extra={<Button size="small" onClick={() => dispatch(readAll())}>全部标记为已读</Button>}>
        {count}
        {/*<Button size="small" onClick={() => dispatch(increment())}>+1</Button>*/}
        <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{display: "flex", alignContent: "space-between"}}>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    <Button size="small" onClick={() => dispatch(decrement())}>标记为已读</Button>
                </List.Item>
            )}
        />
    </Card>
);
```

第五步：在frame组件中使用

```react
<Badge dot={!useSelector(selectIsAllRead)}>
  <span>管理员</span>
</Badge>
```
