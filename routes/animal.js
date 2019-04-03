//Node Modules that should be imported
var mysql = require("mysql");
var path = require('path');//this module refers to npm path
var gm = require('gm');
var express = require('express');
var multer =require('multer');
var fs =require('fs');
var sizeof= require('image-size');//this can give you size of image for local storage files


//cloud configuration Current Configuration in on Cloudinary host service
var cloudinary =require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
require('dotenv').config();
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,//cloud name private-name
  api_key: process.env.API_KEY,   //cloud key private api key
  api_secret: process.env.API_SECRET, //cloud api secret api_secret key
});

const directoryPath ='/home/vishwesh/Desktop/Vish/api/uploads';

var name = null;

//Cloudinary multer storage
var storage =  cloudinaryStorage({
      cloudinary:cloudinary,
      allowedFormats:['jpg','png','jpeg'],  
      filename:function(req,file,cb){
         name=file.fieldname+'-'+Date.now()+'.jpg'; 
          cb(null,name);
      }
  });

var uploads = multer({storage:storage}).single('animalimage');

var files   = [];

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handelRoutes(router, connection, md5);
}


REST_ROUTER.prototype.handelRoutes = function(router, connection, md5) {
  
  //api will be like https://radiant-harbor-82820.herokuapp.com/animal
  router.get("/animal", function(req, res) {
        res.json({
          "message": "hello animal"
          });
    });
    // api will be like https://radiant-harbor-82820.herokuapp.com/animal/upload/file_name
    router.post("/upload",uploads, function(req, res) {
      console.log(name);
      res.json({
        "height":req.file.height,
        "width":req.file.width,
      });
      res.json(req.file);
      
  });

  }
module.exports = REST_ROUTER;
