const multer = require("multer");
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req , file , cb) => {
    const dir = `uploads/${req.user.id}` 
    fs.mkdirSync(dir , {recursive:true});
    cb(null , dir)
  },
 
  filename: (req , file , cb) => {
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname , ext)
    const uniqueName = `${Date.now()}-${name}${ext}`;
    cb(null , uniqueName)
  }


});




const upload = multer({ storage });

module.exports = upload;
