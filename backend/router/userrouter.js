const router = require('express').Router();
const usercontroller  = require('../controller/usercontroller');

router.post('/signup',usercontroller.signup);
router.post('/login',usercontroller.loginuser);
router.get('/getuser',usercontroller.getuser);

module.exports = router;