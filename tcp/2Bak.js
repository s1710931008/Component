const net = require('net')

const clinet = net.createConnection({
    host:'127.0.0.1',
    port:3000
})

clinet.on('connect',()=>{
    console.log('成功的連接到服務器')
    //當客戶端與伺服器連接後 可給伺服器發訊息
    clinet.write('world')

    //發訊息給伺服器端
    process.stdin.on('data',data=>{
        // console.log(data.toString())
        //.trim() 去除換行
        clinet.write(data.toString().trim())
    })
})

clinet.on('data',data=>{
    console.log('服務端說:',data.toString())
})