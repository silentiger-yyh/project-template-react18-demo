const mongoose = require("mongoose");
const { Book, BookCategory } = require("./models");

mongoose
  //mongodb://yuyunhu:123456@192.168.83.141:27017/yyh-cmdb?authSource=admin&minPoolSize=10&maxPoolSize=50
  .connect(
    "mongodb://yuyunhu:123456@192.168.83.141:27017/cat-shop?authSource=admin&minPoolSize=10&maxPoolSize=50",
    {
      useNewUrlParser: true,
    }
  )
  .then((res) => {
    // console.log(res);
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log(err);
  });
