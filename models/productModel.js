const mongoose = require('mongoose');
const Product = mongoose.model('Product',{
    pname:{type:String},
    pprice:{type:Number},
    pdesc:{type:String},
    pimage: {type:String},
    prating: {type:String}
})

module.exports= Product;
