const {User}=require('../models/User')

const authenticateUser=function(req,res,next){
    const token=req.header('x-auth')
    
    User.findByToken(token)
        .then(function(user){
            // res.send(user)
            req.user=user
            req.token=token
            next()
        })
        .catch(function(err){
            res.status('401').send(err)
        })
}

module.exports={
    authenticateUser
}