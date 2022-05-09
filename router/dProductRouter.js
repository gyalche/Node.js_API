const express=require('express');
const auth=require('../auth/auth');
const router=new express.Router();
//importing dPrdocut model
const dProduct=require('../module/dProductModel');

router.post("/product/insert",upload.single("product"),auth.verifyDoner, function(req, res){
    const productName=req.body.productName;
    const uid=req.donerInfo._id;
    const image=req.body.image;
    const type=req.body.type;
    const desc=req.body.desc;

    const dProduct=new dProduct({
        productName:productName,
        uid:uid,
        image:image,
        type:type,
        desc:desc
    })
    dProduct.save().then(function(req, ers){
        res.json({msg:"sucessfully updated"})
    })
    .cath(function(e){
        return res.status(404).json({err:e})
    })
});

//product delete
router.delete("/product/delete", auth.verifyDoner, function(req, res){
    const uid=req.customerInfo.Id;
    const pid=req.params.pid;
    dProduct.findOne({_id:pid, uid:uid}).then(function(req, res){
        res.json({msg:"sucessfully deleted"})
    })
    .catch(function(e){
        res.json({err:e})
    })
})
//view all of my products
router.get("/product/myproduct", auth.verifyDoner, function(req, res){
    dProduct.find({uid:req.donerInfo._id}).then(function(data){
        res.json(data);
    }).catch(function(){
        res.json({msg:"something went wrong"})
    })
})
//view single product
router.get("/product/all/pid", auth.verifyDoner, function(req, res){
    dProduct.find({_id:req.params.pid}).then(function(data){
        res.json(data)
    }).catch(function(){
        res.json({msg:"something went wring"})
    })
})
module.exports=router;