import React from "react";
import ReactDOM from "react-dom/client";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd";
import { mainRoutes } from "./routes/index";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      {/* 注册路由 */}
      {/* 注册路由时，使用 Switch 组件包裹，可以实现单一匹配，一个路由对应一个组件 */}
      {/* 渲染与该地址匹配的第一个子节点 <Route> 或者 <Redirect>。 */}
      {/* 如果不使用 Switch 组件进行包裹，相同 path 的就会被匹配到，然后一起展示*/}
      <Switch>
        {/* routeProps 是干嘛的 */}
        <Route path="/admin" render={(routeProps) => <App {...routeProps} />} />
        {mainRoutes.map((route) => {
          return <Route key={route.path} {...route}></Route>;
        })}
        {/*Redirect：一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由 */}
        <Redirect to="/404" />
      </Switch>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
