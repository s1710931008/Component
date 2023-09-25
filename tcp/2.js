const net = require('net')
const types = require('./types')
let nickname =null

const clinet = net.createConnection({
    host:'127.0.0.1',
    port:3000
})

clinet.on('connect',()=>{
    console.log('成功的連接到服務器')
    //當客戶端與伺服器連接後 可給伺服器發訊息
    // clinet.write('world')

    process.stdout.write('請輸入暱稱：')
    //發訊息給伺服器端
    process.stdin.on('data',data=> {
        // console.log(data.toString())
        //.trim() 去除換行
        data = data.toString().trim()
        if(!nickname) {
            return clinet.write(JSON.stringify({
                type: types.loing,
                nickname: data
            }))
        }

        //正則表他達式
        const matches = /^@(\w+)\s(.+)$/.exec(data)

        if(matches) { //妹果本次消息符合 @xxxx xxx 格式
            return clinet.write(JSON.stringify({
                type: types.p2p,
                nickname: matches[1],
                message: matches[2]
            }))
        }

        //群發
        clinet.write(JSON.stringify({
            type: types.broadcast,
            message: data
        }))
    })
   

})

clinet.on('data',data=>{
    data = JSON.parse(data.toString().trim())
    switch (data.type) {
        case types.loing:
            if(!data.success){
                console.log(`登入失敗: ${data.message}`)
                process.stdout.write('請輸入暱稱：')
            } else {
                console.log(`登入成功，當前用戶:${data.sumUser}`)
                nickname = data.nickname
            }
            break;
        case types.broadcast:
            console.log(`${data.nickname}:${data.message}`)
            break;        
        case types.p2p:
            if(!data.success){ //如果發送失敗
                return console.log(`發送失敗:${data.message}`)
            }
            // 發送成功
            console.log(`${data.nickname} 對你說: ${data.message}`)
            break;  
        case types.log:
            console.log(data.message)
            break;
        default:
            console.log('未知的消息')
            break;
    }
})