const jwt = require ("jsonwebtoken")
const {JWT_SECRET} = require("../config")

function adminMiddleware(req,res,next){
    //main authencticaiton logic
    //validate the headers from the admin database

    const token = req.headers.authorization
    //token would look like- bearer sdfewadaewdsa

    //get back the token from this string
    const words = token.split(" ");     //it will spilit-> bearer sdfewadaewdsa to [bearer] [sdfewadaewdsa]
    const jwtToken = words[1]   //take the 1st array 

    try{
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET)
        if(decodedValue.username){
            next();
        }
        else{
            res.alert(403).json({
                msg:"You are not authenticated"
            })
        }
    }
    catch(e){
        res.json({
            msg:"error in jwt token process"
        })
    }
    
}

module.exports = adminMiddleware