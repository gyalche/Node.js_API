//jsonwebtoken require
const jwt=require('jsonwebtoken');
//custome require
const customer=require('../module/customer');
//mongoose require
const mongoose=require('mongoose');
//doner require
const doner = require('../module/doner');
//organization require
const organization=require("../module/organization")
const res = require('express/lib/response');
module.exports.verifyCustomer=function(req, res, next){
try{
    const token=req.headers.authorization.split(" ")[1];
    const data=jwt.verify(token, "mysecretkey");

    customer.findOne({_id:data.customerId}).then(function(result){
        req.custmerInfo=result;
        next();
    })
    .catch(function(e){
        res.json({err:e})
    })
}
catch(e){
    res.send({msg:"Invalid token"})
}
   
}

try{
    module.exports.verifyDoner=function(req, res, next){
        const token = req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token, "mysecretkey");
    
        doner.findOne({_id:data.donerId}).then(function(result){
            res.donerInfo=result;
            next();
        })
        .catch(function(e){
            res.json({err:e})
        })
    }
}
catch{
    res.json({err:"error"});
}
try{
    module.exports.verifyOrganisation=function(req, res, next){
        const token=req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token, "mysecretkey");
    
        organization.findOne({_id:data.organizationId}).then(function(result){
            res.organizationInfo=result;
            next();
        }).catch(function(e){
            res.json({err:e});
        })
        
        
    }
}
catch{
    res.json({err:"err"})
}

