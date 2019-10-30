const mongoose=require('mongoose')
// schema - contructor func -   helps us define the shape of a document inside a collection

const Schema =mongoose.Schema
const noteSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    userID:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
    // caegoryIds:[Objects]
})  
// Note Construtor func
const Note=mongoose.model('Note',noteSchema)
module.exports=Note