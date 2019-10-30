const Category = require('../models/category')

module.exports.list = (req, res) => {
    Category.find({userId:req.user._id})
        .then((categories) => {
            res.json(categories)
        })
        .catch((err) => {
            res.json(err)
        })
}

// POST /categories -> name
// show
module.exports.create = (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.userId=req.user._id
    category.save()
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Category.findOne({userId:req.user._id,_id:id})
        .then((category) => {
            if (category) {
                res.json(category)
            } else {
                res.json({})

            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Category.findByIdAndDelete({userId:req.user._id,_id:id})
     .then(category=>{
        if(category){
            res.json(category)
        }else{
            res.json({})
        }
     })
     .catch(err=>{
        res.json(err)
     })
}