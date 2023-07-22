const mongoose = require('mongoose');

//设置 strictQuery 为 true
mongoose.set('strictQuery', true);

//3. 连接 mongodb 服务                        数据库的名称
// mongoose.connect('mongodb://127.0.0.1:27017/myproject');
mongoose.connect('mongodb://127.0.0.1:27017/myproject')
  .then(() => console.log('Connected!'));

//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
const BookModel = mongoose.model('books', { 
  name: String,
  author: String,
  price: Number,
  is_hot:Boolean
});

//暴露模型对象
module.exports = BookModel;
