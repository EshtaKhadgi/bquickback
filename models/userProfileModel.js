const mongoose=require('mongoose');

const Profile= mongoose.model('Profile',
{
    name:{type:String},
    email:{type:String},
    username:{type:String},
    password:{type:String},
    phone:{type:String},
    address:{type:String},
    photo:{type:String}
})

module.exports=Profile; 