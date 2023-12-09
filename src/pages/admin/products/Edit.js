import React from "react";
import { Form, Card, Input, message, Button } from "antd";

function Edit(props) {
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success("Submit success!");
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  /**
   * 自定义校验规则
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   * @returns
   */
  const priceValidate = (rule, value, callback) => {
    // console.log(Number(value));
    // console.log(value * 1); //转数字
    if (Number(value)) {
      if (value * 1 > 100) {
        return Promise.reject("价格不能超过100");
        // callback("价格不能超过100");  //callback是旧的写法，浏览器console会提出警告：warning.js:19 Warning: `callback` is deprecated. Please return a promise instead.
      } else {
        return Promise.resolve();
        // callback(); // 这里不要callback好像也没啥毛病，但是提交没有反应
      }
    } else {
      return Promise.reject("请输入数字");
    }
  };
  return (
    <Card title="商品编辑">
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="商品名称"
          rules={[
            {
              required: true,
              message: "请输入商品名称",
              type: "string",
              whitespace: true, // 如果字段仅包含空格则校验不通过，只在 type: 'string' 时生效
            },
          ]}
        >
          <Input placeholder="请输入商品名称" />
        </Form.Item>
        <Form.Item
          name="price"
          label="商品价格"
          rules={[
            {
              required: true,
              message: "请输入商品价格,只支持小数",
              // type: "float",
              // // 这里如果是type为number、integer、float需要把值转换一下格式，否则验证不通过，这是官方一个BUG，不可用但又列在文档里面了
              // transform: (value) => {
              //   return Number(value) ? Number(value) : 0;
              // },
            },
            {
              validator: priceValidate, // 自定义校验，和上面的规则同时生效
            },
          ]}
        >
          <Input placeholder="请输入商品价格" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Edit;
