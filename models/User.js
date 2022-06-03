const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    direction:{
        type:String,
        required:true
    },
    height:{
        type:Number,
        required:true,
    },
    crib:{
        type:String,
        required:true,
    },
    postalcode:{
        type:String,
        required:true,
    },
    admin: 
    {
        type: Boolean,
    }
})

module.exports = model('User', UserSchema)