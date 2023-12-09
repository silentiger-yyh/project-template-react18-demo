import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Space } from "antd";
import { setToken } from "../utils/auth";
import "./login.css";

function Login(props) {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setToken(values.username);
    props.history.push("/admin/dashboard");
  };
  return (
    <Space direction="vertical" size={16}>
      <Card title="YYH Admin Sys" className="login-form-card">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "用户名!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="">
              忘记密码
            </a> */}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            {/* Or <a href="">注册</a> */}
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
}

export default Login;
