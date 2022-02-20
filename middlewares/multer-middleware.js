const multer = require("multer");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    const filename = `${nanoid()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
