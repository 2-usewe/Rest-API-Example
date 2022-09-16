var express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const path=require('path');
const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');
const userRoutes=require('./api/routes/user');

//----------------@Mongoose Mongodb connection -----------------//
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/student',function(err){
    if(err){
        console.log('database not connected');
    }
    console.log('mongodb connected successfully');
});

//----------------@Mongoose Mongodb connection -----------------//

app.use('/uploads',express.static(`${__dirname}/uploads`));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin,X-Requested-with, Content-Type,Accept,Authorization');
//     if(req.method==='OPTIONS'){  
//         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
//         return res.status(200).json({});
//     }
// });

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);


module.exports=app;
