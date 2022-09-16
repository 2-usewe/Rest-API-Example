const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Order=require('../models/order');
const product = require('../models/product');
const Product=require('./products');
const jwt=require('jsonwebtoken');
const checkAuth=require('../middleware/check-auth');
const ordersController=require('../controller/orders');

router.get('/',checkAuth,ordersController.get_allOrders);

router.post('/',checkAuth,ordersController.create_orders);
router.get('/:orderId',checkAuth,ordersController.single_order);
router.delete('/:orderId',checkAuth,ordersController.delete_order);
module.exports=router;