const fs = require('fs');
let result ={}

fs.readFile("data1.json","utf-8",(err,data1)=>{
    fs.readFile("data2.json","utf-8",(err,data2)=>{ 
        fs.readFile("data3.json","utf-8",(err,data3)=>{
            result['data1'] = JSON.parse(data1)
            result['data2'] = JSON.parse(data2)
            result['data3'] = JSON.parse(data3)
            console.log(result)
        })
    })
})