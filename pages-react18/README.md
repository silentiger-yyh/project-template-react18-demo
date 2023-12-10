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
