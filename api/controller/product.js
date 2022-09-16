const Product=require('../models/product');
exports.get_product=function(req,res,next){
    Product.find()
    .select("name price _id productImage")
    .exec()
    .then(doc=>{
        if(doc.length>0){
        console.log(doc);
        res.status(200).json({
            message:"handeling get request to products.",
            doc:doc
            
        });
        }
        else{
            res.status(404).json(err);
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
    
}
exports.single_product=function(req,res){
    const id=req.params.productId;
    Product.findById(id)
    .select('name price _id productImage').exec()
    .then(doc=>{
        console.log("document:",doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:err.message
        })
    })
}
exports.update_product=function(req,res,next){
       
    const id=req.params.productId;
    
    Product.updateOne({_id:id},{$set:{name:req.body.name,price:req.body.price}})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
};
exports.delete_product=function(req,res,next){
    const id=req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
     res.status(200).json(result);
    })
    .catch(err=>{
     console.log(err);
     res.status(500).json({
         message:err.message
     })
    })
     
};