//导入 mongoose
const mongoose = require('mongoose');


const UserModel = mongoose.model('users', { 
  //标题
  username: String,
  password: String
});


//暴露模型对象
module.exports = UserModel;
