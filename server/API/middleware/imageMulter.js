const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(16).toString('base64') + path.extname(file.originalname).toLocaleLowerCase());
    },
});

const upload = multer({
    storage,
    dest: path.join(__dirname, '../uploads'),
    fileFilter: (req, file ,cb) => {
        
        const extAllowed = /jpeg|jpg|png|tiff|svg/;
        const mymeType = extAllowed.test(file.mimetype);
        const extName = extAllowed.test(path.extname(file.originalname));

        

        if(mymeType && extName) {
            return cb(null, true);
        } 

        cb("Error: Tipo de archivo no soportado");
    }
}).single('image');

module.exports = upload;
