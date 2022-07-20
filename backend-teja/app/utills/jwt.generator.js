
const jwt = require('jsonwebtoken');

exports.generateJWTToken = (userId, userName) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: userId,
        userName: userName,
    }
    const token = jwt.sign(data, jwtSecretKey);
  
    return token;
  }
exports.validateJWTToken = (token) => {
    // let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    // req.header(tokenHeaderKey)
    try {
        const token = token;
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}