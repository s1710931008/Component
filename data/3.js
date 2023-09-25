

const fs = require('fs');

let result ={}
// 使用 Promise
// 1.宣告 Promise
let readFilePromise = (dataPath)=>{
    return new Promise( (resolve,rejects)=>{
        fs.readFile(dataPath,"utf-8",(err,data1)=>{
            if(err){
                rejects(err)
            }else{
                resolve(data1)
            }
        })
    })
}

// 2.使用 Promise
readFilePromise('data1.json')
.then(result=>{
    console.log('我是 .then 區 ~')
    console.log(result)
})
.catch(err=>{
    console.log('我是 .catch 區 ~')
    console.log(err)
})

/// Promise 特性
let flipCoin = ()=>{
    return new Promise((resolve,rejects)=>{
        setTimeout(()=>{
            if(Math.random()>0.5){
                resolve('上課喔')
            }else{
                rejects('翹課!')
            }
        },300);
    });
}

// .then 可多接幾段 , 並用 return 往下傳值
flipCoin()
  .then(result=>{
    console.log("我是 flipCoin 的 .then 區～");
    console.log(result);
  })
  .then(r2=>{
    console.log("r2 :",r2);
    console.log("這是第二個！！！");
    return "ABCD";
  })
  .then(r3=>{
    console.log("r3 :",r3);
    console.log("這是第三個！！！");
  })
  .then(r4=>{
    console.log("這是第四個！！！");
  })
  .catch(err=>{
    console.log("我是 flipCoin 的 .catch 區!!!");
    console.log(err);
  });