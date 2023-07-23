var express = require('express');
var router = express.Router();

const moment = require('moment');
const AccountModel = require('../models/AccountModel');

//lowdb 導入
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)




//记账本的列表
router.get('/', function(req, res, next) {
  //获取所有的账单信息
  let accounts = db.get('accounts').value();
  //读取集合信息

  //批量讀取
  AccountModel.find().sort({time: -1}).then((data) => {
    // console.log(data); 
    res.render('./account/list', {accounts: data,moment: moment});
    // mongoose.disconnect(); 
  })
});

//添加记录
router.get('/create', function(req, res, next) {
  res.render('./account/create');
});

//新增记录
router.post('/', (req, res) => {
  //插入数据库

  // 新增資料
  AccountModel.create({ 
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  })
  .then(() => { 
    //成功提醒
    res.render('./account/success', {msg: '添加成功哦~~~', url: '/account'});
    console.log('新增成功'); 
    // mongoose.disconnect(); 
  });
});
module.exports = router;
