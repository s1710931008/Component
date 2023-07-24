var express = require('express');
var router = express.Router();

const moment = require('moment');
const CompModel = require('../../models/CompModel');


//lowdb 導入
/*
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)
*/

 //判斷登入是否有成功 中間鍵
let checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')
//記帳本的列表
router.get('/', checkLoginMiddleware,function(req, res, next) {
  
  //判斷登入是否有成功
  // if(!req.session.username){
  //   return res.redirect('/login')
  // }
  //獲取所有帳單訊息
  CompModel.find().sort({time: -1}).then((data) => {
    // console.log(data); 
    res.render('./comp/index', {str: data,moment: moment});
    // mongoose.disconnect(); 
  })
});

//添加記錄
router.get('/create', function(req, res, next) {
  res.render('./comp/create');
});

//新增記錄
router.post('/save',(req, res) => {
  // 新增資料資料庫
  CompModel.create({ 
    ...req.body,
    //修改 time 属性的值
    Date: moment(Date.now()).toDate()
  })
  .then(() => { 
    //成功提醒
    res.render('./comp/success', {msg: '添加成功哦~~~', url: '/comp'});
    console.log('新增成功'); 
    // mongoose.disconnect(); 
  });
});

//删除记录
router.get('/:id', checkLoginMiddleware, (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  // 刪除資料
  AccountModel.deleteOne({_id: id})
  .then(() => {console.log('刪除成功')
    res.render('./account/success', {msg: '删除成功~~~', url: '/account'});
  })
});


module.exports = router;
