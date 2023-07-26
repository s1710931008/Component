const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
      sid: {
            type: String,
            require: true //如果該值不為 null 或未定義
        },
        name: {
            type: String,
            // unique: true //不能有重複
            // required: [true, "ctype required."],

            // dateCreated: {
            //   type: Date,
            //   default: Date.now,
            // },
        },
        setting: {
            type: String,
            // default: -1 預設值
          },
    },
    {
        timestamps: true,
        versionKey: false, // __v  Here You have to add.  
    }
)

module.exports = mongoose.model('components', userSchema)