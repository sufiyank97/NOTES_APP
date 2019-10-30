const mongoose=require('mongoose')
// schema - contructor func -   helps us define the shape of a document inside a collection

const Schema=mongoose.Schema
const categorySchema =new Schema({
    name:{
        type:String,
        required:true
    },
    userID:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
const Category=mongoose.model('Category',categorySchema)
module.exports=Category