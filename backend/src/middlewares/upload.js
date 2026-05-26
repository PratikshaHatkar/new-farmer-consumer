import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: `uploads/${req.user.id}`, // SAME LOGIC
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const upload = multer({ storage });

export default upload;

// const multer = require("multer");
// const fs = require("fs")
// const path = require("path")

// const storage = multer.diskStorage({
//   destination: (req , file , cb) => {
//     const dir = `uploads/${req.user.id}` 
//     fs.mkdirSync(dir , {recursive:true});
//     cb(null , dir)
//   },
 
//   filename: (req , file , cb) => {
//     const ext = path.extname(file.originalname)
//     const name = path.basename(file.originalname , ext)
//     const uniqueName = `${Date.now()}-${name}${ext}`;
//     cb(null , uniqueName)
//   }


// });
