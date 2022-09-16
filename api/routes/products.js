const express=require('express');
const mongoose = require('mongoose');
var router=express.Router();
const Product=require('../models/product');
const checkAuth=require('../middleware/check-auth');
const productController=require('../controller/product');

//----------------@Upload images -----------------//
var multer  = require('multer');
var fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    // cb(null,file.fieldname+'-'+ Date()+file.originalname)
    }
  });
  const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
        cb(null,true)
    }else{
        cb(null,false);
    }
  }

var uploads = multer({ storage:storage,
limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter
});

//----------------@Upload images -----------------//

router.get('/',checkAuth,productController.get_product);

router.post('/',checkAuth,uploads.single('recfile'),function(req,res,next){
    console.log(req.file);
    var product=new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    });
    product.save().then(result=>{
        console.log('result:',result);
    })
    .catch(err=>{
        console.log("Error:",err);
    })

    res.status(200).json({
        message:'handling POST request to product.',
        product:product
    });
});

router.get('/:productId',checkAuth,productController.single_product);

router.patch('/:productId',checkAuth,productController.update_product);

    router.delete('/:productId',checkAuth,productController.delete_product);
module.exports=router;