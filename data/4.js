// async / await 版
let main = async () => {
    // 使用 try-catch 做錯誤處理
    try {
      let r = await flipCoin();   // 轉成 '同步' 語言執行 --> 執行完才會往下走
      // let r = flipCoin();      // 沒加 'await' --> 還是 '非同步'
      console.log("Async / Await 完成！！！");
      console.log(r);
    } catch(err){
      console.log(err);
    };
  };
  
  main();
  
  
  // 讀3個檔案 (async / await)
  let readFilePromise = (dataPath)=>{
    return new Promise((resolve,reject)=>{
      fs.readFile(dataPath , "utf8" , (err,data)=>{  
        if(err){
          reject(err);
        }else{
          resolve(JSON.parse(data));
        };
      });
    });
  };
  
  let main2 = async ()=>{
    try{
      // 1. 使用 await 轉成 '同步'語法 (執行完才會往下)
      // 2. await 後的 function , 要 return Promise 
      // 3. await 要在 async function 內才可執行
      // 4. 使用 try-catch 錯誤處理 (取代 .then / .catch)
  
      // 正常執行區塊
      let output = {};
      let data1 = await readFilePromise("./models/data1.json");
      let data2 = await readFilePromise("./models/data2.json");
      let data3 = await readFilePromise("./models/data3.json");
      output["data1"] = data1;
      output["data2"] = data2;
      output["data3"] = data3;
      console.log(output);
    }catch(err){
      // 發生錯誤時, 執行區塊
      console.log("我是 catch 錯誤區！");
      console.log(err);
    };
  };
  
  main2();