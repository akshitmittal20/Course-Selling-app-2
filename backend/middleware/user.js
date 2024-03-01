const {JWT_SECRET} = require("../config")


function userMiddleware(req,res,next){
    const token = req.headers.authorization
    const words = token.split(" ");     //it will spilit-> bearer sdfewadaewdsa to [bearer] [sdfewadaewdsa]
    const jwtToken = words[1]   //take the 1st array 
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET)
    //authentication is what we are doinf here. For authorizaation , in the if statemenet , we would have also checked if the decodedValue.type=="user"... to chek if the user us admin or user
    if(decodedValue.username){
        next();
    }
    else{
        res.alert(403).json({
            msg:"You are not authenticated"
        })
    }
}
module.exports= userMiddleware;

