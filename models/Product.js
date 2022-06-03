const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    game_category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    membership_price:{
        type:Number,
        required:true
    },
    offer:{
        type:Boolean,
        required:true,
    },
    offer_price:{
        type:Number,
        required:false
    },
    prominent:{
        type:Boolean,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

ProductSchema.method('toJson', function(){
    const {} = this.toObject()
})
module.exports = model('Product', ProductSchema)