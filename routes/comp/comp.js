var express = require('express');
var router = express.Router();

const moment = require('moment');
const CompModel = require('../../models/CompModel');
const SidComp = require('../../models/sidComp');

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
  SidComp.find({name:'kenny'}).then((data) => {
    // console.log(data); 
    console.log(data)
    // mongoose.disconnect(); 
  })

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

//查看單獨零件
router.get('/list/:id' ,function(req, res, next) {
  let id = req.params.id;
  CompModel.find({ Mouser_Number: id}).sort({time: -1}).then((data1) => {

      //使用位置
      SidComp.find({ Mouser_Number: id}).sort({time: -1}).then((data2) => {
        console.log(id); 
        console.log(data2)
        // mongoose.disconnect(); 
        // res.json({data1 , data2})
        res.render('./comp/list', {str1:data1 , str2:data2});
      })
  
  })

});


//删除單獨零件位置
router.get('/list/del/:id/:option', (req, res) => {
  const { id, option } = req.params;
  
  // 刪除資料
  SidComp.deleteOne({_id: id})
  .then(() => {console.log('刪除成功')
  // res.json(id)
    res.redirect(`/comp/list/${option}`)
  })

});

//添加單獨零件位置
router.get('/creat/list/:option', function(req, res, next) {
  const { option } = req.params;
  console.log(option)
  // res.json(option)
  res.render('./comp/CreateList', {option:option});
});

//新增單獨零件位置
router.post('/create/save',(req, res) => {
  // 新增資料資料庫
  SidComp.create({ 
    ...req.body,
    //修改 time 属性的值
    Date: moment(Date.now()).toDate()
  })
  .then(() => { 
    //成功提醒
    // res.render('./comp/success', {msg: '添加成功哦~~~', url: '/comp'});
    res.redirect(`/comp/list/${req.body.Mouser_Number}`)
    // console.log('新增成功'); 
    // mongoose.disconnect(); 
  });
});


//修改單獨零件用途
router.get('/edit/list/:id' ,function(req, res, next) {
  let id = req.params.id;

  //使用位置
  SidComp.find({ _id: id}).sort({time: -1}).then((data) => {
    console.log(data)
    res.render('./comp/EditList', {str:data});
  })
});

router.post('/editsave/list',(req, res) => {
  // 新增資料資料庫
  // res.json(req.body)
  SidComp.updateOne({_id: req.body._id},{
    Mouser_Number: req.body.Mouser_Number,
    name:req.body.name,
    setting:req.body.setting,
    updatedAt:new Date(),
  })
  .then(() => {
    res.redirect(`/comp/list/${req.body.Mouser_Number}`)
  });


  // SidComp.create({ 
  //   ...req.body,
  //   //修改 time 属性的值
  //   Date: moment(Date.now()).toDate()
  // })
  // .then(() => { 
  //   //成功提醒
  //   // res.render('./comp/success', {msg: '添加成功哦~~~', url: '/comp'});
  //   res.redirect(`/comp/list/${req.body.Mouser_Number}`)
  //   // console.log('新增成功'); 
  //   // mongoose.disconnect(); 
  // });

});
module.exports = router;
