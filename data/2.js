const fs = require('fs');


// Async
fs.readFile("data1.json","utf-8",(err,data1)=>{
    fs.readFile("data2.json","utf-8",(err,data2)=>{ 
        fs.readFile("data3.json","utf-8",(err,data3)=>{
            console.log(JSON.parse(data1))
            console.log(JSON.parse(data2))
            console.log(JSON.parse(data3))
        })
    })
})

//Sync
let data1 = fs.readFileSync("data1.json","utf-8");
let data2 = fs.readFileSync("data2.json","utf-8");
let data3 = fs.readFileSync("data3.json","utf-8");

console.log(JSON.parse(data1))
console.log(JSON.parse(data2))
console.log(JSON.parse(data3))