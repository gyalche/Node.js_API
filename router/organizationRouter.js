const express=require('express');
const mongoose=require('mongoose');

const customer=require('../module/customer');
const router=new express.Router();
//toke require
const jwt=require('jsonwebtoken');
//bcrypt
const bcrypt=require('bcryptjs');
// const { add } = require('lodash');
//auth require
const auth=require('../auth/auth')
//upload import
const upload=require('../file/file');
//import organization
const organization=require('../module/organization');

router.post("/customer/register", upload.single('profile'), function(req, res){
    const organizationName=req.body.organizationName;
    const phoneNumber=req.body.userame;
    const email=req.body.email;
    const password=req.body.password;
    const  address=req.body.address;
    const image=req.file.filename;

    customer.findOne({username:username}).then(function(organizationData){
        if(organizationData!=null){
            res.status(401).json({msg:"username  already  exist"});
            return
        }
    bcrypt.hash(password, 10, function(e, hashedPassword){
        const customerDetail=new customer({
            organizationName:organizationName,
            gender:gender,
            email:email,
            password:hashedPassword,
            address:address,
            image:image
        });
        customerDetail.save()
        .then(function(){
            res.json({message:"Sucessfully saved customer"});
        })
        .catch(function(e){
            res.json({err:e});
        })
    })
        
});

})

//testing
// router.post("/customer/test", function(req, res){
//     const username=req.body.username;
//     customer.findOne({username:username}).then(function(customerData){
//         if(customerData!=null){
//             res.json(customerData)
//         }
//         else{
//             res.json({msg:"invalid username"})
//         }
//     })
// })

//LOGIN ROUTE FOR CUSTOMER

router.post('/customer/login', function(req, res){
    const userame=req.body.username;
    customer.findOne({username:username}).then(function(organizationData){
        if(organizationData==null){
            res.status(401).json({msg:"invalid"});
            return
        }
        //if email matches
        const password=req.body.password;
        bcrypt.compare(password, organizationData.password, function(err, result){
            if(result==false){
                return res.json({msg:"invalid login credintal"});
            }
            //IF OUSERNAME AND PASSWORD MATCHES
            const token=jwt.sign({organizationId:organizationData._id}, "mysecretkey");
            res.json({token:token, message:"Auth Sucess"});

        })
    })
})
//delete
router.delete('/customer/delete',auth.verifyOrganisation,(req, res)=>{
    res.json({msg:"customer deleted"})
})

//to update
router.put('/customer/update', auth.verifyOrganisation, function(res, req){
    const organizationName=req.body.organizationName;
    const address=req.body.address;
    const phoneNumber=req.body.phoneNumber;
    const email=req.body.email;
    const username=req.body.userame;
    const image=req.body.image;
    const password=req.body.password;
    bcrypt.hash(password, 10, function(err, hashedPassword){
        organization.findOne({_id:organizationInfo._id},
            {
                organizationName:organizationName,
                address:address,
                phoneNumber:phoneNumber,
                email:email,
                username:username,
                image:image,
                password:hashedPassword

            })
    }).then(function(req, res){
        res.json({msg:"sucessfylly updated"})
    }).catch(function(req, res){
        res.json({msg:"couldnot  update"})
    })
    
});
//show the organization dashboard
router.get('/organization/show', auth.verifyOrganisation, function(req, res){
    res.json({
        organizationName:req.organizationInfo.organizationName,
        address:req.organizationInfo.address,
        phoneNumber:req.organizationInfo.phoneNumber,
        email:req.organizationInfo.email,
        username:req.organizationInfo.username,
        image:req.organizationInfo.image,


    })
})
// to check the upload image it is just a testing
router.post("/customer/profile",upload.single('dp'), function(req, res){
    if(req.file==undefined){
        return res.json({
            message:"Invalid format"
        })
    }
    else{
        res.json({message:"sucessfully uploaded"})
    }
})

module.exports=router;