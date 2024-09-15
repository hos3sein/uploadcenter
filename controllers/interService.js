const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const path = require("path");
const OSS = require("ali-oss");


exports.removeFile = asyncHandler(async (req, res, next) => {

  if (process.env.TYPE_APP == "main") {
    
  } else {

    console.log("hhhhhhhhhhhhhhh");
    const { paths } = req.body;
    const deleteArray=[]
    const pathNumber = paths.length;

    paths.forEach(async (item) => {
      const file = item.split("ash3uploadcenter.onegroupinnovate.com");
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
  }
  return next(new ErrorResponse("delete file fail ", 500));
});
