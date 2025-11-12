const { ecrypt } = require('ecrypt');
const usermodel = require('../model/usermodel');
const encpypt = require('../utills/encrypt');
const tokenutil  = require('../utills/token');

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
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ mess: "Email and password required" });
        }

        const user = await usermodel.findOne({email}).select('+password');
        if (!user || !user.password) {
            return res.status(400).json({ mess: "User not found" });
        }

        const isMatch = await encpypt.comparepassword(password, user.password);
        if (isMatch) {
            const token = tokenutil.genratetoken(user.toObject());
            res.status(200).json({
                mess: "User logged in",
                token: token
            });
        } else {
            res.status(400).json({ mess: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ mess: "Server error", error: error.message });
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
module.exports = {
    signup,
    loginuser,
    getuser
}
