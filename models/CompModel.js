const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        Mouser_Number: {
            type: String,
            require: true //如果該值不為 null 或未定義
        },
        Type: {
            type: String,
            // unique: true //不能有重複
            // required: [true, "ctype required."],

            // dateCreated: {
            //   type: Date,
            //   default: Date.now,
            // },
        },
        Format: {
            type: String,
            // default: -1 預設值
          },
          //4
          Voltage: {
            type: String 
            // trim: true,  將刪除前後和尾隨空格
          },
          //5
          Case_Code_in: {
            type: String 
          },
          //6
          Tolerance: {
            type: String 
          },
          //7
          Quantity: {
            type: Number 
          },
    },
    {
        timestamps: true,
        versionKey: false, // __v  Here You have to add.  
    }
)

module.exports = mongoose.model('components', userSchema)