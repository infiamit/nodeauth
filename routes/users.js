var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource3');
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Registration' });
  console.log(req.query);
});

router.post('/registration', function(req, res, next) {

   var email = req.body.email;
   var  password = req.body.password;
   var address  = req.body.address;
   var  address2 = req.body.address2;
   var  city = req.body.city;
   var state = req.body.state;
   var zip = req.body.zip;
   var check = req.body.check;
   var username = req.body.username;
    
   console.log(req.body);

   //  FORM validation
   req.checkBody('email','Email Required').notEmpty();
   req.checkBody('email','Wrong Email Address').isEmail();
   req.checkBody('username','Username Required').notEmpty();
   req.checkBody('password','Password Required').notEmpty();
   req.checkBody('password2','Password not matched').equals(password);
   req.checkBody('address','Address required').notEmpty();
   req.checkBody('city','city required').notEmpty();
   req.checkBody('check','Please Accept Terms and Conditions').notEmpty();

   // Check errors
   var errors = req.validationErrors();

   if (errors) {
   
        res.render('registration', { errors: errors, title: 'Registration',
         email : email,
          password :password,
         address  : address,
          address2 :  address2,
          city : city,
         state :  state,
         zip :  zip,
         check : check
      });
        console.log(errors);
     
   }
   else
   {
    var address= address + address2 + city +state + zip;
    newUser= new User({
      email : email,
      username:username,
      password :password,
     address  : address
       
    });
    newUser.save();
    res.location('/');
    res.redirect("/");
   }
  
});
router.get('/login', function(req, res, next) {

  
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {

  var username= req.body.username;
  var password = req.body.password;
   
  User.findOne({username:username}, function(err, user) {
    if (err) throw err;
  console.log(user.password);
    if(user.password==password){
      console.log("password match");
      
    }else
    console.log("password dont match");
    
   
  });
  
  res.render('login', { title: 'Login' });
});

module.exports = router;
