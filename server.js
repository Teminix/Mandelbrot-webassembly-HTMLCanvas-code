const l = console.log;
const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
let storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,'static/images/')
  },
  filename:(req,file,cb) => {
    let {ext,name} = path.parse(file.originalname);
    cb(null,file.originalname);
  }
})
app.use(morgan('short'))//
app.get('/',(req,res) => {
  // res.type("html").send("Hello there <a href='/index.html'>Link to main site</a>");
  fs.readdir('static/',(err,docs) => {
    if(err) res.status(500).send(err)
    else {
      let htmlFiles = docs.filter(e=>/.+\.html/.test(e));
      let htmlString = "<h1>HTML files available in the server</h1><ul>";
      for (file of htmlFiles) htmlString += `<li><a href="/${file}">${file}</a></li>`;
      htmlString += "</ul>";
      res.type('html').send(htmlString);
    }
  })
})
app.post("/upload_image",(req,res) => {
  let upload = multer({storage}).single('image_render');
  upload(req,res,function(err){
    if(err) {
      res.status(500).send(err);
      console.log(err)
    } else {
      res.status(200).send("Success")
    }

  })
})
app.get("/out",(req,res) => {
  res.type("application/octet-stream").send()
})
app.use(express.static("./static/"))
app.use(express.static("./static"))
app.listen(8000,'0.0.0.0',() => {
  console.log("Server running on 8000")
})
//
