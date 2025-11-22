const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usermodel = require('./model/usermodel');
const userRouter = require('./router/userrouter');
const adminRouter = require('./router/adminrouter');
const testRouter = require('./router/testrouter');

const app = express();

app.use(cors());
app.use(express.json());

// Use routers
app.use('/api/users', userRouter);
app.use('/api/admin/v1', adminRouter);
app.use('/api/test', testRouter);

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Direct delete route
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting user with id:', id);
        
        const deletedUser = await usermodel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ 
                status: 'fail',
                message: "User not found" 
            });
        }
        
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});

mongoose.connect('mongodb://localhost:27017/kickstepss')
  .then(() => {
    console.log('Connected to MongoDB');    
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('User routes available at: /api/users');
  console.log('Admin routes available at: /api/admin/v1');
  console.log('Available routes:');
  console.log('  POST /api/users/signup');
  console.log('  POST /api/users/login');
  console.log('  GET /api/users/getuser');
  console.log('  PUT /api/users/:id');
  console.log('  DELETE /api/users/:id');
  console.log('  GET /api/admin/v1/dashboard/stats');
  console.log('  GET /api/admin/v1/products');
});