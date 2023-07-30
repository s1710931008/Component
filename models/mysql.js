const { model } = require('mongoose');
var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rootroot',
    database:'cms'
});

db.connect();

module.exports = db;