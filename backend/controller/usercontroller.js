const usermodel = require('../model/usermodel');
const encpypt = require('../utills/encrypt');
const tokenutil  = require('../utills/token');
const mongoose = require('mongoose');

const signup = async (req, res) => {
try {
const hashedpassword = await encpypt.encryptpassword(req.body.password);
const userobj = {
    fullName: req.body.fullName,
    companyName: req.body.companyName,
    email: req.body.email,
    password: hashedpassword,
    agreedToTerms: req.body.agreedToTerms,
    role: req.body.role || "user"
};
    const user = await usermodel.create(userobj);
    res.status(201).json({
        status: 'success',
        data: user
    });
} catch (error) {
    res.status(400).json({
        status: 'fail',
        message: error.message
    });
}
}

const loginuser = async(req,res) =>{
    try {
        const { email, username, password } = req.body;
        
        if ((!email && !username) || !password) {
            return res.status(400).json({ message: "Email/Username and password required" });
        }

        // Find user by email or username
        const query = email ? { email } : { email: username };
        const user = await usermodel.findOne(query).select('+password');
        
        if (!user || !user.password) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await encpypt.comparepassword(password, user.password);
        if (isMatch) {
            const token = tokenutil.genratetoken(user.toObject());
            
            // Remove password from user object before sending
            const userResponse = user.toObject();
            delete userResponse.password;
            
            res.status(200).json({
                message: "User logged in successfully",
                token: token,
                user: userResponse
            });
        } else {
            res.status(400).json({ message: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getuser = async(req,res) =>{
    try {
        const user = await usermodel.find({});
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

const updateuser = async(req,res) =>{
    try {
        const { id } = req.params;
        console.log('Updating user with id:', id);
        
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid user ID format'
            });
        }
        
        const updatedUser = await usermodel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ 
                status: 'fail',
                message: "User not found" 
            });
        }
        res.status(200).json({
            status: 'success',
            data: updatedUser
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}

const deleteuser = async(req,res) =>{
    try {
        const { id } = req.params;
        console.log('Deleting user with id:', id);
        
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid user ID format'
            });
        }
        
        const deletedUser = await usermodel.findByIdAndDelete(id);
        if (!deletedUser) {
            console.log('User not found with id:', id);
            return res.status(404).json({ 
                status: 'fail',
                message: "User not found" 
            });
        }
        
        console.log('User deleted successfully:', deletedUser.fullName);
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}

module.exports = {
    signup,
    loginuser,
    getuser,
    updateuser,
    deleteuser
}
