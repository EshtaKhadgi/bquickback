const jwt = require('jsonwebtoken');
const Customer= require('../models/customer_model');

module.exports.verifyUser = function(req,res,next){

    try{
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const userData = jwt.verify(token,'secretkey');
        
        Customer.findOne({_id: userData.accId})
        .then(function(result){
            req.result=result
            next();
        })
        .catch(function(e){
            res.status(500).json({error:err})
        })

    }
    catch(err){
        res.status(401).json({message:"authentication failed!"})
    }
  
    
}
//next guard for admin
module.exports.verifyAdmin = function(req,res,next){
    if(!req.user){
        return res.status(401).json({message: "Unauthorized user!!"})
    }
    else if(req.user.userType!=='Admin'){
        return res.status(401).json({message:"Unauthorized user!"})
    }
    next();
}

//next guard for buyer
module.exports.verifyAdmin = function(req,res,next){
    if(!req.user){
        return res.status(401).json({message: "Unauthorized user"})
    }
    else if(req.user.userType!=='Buyer'){
        return res.status(401).json({message:"Unauthorized user!"})
    }
    next();
}

//next guard for seller
module.exports.verifyAdmin = function(req,res,next){
    if(!req.user){
        return res.status(401).json({message: "Unauthorized user"})
    }
    else if(req.user.userType!=='Seller'){
        return res.status(401).json({message:"Unauthorized user!"})
    }
    next();
}
//guard for updating
