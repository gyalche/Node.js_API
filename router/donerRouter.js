const express=require('express');
const mongoose=require('mongoose');
const doner=require('../module/doner');
//password bcrypt
const bcryptjs=require('bcryptjs')
//now we will work on token
const jwt=require('jsonwebtoken');

//import auth
const auth=require('../auth/auth')

const router=new express.Router();
//upload import
const upload=require('../file/file');
router.post("/doner/register", upload.single('profile'), function(req, res){
    const username=req.body.username;
    const address=req.body.address;
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const password=req.body.password;
    const image=req.body.image

    //MUST TO REGISTER
    doner.findOne({username:username}).then(function(donerData){
        if(donerData!=null){
            res.status(401).json({msg:"already exist"});
            return;
        }
    })

    bcryptjs.hash(password, 10, function(e, hashedPassword){
        const donerData=new doner({
            username:username,
            address:address,
            email:email,
            phoneNumber:phoneNumber,
            password:hashedPassword,
            image:image
        })
        donerData.save().
        then(function(){
            return res.json({msg:"sucessfully saved doner"})
        }).catch(function(e){
            res.json({err:e});
        })
    });
   
    
})
//TESTING
router.post("/doner/test", function(req, res){
    const username=req.body.username;
    doner.findOne({username:username}).then(function(donerData){
        if(donerData!=null){
            res.json({donerData});
        }
        else{
            res.status(401).json({msg:"invalid username"});
        }
    })
});

//DONER LOGIN
router.post("/doner/login", function(req, res){
    const username=req.body.username;
     doner.findOne({username:username}).then(function(donerData){
         if(donerData==null){
             return res.json({msg:"invalid login credintal"})
         }
         //if username matches
         const password=req.body.password;
         bcryptjs.compare(password, donerData.password).then(function(err, result){
            if(result==false){
                return res.status(401).json({msg:"invalid password"});
            }

            //IF  USERNAME AND PASSWORD MATCHES

            const token=jwt.sign({donerId:donerData._id}, "mysecretkey");
            res.json({token:token, msg:"token given"});
         })
     })
})

//DELETE LOGIN
router.delete("/doner/delete",auth.verifyDoner, function(req, res){
    
    res.json({msg:"sucessfully deleted doner"})
})
// to show the doner dashboard
router.get("/doner/show", auth.verifyDoner, function(req, res){
    res.json({
        username:req.donerInfo.username,
        address:req.donerInfo.address,
        email:req.donerInfo.email,
        phoneNumber:req.phoneNumber.address,
        image:req.donerInfo.image,
    })
})
//to update doner info
router.put("/doner/update", auth.verifyDoner, function(req, res){
    const username=req.body.username;
    const address=req.body.address;
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const image=req.body.image;
    const password=req.body.password

    bcrypt.hash(password, 10, function(err, passwordHashed){
        organization.findOne({_id:organizationInfo._id},{
            username:username,
            address:address,
            email:email,
            phoneNumber:phoneNumber,
            image:image,
            password:passwordHashed
        })
    })
   
})
module.exports=router;