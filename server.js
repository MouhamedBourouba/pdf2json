const express = require("express")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const multer = require("multer")
const bodyParser = require('body-parser');
const fs = require("fs")
const app = express()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pdf_files/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const fileFilter = function (req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'))
    }
    cb(null, true)
  };
  
const upload = multer({storage: storage, fileFilter: fileFilter})

app.post("/pdf2json", upload.single("pdf"), (req, res) => {
    fs.readFile(req.file.path, (error ,data) => {
        if(error) {
            res.sendStatus(400) 
            throw error
        }
        
    })

    res.sendStatus(200) 
})

app.listen(8080)