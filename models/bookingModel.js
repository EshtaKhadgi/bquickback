const {ObjectId} = require('bson');
const Product = require('./productModel');
const mongoose = require('mongoose');
 
const Booking = mongoose.model('Booking',{
    "user_id":{"type":ObjectId,"required":true},
    "product_id":{"type":ObjectId,"required":true,ref:Product},
    "quantity":{"type":Number,"required":true},
    "price":{"type":Number,"required":true},
    "booked_At":{"type":String,"required":true}
   
    
})
 
module.exports = Booking