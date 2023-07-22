// Using Node.js `require()`
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/myproject')
  .then(() => console.log('Connected!'));

// const Cat = mongoose.model('Cat', { name: String });

const books = mongoose.model('books', { 
    name: String,
    author: String,
    price: Number,
    is_hot:Boolean
});

// 資料建立
const book = new books({
    name:'西游記',
    author:'吳先生',
    price:19.2,
    is_hot:false
})
book.save().then(() => {console.log('meow')
mongoose.disconnect();
});

// 新增資料
books.create({ 
    name:'西游記',author:'吳先生',price:19.2,is_hot:false})
    .then(() => { console.log('新增成功'); mongoose.disconnect(); });

// 刪除資料
books.deleteOne({_id:'647297cd9d2beaaf011fbfbd'})
                .then(() => {console.log('刪除成功'); mongoose.disconnect()});

// 批量刪除
books.deleteMany({is_hot:false})
                .then(() => {console.log('批量刪除成功'); mongoose.disconnect()});

// 更新
books.updateOne({name:'紅樓夢'},{price:9.9})
                .then(() => {console.log('修改成功'); mongoose.disconnect()});

// 批量更新
books.updateMany({is_hot:false},{is_hot:true})
                .then(() => {console.log('批量更新成功'); mongoose.disconnect()});



//單筆讀取
books.findOne({author:'吳先生'}).then((data) => {console.log(data); mongoose.disconnect(); })

//批量讀取
books.find({author:'吳先生'}).then((data) => {console.log(data); mongoose.disconnect(); })

//價格大於30 且小於70
books.find({$and:[ {price:{$gt:30}}, {price:{$lt:70}} ]}).then((data) => {console.log(data); mongoose.disconnect(); })

//作者有 三
books.find({author:/三/}).then((data) => {console.log(data); mongoose.disconnect(); })
books.find({author: new RegExp('三')}).then((data) => {console.log(data); mongoose.disconnect(); })

//id謮取
books.findById('64729c79b7af0cf675cb3b66').then((data) => {console.log(data); mongoose.disconnect(); })