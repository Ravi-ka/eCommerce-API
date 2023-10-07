import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next)=>{
    // 1. read the token
    const token = req.headers['authorization']
    // 2. if no token , return the error
    if(!token){
        return res.send('Unauthorized').status(401)
    }
    // 3. check if token is valid , import jwt
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.userID = payload.userID;
        console.log(payload)
    }
    catch(err){
        return res.send('Unauthorized Token').status(401)
    }
    // 4. call the next middleware
    next();
}

export default jwtAuth;