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

router.post("/customer/register", upload.single, function(req, res){
    const username=req.body.username;
    const phoneNumber=req.body.userame;
    const gender=req.body.gender;
    const email=req.body.email;
    const password=req.body.password;
    const  address=req.body.address;
    const image=req.file.filename;

    customer.findOne({username:username}).then(function(customerData){
        if(customerData!=null){
            res.status(401).json({msg:"username  already  exist"});
            return
        }
    bcrypt.hash(password, 10, function(e, hashedPassword){
        const customerDetail=new customer({
            username:username,
            phoneNumber:phoneNumber,
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
    const username=req.body.username;
    customer.findOne({username:username}).then(function(customerData){
        if(customerData==null){
            res.status(401).json({msg:"invalid"});
            return
        }
        //if email matches
        const password=req.body.password;
        bcrypt.compare(password, customerData.password, function(err, result){
            if(result==false){
                return res.json({msg:"invalid login credintal"});
            }
            //IF OUSERNAME AND PASSWORD MATCHES
            const token=jwt.sign({customerId:customerData._id}, "mysecretkey");
            res.json({token:token, message:"Auth Sucess"});

        })
    })
})
//delete
router.delete('/customer/delete',auth.verifyCustomer,(req, res)=>{
    res.json({msg:"customer deleted"})
})

// //update
// router.put('/customer/update', auth.verifyCustomer, function(res, req){
//     res.json({msg:"cusomter updated"})
// });


// to check the upload image it is just a testing
router.post("/customer/profile",upload.single('profile'), function(req, res){
    if(req.file==undefined){
        return res.json({
            message:"Invalid format"
        })
    }
    else{
        res.json({message:"sucessfully uploaded"})
    }
})
//user profile dashboard
router.get("/customer/info", auth.verifyCustomer, function(req, res){
    res.json({
        username:req.customerInfo.username,
        email:req.customerInfo.email,
        phoneNumber:req.customerInfo.phoneNumber,
        image:req.customerInfo.image
    })
    
})
//to update
router.put("/customer/update",auth.verifyCustomer, function(req, res){
    const username=req.body.userame;
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const image=req.body.email;
    const password=req.body.password;
    bcrypt.hash(password, 10, function(err, hashedPassword){
        customer.findOne({_id:customerInfo._id},{
            username:username,
            email:email,
            phoneNumber:phoneNumber,
            image:image,
            password:hashedPassword
        })
    } )
   
})

module.exports=router;