var express = require('express');
var router = express.Router();
var usersController = require('./controller/usersController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login-test', function(req, res) {
  console.log(req.body)
  res.send({
    username: req.body.username
  })
})

router.post('/login', usersController.login);
router.post('/register', usersController.register);

//add route for register



module.exports = router;