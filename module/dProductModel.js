const mongoose=require('mongoose');

const dProduct=new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doner'
    },
    type:{
        type:String
    },
    desc:{
        type:String
    },
    productName:{
        type:String
    },
    Image:{
        type:Image
    },
    
})
module.exports=mongoose.model('dProduct', dProduct);