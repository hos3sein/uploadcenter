const { token } = require("morgan");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { addprofile } = require("../utils/request");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    req.file = file;
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
//   onFileUploadStart: function(file, req, res){
//     if(req.files.file.length > 1282810) {
//       return next(new ErrorResponse("upload Failed ! the file size is over", 500));
//     }
//   }
});

exports.uploadHandelerSingle = asyncHandler(async (req, res, next) => {
  const fileSize = parseInt(req.headers["content-length"])
  
  console.log('fileSize>>>>>>' , fileSize)
  
  const token = req.headers.authorization.split(" ")[1];
  const uploadStorage = multer({ storage: storage }).single("file");
  try {
    const filename = uploadStorage(req, res, (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse("upload Failed", 500));
      }
      console.log(req.file)
      const url = `https://ash3uploadcenterapp.chinabizsetup.com/images/${req.file.filename}`;

      console.log(url);

      const respond = addprofile(url , token);
    //   console.log('resss>>>' , respond)
      if (!respond) {
        return next(new ErrorResponse("server Error", 500));
      }
      res.status(200).json({ success: true,url});
    });
  } catch (err) {
    return next(new ErrorResponse("upload Failed", 500));
  }
});

exports.uploadHandelerMultiply = asyncHandler(async (req, res, next) => {
  try {
    const uploadStorage = multer({ storage: storage }).array("files");
    uploadStorage(req, res, (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse("upload Failed", 500));
      } else {
        const pathArray = [];
        req.files.map((item) => {
          pathArray.push(
            `https://ash3uploadcenterapp.chinabizsetup.com/images/${item.filename}`
          );
        });
        return res.status(200).json({ urls: pathArray, success: true });
      }
    });
  } catch (err) {
    return next(new ErrorResponse("upload Failed", 500));
  }
});


exports.removeFile = asyncHandler(async (req, res, next) => {
    const { paths } = req.body;
    const deleteArray=[]
    const pathNumber = paths.length;

    paths.forEach(async (item) => {
      const file = item.split("ash3uploadcenterapp.chinabizsetup.com");
      const filePath = path.join(__dirname, `../public${file[1]}`);
      fs.unlink(filePath, (err) => {
        if (err) {
          return next(new ErrorResponse(err, 500));
        }
      });
       deleteArray.push(item)
    });
    
    if (pathNumber) {
      return res.status(201).json({ success: true,deleteArray});
    }

    return next(new ErrorResponse("delete file fail", 500));
});
