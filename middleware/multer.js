const multer = require("multer");
const path = require("path");

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      cb(null, "../public/images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

 const uploadStorage = multer({ storage: storage });

 exports.uploadMiddlewareSingle =(req,res,next)=>{
   try{
    uploadStorage.single()(req,res,()=>{
        console.log("reeqqq",req.file);
        next()
    })
   }
   catch(err){
     console.log(err);
   }
  }

  exports.uploadMiddlewareMultiply =(req,res,next)=>{
    try{
        uploadStorage.array()(req,res,()=>{
            console.log("req.files",req.files);
            next()
        })
       }
       catch(err){
         console.log(err);
       }
  }

