import React, { useContext } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { adminRoutes } from "../../routes/index";
import logo from "./logo.png";
import { useHistory } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter((route) => route.isShow);

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
function Index(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const history = useHistory();
  return (
    <Layout>
      <Header
        className="header"
        style={{
          // display: 'flex',
          // alignItems: 'center',
          background: "#428bca", // header背景色，和logo同色
        }}
      >
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["/admin/dashboard"]}
            // defaultOpenKeys={['sub1']}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={routes.map((route) => {
              return {
                key: route.path,
                icon: route.icon,
                label: route.title,
                onClick: (item, key, keyPath, domEvent) => {
                  history.push(route.path);
                },
                // children: new Array(4).fill(null).map((_, j) => {
                //   const subKey = index++;
                //   return {
                //     key: subKey,
                //     label: `option${subKey}`,
                //   };
                // }),
              };
            })}
          >
            {/* {routes.map(route => {
              return (
                <Menu.Item key={route.path} icon={route.icon}>
                  {route.title}
                </Menu.Item>
              )
            })} */}
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Index;
