//导入 mongoose
const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/myproject')
//   .then(() => console.log('Connected!'));
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
const CompModel = mongoose.model('component', { 
  //标题
  Mouser_Number: {
    type: String,
    required: true
  },
  Date: Date,
  //类型
  type: {
    type: String,
  },
  //金额
  format: {
    type: String,
  },
  //备注
  Voltage: {
    type: String 
  },
  //备注
  Case_Code_in: {
    type: String 
  },
  //备注
  Tolerance: {
    type: String 
  },
  //备注
  Quantity: {
    type: Number 
  }
});

//创建模型对象  对文档操作的封装对象
// let AccountModel = mongoose.model('accounts', AccountSchema);

//暴露模型对象
module.exports = CompModel;
