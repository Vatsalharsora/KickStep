const bcrypt = require('bcrypt');
const encryptpassword  = async(password) => {
    const salt  = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    return hashedpassword;
}

const comparepassword = async(password,hashedpassword) =>{
    const isMatch = await bcrypt.compare(password,hashedpassword);
    return isMatch;
}

module.exports ={
     encryptpassword,
     comparepassword
}