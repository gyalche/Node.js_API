const multer=require("multer");

// code to upload image
const storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./gallary");
    },

    filename:function(req, file, cb){
        cb(null, Date.now()+ file.originalname);
    },
})
// now we need to check the file format

const filter=function(req, file, cb){
    if(file.mimetype=="image/png"||file.mimetype=="image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}
const upload =multer({
    storage:storage,
    fileFilter:filter
})
module.exports=upload;

// const multer=require("multer");

// const storage=multer.diskStorage({
//      destination:function(req, file, cb){
//          cb(null, "./gallary");
//      },
//      __filename:function(req, file, cb){
//         cb(null, file.originalname)
//      }
// })
// const filter=function(req, file, cb){
//     if(file.mimetype=="image/png");
// }
// const upload=multer({
//     storage:storage,
//     fileFilter:filter
// });
// module.exports=upload;
