const multer = require("multer");
const UploadImage = require("../helpers/UploadImage");
const { ResponseError } = require("../helpers/ResponseData");

const upload = multer();

const uploadMiddleware = async (req, res, next) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return ResponseError(res, 400, "Internal Server Error", err.message);
      } else if (err) {
        return ResponseError(res, 500, "Internal Server Error", err);
      }
      try {
        const imageUrl = await UploadImage(req.file);
        req.imageUrl = imageUrl;
        next();
      } catch (error) {
        console.log({ error }, "<<<<<");
        return ResponseError(res, 500, "Internal Server Error", error);
      }
    });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error);
  }
};

module.exports = uploadMiddleware;
