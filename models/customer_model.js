const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', {
    
    name : {
        type : String,
    },
   
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String
    
    },
    address : {
        type : String
    },
    phone : {
        type : String
    },
    password : {
        type : String,
    },
    profileImg:{
        type:String,
        default:"no-img.jpg"
    },
    userType:{
        type:String,
        enum:['Admin','Buyer']
    }
    
})

module.exports = Customer;