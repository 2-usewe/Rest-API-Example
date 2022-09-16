var http=require('http');
var port=process.env.PORT||3000;
const app=require('./app');

const server=http.createServer(app);
server.listen(port,function(){
    console.log(`server running on:`,`http//:localhost:${port}`);
})