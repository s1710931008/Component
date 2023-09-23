const net = require('net')
const types = require('./types')

const server = net.createServer()

const users =[]

server.on('connection',clientSocket=>{
    console.log('有新的連線進來了')

    
    //監聽 clientSocket 的data事件
    clientSocket.on('data',data =>{
        data =  JSON.parse(data.toString().trim())
        switch (data.type) {
            case types.loing:
                if(users.find(item=>item.nickname === data.nickname)){
                    return clientSocket.write(JSON.stringify({
                        type: types.loing,
                        success: false,
                        message: '暱稱重複'
                    }))
                }

                clientSocket.nickname = data.nickname
                //填加users陣列
                users.push(clientSocket)
                clientSocket.write(JSON.stringify({
                    type: types.loing,
                    success: true,
                    message: '登入成功',
                    nickname: data.nickname,
                    sumUser: users.length
                }))
                break;
            case types.broadcast:
                users.forEach(item=>{
                    item.write(JSON.stringify({
                        type: types.broadcast,
                        nickname: clientSocket.nickname,
                        message: data.message
                    }))
                })
                break;
            case types.p2p:
                break;
            default:
                break;
        }
    })

})

server.listen(3000,()=> console.log('Server runing 127.0.0.1 3000'))
