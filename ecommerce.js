const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const fs = require('fs');
const config = require("./config.json");
const shopconfig = JSON.parse(fs.readFileSync('./shopconfig.json'));
const http = require('http');

/*
var Ddos = require('ddos')
var ddos = new Ddos({burst:5, limit:5})
*/

const app = express();
app.enable("trust proxy");

var sessionstore = new MongoDBStore({
  uri:`mongodb+srv://${config.MongoPass}@${config.MongoIp}/shop?retryWrites=true&w=majority`,
  collection:'sessions'
});

mongoose.connect(`mongodb+srv://${config.MongoPass}@${config.MongoIp}/shop?retryWrites=true&w=majority`,(error)=>{
    if(!error){
      console.log('Database connection success!')
    }
    else{
      console.log(error)
    }
});

app.use(session({
  secret: 'ecommerce',
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: { maxAge:  3600 * 1000 },
  store:sessionstore
}));

app.use(express.urlencoded({extended:true}));

app.use(fileUpload());

app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.disable("x-powered-by");

function powered(req,res,next){
  res.header( 'Powered-By', 'senesoftware.com' );
  res.header( 'Access-Control-Allow-Origin', '*')
  next();
}

app.use(powered);

//app.use(ddos.express);


//main page
var index = require('./appserver/route/get/index');
var cart = require('./appserver/route/get/cart');
var product = require('./appserver/route/get/product');
var pay = require('./appserver/route/get/pay');
var account = require('./appserver/route/get/account');
var products = require('./appserver/route/get/products');
var orders = require('./appserver/route/get/orders');
var shopsettings = require('./appserver/route/get/shopsettings');
var productscategory = require('./appserver/route/get/productscategory');
var createevent = require('./appserver/route/get/createevent');

//admin login get methods
var login = require('./appserver/route/get/login');
var forgotpass = require('./appserver/route/get/forgotpass');
var register = require('./appserver/route/get/register');
var passnew = require('./appserver/route/get/passnew');

//admin login post methods
var logout = require('./appserver/route/post/logout');
var usercreate = require('./appserver/route/post/usercreate');
var userlogin = require('./appserver/route/post/userlogin');
var usermailsender = require('./appserver/route/post/usermailsender');
var userpassword = require('./appserver/route/post/userpassword');
var userstatus = require('./appserver/route/post/userstatus');
var usercart = require('./appserver/route/post/usercart');
var createproduct = require('./appserver/route/post/createproduct');
var deleteproduct = require('./appserver/route/post/deleteproduct');
var updateproduct = require('./appserver/route/post/updateproduct');
var validatecart = require('./appserver/route/post/validatecart');
var shopsettingsP = require('./appserver/route/post/shopsettings');
var deleteproductimage = require('./appserver/route/post/deleteproductimage');
var updateproductimage = require('./appserver/route/post/updateproductimage');
var search = require('./appserver/route/post/search');
var searchP = require('./appserver/route/get/search');
var createeventP = require('./appserver/route/post/createevent');
var deleteevent = require('./appserver/route/post/deleteevent');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /*?");
});

app.get('/sitemap.xml', function(req, res) {
    res.sendFile('./sitemap.xml', { root: '.' })
});

//main page
app.use(index);
app.use(cart);
app.use(product);
app.use(pay);
app.use(account);
app.use(products);
app.use(orders);
app.use(shopsettings);
app.use(productscategory);
app.use(searchP);
app.use(login);
app.use(forgotpass);
app.use(register);
app.use(passnew);
app.use(createevent);

//post methods
app.use(logout);
app.use(usercreate);
app.use(userlogin);
app.use(usermailsender);
app.use(userpassword);
app.use(userstatus);
app.use(usercart);
app.use(createproduct);
app.use(deleteproduct);
app.use(updateproduct);
app.use(validatecart);
app.use(shopsettingsP);
app.use(deleteproductimage);
app.use(updateproductimage);
app.use(search);
app.use(createeventP);
app.use(deleteevent);

app.use('/', (req,res) => {
    res.status(404).render('404',{
		head:'404 The page you were looking for was not found!',
    shopconfig:shopconfig
	});
});

const httpServer = http.createServer(app);

httpServer.listen(4000, () => {
    console.log('HTTP Server running on port 4000');
});
