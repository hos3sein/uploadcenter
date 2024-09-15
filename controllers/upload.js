const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const fs=require("fs")
const path = require("path");
const OSS = require("ali-oss");

const store = new OSS({
  region: "oss-cn-shanghai",
  accessKeyId: "LTAI5tSQooLRB9eQXncVQ8wr",
  accessKeySecret: "nAUj9B0ov1CZn0I1DS6qRsP9uW26m2",
  bucket: "ashoss",
  secure: true,
});

exports.uploadsingel = asyncHandler(async (req, res, next) => {
  const time = Date.now().toString();
  let uploadPath;
  const sampleFile = req.files.file;
  const name = time + req.files.file.name;

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorResponse(`No file Attach !!`, 500));
  }
  uploadPath = path.join(__dirname, "../public/upload/orders/" + name);
  const upload = await sampleFile.mv(uploadPath, async function (err) {
    if (err) {
      await Content.findByIdAndRemove(id);
      return new ErrorResponse("upload fail", 500);
    }
  });

  const url = `https://ash3uploadcenter.chinabizsetup.com/upload/orders/${name}`;

  return res.status(201).json({ success: true, url });
});
exports.uploadSingelForContent = asyncHandler(async (req, res, next) => {
  const time = Date.now().toString();
  const isAdmin = req.user.group.includes("admin");
  const isSuperAdmin = req.user.group.includes("superAdmin");
  if(!isAdmin&&!isSuperAdmin){
    return next(new ErrorResponse("you dont have access to this route", 401));
  }
  const sampleFile = req.files.file;
  const name = time + req.files.file.name;
  const fileType = sampleFile.mimetype;

  if (process.env.TYPE_APP == "main") {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorResponse(`No file Attach !!`, 500));
    }
    if (
      fileType === "image/png" ||
      fileType === "image/jpeg" ||
      fileType === "image/jpg"
    ) {
      let newPhoto;
      const putP = await store
        .put(`Admin/News/Photo/${name}`, sampleFile.data)
        .then((result) => {
          newPhoto = result.name;

          // console.log("success photo");
        })
        .catch((err) => {
          return next(new ErrorResponse(err, 500));
        });

      const url = `https://ashoss.oss-cn-shanghai.aliyuncs.com/Admin/News/Photo/${name}`;
      return res.status(201).json({ success:true,url,fileType});
    }
    if (fileType === "video/mp4") {
      let newVideo;
      const putVi = await store
        .put(`Admin/News/Video/${name}`, sampleFile.data)
        .then((result) => {
          newVideo = result.name;
          console.log(newVideo);
          // console.log("success video");
        })
        .catch((err) => {
          return next(new ErrorResponse(err, 500));
        });

      const url = `https://ashoss.oss-cn-shanghai.aliyuncs.com/Admin/News/Video/${name}`;

      return res.status(201).json({ success: true,url,fileType});
    }
    if (fileType === "audio/mpeg" || fileType === "audio/ogg"||fileType === "audio/mp3") {
      let newVoice;
      const putVo = await store
        .put(`Admin/News/Voice/${name}`, sampleFile.data)
        .then((result) => {
          newVoice = result.name;
          // console.log("successVoice");
        })
        .catch((err) => {
          return next(new ErrorResponse(err, 500));
        });

      const url = `https://ashoss.oss-cn-shanghai.aliyuncs.com/Admin/News/Voice/${name}`;

      return res.status(201).json({ success: true, url ,fileType });
    }
    if (
      fileType === "application/pdf " ||
      fileType === "application/pdf-text/plain" ||
      fileType === "text/plain" ||
      fileType === "application/vnd.openxmlformats" ||
      fileType === "officedocument.spreadsheetml.shee"||
      fileType==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      let newVoice;
      const putVo = await store
        .put(`Admin/News/Voice/${name}`, sampleFile.data)
        .then((result) => {
          newVoice = result.name;
          // console.log("successVoice");
        })
        .catch((err) => {
          return next(new ErrorResponse(err, 500));
        });

      const url = `https://ashoss.oss-cn-shanghai.aliyuncs.com/Admin/News/Voice/${name}`;

      return res.status(201).json({ success: true, url,fileType });
    }
  } else {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorResponse(`No file Attach !!`, 500));
    }
    if (
      fileType === "image/png" ||
      fileType === "image/jpeg" ||
      fileType === "image/jpg"
    ) {
      uploadPath = path.join(__dirname, "../public/content/image/" + name);
      const upload = await sampleFile.mv(uploadPath, async function (err) {
        if (err) {
          return next(new ErrorResponse(err, 500));
        }
      });

      const url = `https://ash3uploadcenter.chinabizsetup.com/content/image/${name}`;

      return res.status(201).json({ success: true, url ,fileType });
    }
    if (fileType === "video/mp4") {
      uploadPath = path.join(__dirname, "../public/content/video/" + name);
      const upload = await sampleFile.mv(uploadPath, async function (err) {
        if (err) {
          return next(new ErrorResponse(err, 500));
        }
      });

      const url = `https://ash3uploadcenter.chinabizsetup.com/content/video/${name}`;

      return res.status(201).json({ success: true, url,fileType });
    }
    if (fileType === "audio/mpeg" || fileType === "audio/ogg"||fileType === "audio/mp3") {
      uploadPath = path.join(__dirname, "../public/content/voice/" + name);
      const upload = await sampleFile.mv(uploadPath, async function (err) {
        if (err) {
          return next(new ErrorResponse(err, 500));
        }
      });

      const url = `https://ash3uploadcenter.onegroupinnovate.com/content/voice/${name}`;

      return res.status(201).json({ success: true, url,fileType });
    }
    
    if (
      fileType === "application/pdf " ||
      fileType === "application/pdf-text/plain" ||
      fileType === "text/plain" ||
      fileType === "application/vnd.openxmlformats" ||
      fileType === "officedocument.spreadsheetml.sheet"||
      fileType==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      uploadPath = path.join(__dirname, "../public/content/file/" + name);
      const upload = await sampleFile.mv(uploadPath, async function (err) {
        if (err) {
          return next(new ErrorResponse(err, 500));
        }
      });

      const url = `https://ash3uploadcenter.chinabizsetup.com/content/file/${name}`;

      return res.status(201).json({ success: true, url,fileType });
    }
    return next(new ErrorResponse("upload fail", 500))
  }
    return next(new ErrorResponse("upload fail", 500))
});
exports.uploadProfileImage = asyncHandler(async (req, res, next) => {
  let uploadPath;
  const sampleFile = req.files.file;
  const name =req.user.phone+req.files.file.name;

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorResponse(`No file Attach !!`, 500));
  }
  uploadPath = path.join(__dirname, "../public/upload/profileImage/" + name);
  const upload = await sampleFile.mv(uploadPath, async function (err) {
    if (err) {
      await Content.findByIdAndRemove(id);
      return next(new ErrorResponse("upload fail", 500))
    }
  });

  const url = `https://ash3uploadcenter.chinabizsetup.com/upload/profileImage/${name}`;

  return res.status(201).json({ success: true, url });
});

