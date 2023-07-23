//导入 express
const express = require('express');
//导入 jwt
const jwt = require('jsonwebtoken');
//导入中间件
let checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

const router = express.Router();
//导入 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

//记账本的列表
router.get('/account', function (req, res, next) {
  //读取集合信息
    //獲取所有帳單訊息
    AccountModel.find().sort({time: -1}).then((data) => {
      // console.log(data); 
          //响应成功的提示
    res.json({
      //响应编号
      code: '0000',
      //响应的信息
      msg: '读取成功',
      //响应的数据
      data: data
    });
    })
});

//新增记录
router.post('/account', (req, res) => {
  //表单验证

  //插入数据库
  AccountModel.create({ 
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  })
  .then((data) => { 
    //成功提醒
        //成功提醒
        res.json({
          code: '0000',
          msg: '创建成功',
          data: data
        })
    console.log('新增成功'); 
    // mongoose.disconnect(); 
  });
});

//删除记录
router.delete('/account/:id', (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({_id: id})
  .then(() => {console.log('刪除成功')
    //提醒
    res.json({
      code: '0000',
      msg: '删除成功',
      data: {}
    })
  })
});

//获取单个账单信息
router.get('/account/:id', (req, res) => {
  //获取 id 参数
  let { id } = req.params;
  //查询数据库
  //id謮取
  AccountModel.findById(id).then((data) => {
    console.log(data); 
    //成功响应
    res.json({
      code: '0000',
      msg: '读取成功',
      data: data
    }) 
  })
});

//更新单个账单信息
router.patch('/account/:id', (req, res) => {
  //获取 id 参数值
  let { id } = req.params;
  const paramss = [req.body.title,req.params.id];
  console.log(paramss)
  //更新数据库
  AccountModel.updateOne({ _id: id }, req.body)
    .then((data) => {
      console.log('修改成功',data)
      // res.json(data)
    });

    // 再次查询数据库 获取单条数据
    AccountModel.findById(id).then((data) => {
      console.log(data); 
      //成功响应
      res.json({
        code: '0000',
        msg: '读取成功',
        data: data
      }) 
    })
  });

module.exports = router;
