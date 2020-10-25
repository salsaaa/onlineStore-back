var express = require("express");
var cors = require('cors')
  var app = express();

  const port=process.env.PORT || 4000;
  require('express-async-errors'); //for try & catch
  require('dotenv').config() //env

  app.use(cors())
  app.set('view engine', 'hbs') //hbs
  require('./DB');
app.use(express.json());

const userRouter=require('./routes/user')
app.use('/users',userRouter);

const cartRouter=require('./routes/cart')
app.use('/carts',cartRouter);

const productRouter=require('./routes/product')
app.use('/products',productRouter);
// app.get('/',(req,res,next)=>{
//   res.render('index',{title:"anything"})
// })
app.set('views', __dirname + '/views'); //the 3 line for react template engine (server side y3ni el user my3rf4 eni mstkhdma react)
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/',(req,res,next)=>{
  res.render('index2',{name:"bella"})
})
app.use(express.static('public'))//for public and template
app.use((err,req,res,next)=>
{
  const statusCode=err.statusCode || 500;
  const body =statusCode>=500?({message:'INTERNET SERVER ERROR'}):{message:err.message}
  res.status(statusCode).json(body);
})

app.listen(port, function() {
    console.log("Example app listening on port 4000!");
  });