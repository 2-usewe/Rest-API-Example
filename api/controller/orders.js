const Order=require('../models/order');
const Product=require('../models/product');

exports.get_allOrders=function(req,res,next){
    Order.find()
    .select("product quantity _id")
    .populate('product' ,'price')
    .exec().then(result=>{
        res.status(200).json({
            message:"these are the all order lists",
            orders:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(200).json({
            message:err.message
        })
    })
};
exports.create_orders=function(req,res,next){

    Product.findById(req.params.productId)
    .then(product=>{
        const order=new Order({
            _id:mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product:req.body.productId
        });
       return  order.save()
                .then(result=>{
                    console.log("orders:",result);
                    res.status(200).json({
                    message:"Order was created",
                    order:order
                    });
                })
                .catch(err=>{
                    res.status(500).json({
                        message:err.message
                    })
                })
    });
}
exports.single_order=function(req,res,next){
    Order.findOne({_id:req.params.orderId})
    .populate('product','name')
    .exec()
    .then(order=>{
        res.status(200).json({
            message:'Order details.',
            orders:order
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message
        });
    })
    
};
exports.delete_order=function(req,res,next){
    Order.remove({_id:req.params.orderId})
    .exec()
    .then(result=>{
     res.status(200).json({
         message:"Order successfully deleted.",
         orders:result
     })
    })
    .catch(err=>{
     console.log(err);
     res.status(500).json({
         message:err.message
     })
    })
 };