const net = require('net')

const server = net.createServer()

const clinets =[]

server.on('connection',clientSocket=>{
    console.log('有新的連線進來了')

    //把當前連接的客戶端通訊接口存儲到陣列中
    clinets.push(clientSocket)
    
    //監聽 clientSocket 的data事件
    clientSocket.on('data',data =>{
        console.log('有人說:',data.toString())
        
        //把數據發給所有的客戶端
        clinets.forEach(socket=>{
            // 排除自己客戶端發送的訊息
            if(socket != clientSocket){
                //發給所有人
                socket.write(data)
            }
            
        })

    })

    //給客戶端發訊息
    //通過 clientSocket 給當前連接的客戶端發送數據
    clientSocket.write('hello')
})

server.listen(3000,()=> console.log('Server runing 127.0.0.1 3000'))
