const jwt = require('jsonwebtoken');
    const secret = "vatsal";

    // payload ---> object

    const genratetoken = (payload) =>{
        const token = jwt.sign(payload,secret);
        console.log(token);
        return token;
    }
    module.exports={
        genratetoken
    }