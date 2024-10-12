// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DB_URL)

module.exports=mongoose.model("user",({
  name:String,
  username:String,
   age:Number,
   image:String
}))
