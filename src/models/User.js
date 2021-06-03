const {Schema ,model} = require('mongoose')

const UserSchema = new Schema({
    email: {
       type: String,
       require: true,
       trim: true,
       unique: true
    },
    password: {
       type: String,
       require: true,
       trim: true,    
    }
},{
    timestamps: true
})

module.exports = model('User',UserSchema)