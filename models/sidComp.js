const mongoose = require('mongoose');
mongoose.pluralize(null); //取消 mongoose always add an s to the end of my collection name
const UseAPP = mongoose.Schema(
    {
      Mouser_Number: {
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
          // unique: true //不能有重複
          // required: [true, "ctype required."],

          // dateCreated: {
          //   type: Date,
          //   default: Date.now,
          // },
      }
    },
    {
      
        timestamps: true,
        versionKey: false, // __v  Here You have to add.  
    }
)


module.exports = mongoose.model('sidcomp', UseAPP)

// var dataSchema = new Schema({..}, { collection: 'data' })