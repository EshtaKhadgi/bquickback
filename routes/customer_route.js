const express = require('express');
const Customer = require('../models/customer_model');
const router = express.Router();
const {check, validationResult}=require('express-validator')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
 
router.post('/user/insert', [
    ///check('first_name', "firstname is required!!").not().isEmpty(),
    check('username', "Username is required!!").not().isEmpty(),
    // check('email', "Email is required!!").not().isEmpty(),
    // check('email', "Invalid Email!!").isEmail(),
    //check('last_name', "Lastname is  required!!").not().isEmpty(),
    //check('country', "country name is required!!").not().isEmpty(),
    check('password', "Password is required!!").not().isEmpty()
   // check('phone_number', "phone number is required!!").not().isMobileNumber()
],
function(req, res){
 
    const errors = validationResult(req);
    console.log(errors)
    if (errors.isEmpty()){
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const address = req.body.address;
    const phone = req.body.phone;
    const password = req.body.password;
    const userType = req.body.userType;
  
   
   // res.send(errors.array());
    bcryptjs.hash(password,10,function(err,hash){
        //console.log(hash);
        const data= new Customer({
            phone:phone,
            name:name,
            username:username, 
            email:email, 
            address:address,
            userType:userType,
            password:hash
        })
        data.save()
        .then(function(result){
            res.status(201).json({message: "User succesfully registered!!",success:true})
    })
       .catch(function(err){
           res.status(500).json({error:err,success:false})

       })
    })
   }
 
    else{
        res.status(400).json(errors.array());
    }
})
//module.exports = router;

//login system

router.post('/user/login',function(req,res){
   const username= req.body.username
   const password= req.body.password
   console.log(username)
   console.log(password)
   Customer.findOne({username:username})
   .then(function(accData){
       if(accData===null){
           //email not found..
          return res.status(201).json({success:false,message:"Invalid username!!"})
       }
       //console.log("test");
       //lets now compare the password
       bcryptjs.compare(password,accData.password,function(err,result){
           if(result===false){
               return res.status(201).json({message:"Invalid password!!"})
           }
           const token = jwt.sign({accId:accData._id},'secretkey');
           console.log(token)
           res.status(200).json({success:true,token:token,message:"Auth success!!"})
       })

   })
   .catch(function(e){
       res.status(500).json({error: e})
   })

})
router.post('/update/details',auth.verifyUser,(req,res)=>{
    
    let fn = req.body['fname'].trim();

    let address = req.body['address'].trim();
    let username = req.body['username'].trim();
    let email = req.body['email'].trim();
    
    
     let query1 = Customer.findOneAndUpdate({"_id":req.user._id},{
                $set:{
                    "name":fn,
                  
                    "address":address,
                    "username":username,
                    "email":email
                   
                }
            });
            query1.then((result)=>{
                Customer.findOne({"_id":result._id})
                .then((data2)=>{
                    return res.status(200).json({"success":true,"message":"Account Details Updated Successfully!!","data":data2});   
                })
               
            }).catch((err)=>{
                return res.status(404).json({"success":false,"message":err});
            })
        }
       
    
   
)


    
router.put('/change/profilePicture',upload.single('profileImg'),auth.verifyUser,(req,res)=>{
    let imgPath = req.file['path'];
    Customer.findOneAndUpdate({"_id":req.user._id},{$set:{"profileImg":imgPath}}).then((result)=>{
        Customer.findOne({"_id":result._id})
        .then((data)=>{
            return res.status(200).json({"success":true,"message":"Profile Picture changed!!","data":data});
        })
        
    }).catch((err)=>{
        return res.status(202).json({"success":false,"message":err});
    })
});

module.exports = router;


