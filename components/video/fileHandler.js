const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Multer Filter
const filter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "video") {
    cb(null, true);
  } else {
    cb(new Error("Not a Video File!!"), false);
  }
};

const upload = multer({ storage, fileFilter: filter });

module.exports = { upload };
