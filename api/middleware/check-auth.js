//@ Jsonwebtoken - verify the token
const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    //const decoded=jwt.verify(req.body.token,'secret_key')
    try{
        const token=req.headers.authorization.split(" ")[1];
         console.log("token:",token);
        const decoded=jwt.verify(token,'secret_key');
        req.userData=decoded;  
        next();
    }
    catch(err){
        return res.status(401).json({
            message:'Auth failed'
        });
    }
}