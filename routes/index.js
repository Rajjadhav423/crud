var express = require('express');
var router = express.Router();
const userModel=require('./users')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/user',(req,res)=>{
  userModel.find().then((e)=>{
   res.render('home',{user:e})
  })
})
router.post('/create',(req,res)=>{
  const {name,username,age,image}=req.body
  userModel.create({
    name,username,age,image
  }).then((e)=>{
    res.redirect('/user')

  })
})

router.get('/delete/:id', (req, res) => {
  const userId = req.params.id;

  userModel.findByIdAndDelete(userId)
    .then(() => {
      console.log(`User with ID ${userId} deleted successfully.`);
      res.redirect('/user'); // Redirect back to the user page after deletion
    })
    .catch((err) => {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
    });
});
// Route to render the edit form
router.get('/edit/:id', (req, res) => {
  const userId = req.params.id;

  userModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.render('edit', { user }); // Render the edit page with user data
    })
    .catch((err) => {
      console.error('Error fetching user:', err);
      res.status(500).send('Error fetching user');
    });
});
// Route to update user information
router.post('/update/:id', (req, res) => {
  const userId = req.params.id;
  const { name, username, age, image } = req.body;

  userModel.findByIdAndUpdate(userId, { name, username, age, image }, { new: true })
    .then(() => {
      console.log(`User with ID ${userId} updated successfully.`);
      res.redirect('/user'); // Redirect back to the user page after update
    })
    .catch((err) => {
      console.error('Error updating user:', err);
      res.status(500).send('Error updating user');
    });
});


module.exports = router;
