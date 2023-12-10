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
