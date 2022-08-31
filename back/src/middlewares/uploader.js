import multer from "multer";
import * as path from "path";


const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename : function (req, file, cb) {
    const ext = path.extname(file.originalname);
    console.log(req.params.id);
    cb(null, req.params.id + ext);
  }
})

export const uploader = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    // const ext = path.extname(Buffer.from(file.originalname + '-' + Date.now(), 'latin1').toString('utf8'));
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('PNG, JPG만 업로드하세요'))
    }
    callback(null, true)
  },
  limits:{
    fileSize: 1024 * 1024 * 10
  }
});

