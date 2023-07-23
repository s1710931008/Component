# Component 練習用

# mongodb 

``` 
npm i mongoose@7.4.0
```

# DB  mongoose

```
npm i mongoose@6.11.4

```

### 設定資料庫參數config/config.js

```
//配置文件
module.exports = {
  DBHOST: '127.0.0.1',
  DBPORT: 27017,
  DBNAME: 'myproject'
}
```

# MD5

```
npm i md5
```

# connect-mongo 寫人登入session

```
npm i connect-mongo
```



# moment 日期轉換

參考網站:http://momentjs.cn/docs/#/parsing/

```
npm i moment
```

### [字符串](http://momentjs.cn/docs/#/parsing/string/) 

```js
moment(String);
```

从字符串创建 moment 时，我们首先检查字符串是否与已知的 [国际标准化组织 8601](https://en.wikipedia.org/wiki/ISO_8601) 格式匹配，然后检查字符串是否与 [RFC 2822 日期时间](https://tools.ietf.org/html/rfc2822#section-3.3) 格式匹配，如果未找到已知格式，则返回 `new Date(string)` 格式。

```javascript
var day = moment("1995-12-25");
```

```
time: moment(req.body.time).toDate()
```

## 啟動網頁服務

```
npm start
```







