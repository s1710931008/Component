const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        Mouser_Number: {
            type: String,
            require: true
        },
        ctype: {
            type: String,
        },
        format: {
            type: String,
          },
          //4
          Voltage: {
            type: String 
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