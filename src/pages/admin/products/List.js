import React from "react";
import { Card, Table, Button, Popconfirm } from "antd";

const columns = [
  {
    title: "序号",
    key: "id",
    dataIndex: "id",
    width: 80,
    align: "center",
    render: (txt, record, index) => index + 1,
  },
  {
    title: "名字",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "价格",
    key: "price",
    dataIndex: "price",
  },
  {
    title: "操作",
    render: (txt, record, index) => {
      return (
        <div>
          <Button type="primary" size="small">
            修改
          </Button>
          <Popconfirm
            title="确定删除此项？"
            onCancel={() => {
              console.log("取消删除");
            }}
            onConfirm={() => {
              console.log("确认删除");
              // 调接口
            }}
          >
            <Button
              type="primary"
              danger
              size="small"
              style={{ margin: "0 10px" }}
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      );
    },
  },
];
const dataSource = [
  {
    id: 1,
    name: "香皂",
    price: 310,
  },
  {
    id: 2,
    name: "特仑苏",
    price: 55.3,
  },
  {
    id: 3,
    name: "香皂",
    price: 22.4,
  },
];
function List() {
  return (
    <Card
      title="商品列表"
      extra={
        <Button type="primary" size="small">
          新增
        </Button>
      }
    >
      <Table columns={columns} bordered dataSource={dataSource} rowKey="key" />
    </Card>
  );
}

export default List;
