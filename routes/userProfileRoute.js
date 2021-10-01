const router=express.Router();
const Profile=require('../model/userProfileModel')
const auth=require('../middleware/auth')
const upload=require('../middleware/upload');



router.put('/profile/update',auth.profileEdit,upload.single('photo'),function(req,res){
    if(req.file==undefined)
    {
        return res.status(400).json({mesage: "invalid file format"})
    }
    const name= req.body.name;
    const email= req.body.email;
    const username= req.body.username;
    const password= req.body.password;
    const phone= req.body.phone;
    const address= req.body.address;
    const photo= req.body.photo;
    const id= req.body.id;

    Profile.updateOne({_id:id}, {name:name, email:email,username:username, password:password,
        phone:phone,address:address,photo:photo})
    .then(function(result)
    {
        res.status(200).json({msg: "succesfully updated", status:true})
    })
    .catch(function(e)
    {
        res.status(500).json({err: "update failed!!"})
    })
})

module.exports=router;