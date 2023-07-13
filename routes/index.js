var express = require('express');
var router = express.Router();

//lowdb 導入
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)



/* GET home page. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  //取得單筆記錄
  // let str = db.get('Component').find({format:"100nF"}).value();
  let str = db.get('Component').find({format:id}).value();
  // const db.get('accounts').unshift({id:id,url,fields, ...req.body}).write();
  // console.log(str);
  let jstr = JSON.stringify(str)
  let kstr = Object.keys(str);
  let kstr1 = Object.values(str);


  console.log("******** 零件規格 ********")
  Object.keys(str).forEach(key => {
    
    if(key!=="Use"){ 
    console.log(key, str[key]);
    }

    if(key==="Use"){
      console.log("******** 零件用途 ********")
      str[key].forEach(itmeVal=>{
        console.log(itmeVal);
    })
    console.log("******** E N D ********")
    }

  });

  // console.log(kstr)
  res.render('index', { jstr, str, kstr });
});

module.exports = router;
