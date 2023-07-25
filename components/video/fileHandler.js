const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

const storage = multer.memoryStorage();

// Multer Filter
const filter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "video") {
    cb(null, true);
  } else {
    cb(new Error("Not a Video File!!"), false);
  }
};

const upload = multer({ storage, fileFilter: filter });

const uploadFile = async (
  fileBuffer,
  filename,
  fileMimeType,
  title,
  userId
) => {
  const b64 = Buffer.from(fileBuffer).toString("base64");
  let dataUri = `data:${fileMimeType};base64,${b64}`;

  let public_id = `${userId}-${Date.now()}-${title}-${filename}`.replace(
    " ",
    "_"
  );

  const res = await cloudinary.uploader.upload(dataUri, {
    resource_type: "auto",
    public_id,
  });

  return res;
};

module.exports = { upload, uploadFile };
