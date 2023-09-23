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
                //用戶增加是的log,非當登入用戶
                users.forEach(user => {
                    if(user !== clientSocket){ //如果不是當前登入用戶時
                        user.write(JSON.stringify({
                            type: types.log,
                            message: `${data.nickname} 進入聊天室,當前用戶數:${users.length}`
                        }))
                    }
                })
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
                const user = users.find(item => item.nickname == data.nickname)
                if (!user){ //如果何用者不存在或離線就發消息
                    return clientSocket.write(JSON.stringify({
                        type: types.p2p,
                        success: false,
                        message: '該用戶不存在'
                    }))
                }
                //發給單給用戶
                user.write(JSON.stringify({
                    type: types.p2p,
                    success: true,
                    nickname: clientSocket.nickname,
                    message: data.message
                }))
                break;
            default:
                break;
        }
    })

    //監聽客戶中斷
    clientSocket.on('end',()=>{
        const index = users.findIndex(user => user.nickname === clientSocket.nickname)
        if(index !== -1) { //從後面開始移除
            const offlineUser = users[index] //刪除前先取出
            users.splice(index,1)
            //廣播通知用戶離開
            users.forEach(user=>{
                user.write(JSON.stringify({
                    type: types.log,
                    message: `${offlineUser.nickname} 離開天室,當前用戶數:${users.length}`
                }))
            })
        }
    })
})

server.listen(3000,()=> console.log('Server runing 127.0.0.1 3000'))
