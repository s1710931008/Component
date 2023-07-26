const mongoose = require('mongoose');

const APPs = mongoose.Schema(
    {
      name: {
        type: String,
        },
      setting: {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false, // __v  Here You have to add.  
    }
)

module.exports = mongoose.model('sidcomp', APPs)