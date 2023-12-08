// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { adminRoutes } from "./routes";
import Frame from "./components/frame/Index";
import './App.css'
/* 
导入带花括号和不带花括号的区别是什么？？？？？
不带花括号{}，引用js文件中默认导出（export default）的模块,import模块时的可随意命名。
带花括号{}，引用js文件中export导出的同名模块,import模块时的命名必须一致。
*/
function App() {
  return (
    <Frame>
      <Switch>
        {/* 遍历adminRoute下面的所有路由 */}
        {adminRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={(routeProps) => {
                //routeProps是干嘛的？？？
                return <route.component {...routeProps} />;
              }}
            />
          );
        })}
        <Redirect to="/404" />
      </Switch>
    </Frame>
  );
}

export default App;
