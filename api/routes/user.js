const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const user = require('../models/user');
const jwt=require('jsonwebtoken');

router.post('/signup',function(req,res,next){
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"Mail already exists."
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        message:err.message
                    })
                }
                else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    });
                    user.save()
                    .then(result=>{
                        console.log("users:",result);
                        return res.status(200).json({
                            message:"signup successfully"
                        })
                    })
                    .catch(err=>{
                        return res.status(500).json({
                            message:err.message
                        })
                    })
                }
            });

        }
    });
  
   
});

router.post('/login',(req,res,next)=>{
    User.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        console.log("users:",user);
        if(user.length<1){
            return res.status(404).json({
                message:"Mail not found, user does not exists."
            });
        }
        else{
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(err){
                    return res.status(401).json({
                        message:'Auth failed'
                    });
                }
                if(result){
                  const token=jwt.sign({
                        email:user.email,
                        userId:user._id,
                    },'secret_key',
                    {
                        expiresIn:'1h'
                    })
                    return res.status(200).json({
                        message:"Auth successfully",
                        token:token
                    })
                }
                return res.status(401).json({
                    message:"Auth failed"
                })
            })
        }
    })
//     res.setHeader('Authorization', 'Bearer '+ token); 
//     res.header('Authorization', 'Bearer '+ token);
    .catch(err=>{
        return res.status(500).json({
            message:err.message
        })
    })
})

router.delete('/:userId',(req,res,next)=>{
user.remove({_id:req.params.userId})
.exec()
.then(result=>{
    res.status(200).json({
        message:'User deleted'
    })
})
.catch(err=>{
    return res.status(500).json({
        message:err.message
    })
})
});
module.exports=router;
