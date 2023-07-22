//1. 安装 mongoose
//2. 导入 mongoose
// Using Node.js `require()`
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/myproject')
  .then(() => console.log('Connected!'));
  
//导入 BookModel
const book = require('./models/BookDbModel');

// 資料建立
// 資料建立
// const book = new BookModel({
//   name:'888西游記',
//   author:'888吳先生',
//   price:19.2,
//   is_hot:false
// })
// book.save().then(() => {console.log('新增成功')
// mongoose.disconnect();
// });

// 新增資料
book.create({ 
  name:'123西游記',author:'123吳先生',price:19.2,is_hot:false})
  .then(() => { console.log('新增成功'); mongoose.disconnect(); });