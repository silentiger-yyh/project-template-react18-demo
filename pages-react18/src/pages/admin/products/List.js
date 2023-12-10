import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm, message } from "antd";
import { listApi } from "../../../service/products";

// const dataSource = [
//   {
//     id: 1,
//     name: "香皂",
//     price: 310,
//   },
//   {
//     id: 2,
//     name: "特仑苏",
//     price: 55.3,
//   },
//   {
//     id: 3,
//     name: "香皂",
//     price: 22.4,
//   },
// ];
/*
useEffect()的参数是一个函数，它就是所要完成的副效应（改变网页标题）。组件加载以后，React 就会执行这个函数。
useEffect()的作用就是指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。

useEffect() 的第二个参数：
useEffect()的第二个参数是一个数组，指定了第一个参数（副效应函数）的依赖项（props.name）。只有该变量发生变化时，副效应函数才会执行。
*/
function List(props) {
  const columns = [
    {
      title: "序号",
      key: "_id",
      dataIndex: "_id",
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
            <Button
              type="primary"
              size="small"
              onClick={() => {
                // 点击编辑跳转到编辑页面，传递ID作为参数
                props.history.push(`/admin/products/edit/${record._id}`);
              }}
            >
              编辑
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
  // 定义局部状态
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    listApi()
      .then((res) => {
        // console.log(res);
        setDataSource(res.data.products);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);
  return (
    <Card
      title="商品列表"
      extra={
        <Button
          type="primary"
          size="small"
          onClick={() => {
            props.history.push("/admin/products/edit");
          }}
        >
          新增
        </Button>
      }
    >
      <Table
        columns={columns}
        bordered
        dataSource={dataSource}
        rowKey="_id"
        pagination={{ defaultPageSize: 2, defaultCurrent: 1, total: 3 }}
      />
    </Card>
  );
}

export default List;
