const router = require('express').Router();
const usercontroller  = require('../controller/usercontroller');

// Add logging middleware
router.use((req, res, next) => {
    console.log(`Router hit: ${req.method} ${req.path} - ${new Date().toISOString()}`);
    console.log('Full URL:', req.originalUrl);
    console.log('Params:', req.params);
    next();
});

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Router is working' });
});

router.post('/signup',usercontroller.signup);
router.post('/login',usercontroller.loginuser);
router.get('/getuser',usercontroller.getuser);
router.put('/:id',usercontroller.updateuser);
router.delete('/:id',usercontroller.deleteuser);

console.log('User routes loaded successfully');
console.log('DELETE route registered for /:id');
module.exports = router;