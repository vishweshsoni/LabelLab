
var mysql = require("mysql");
var md5 = require('md5');
var path = require('path');
var gm = require('gm');
var express = require('express');
var multer =require('multer');
var fs =require('fs');
//for prototype only height and width needed from server side 
//so sizeof is the package.

var sizeof= require('image-size');
//cloud configuration
var cloudinary =require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
require('dotenv').config();
cloudinary.config({
  cloud_name:'dfje1vdj4',
  api_key: 123315576572985,
  api_secret: 'mbXRV1gEsstp9pvUgXS8-3vuCqM',
});

const directoryPath ='/home/vishwesh/Desktop/Vish/api/uploads';

var name = null;
// var storage =  multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'uploads/')
//     },

//     filename:function(req,file,cb){
//        name=file.fieldname+'-'+Date.now()+'.jpg'; 
//         cb(null,file.fieldname+'-'+Date.now()+'.jpg')
//     }
// });

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

  router.get("/animal", function(req, res) {
        res.json({
          "message": "hello animal"
          });
    });
    router.post("/upload",uploads, function(req, res) {
      console.log(name);
      res.json({
        "height":req.file.height,
        "width":req.file.width,
      });
      // var c = {
      //                 animal_image: name,
      //    }
      //    var query ="INSERT INTO animal_desc SET ?";
      //                var table =[c];
      //                query=mysql.format(query,table);
        
      //                connection.query(query,function(err,results){
      //                                 if(err){
      //                                   console.log(err);
      //                                   if (err.fatal) {
      //                                     console.trace('fatal error: ' + err.message);
      //                                   }
      //                                 }
      //                                   else{

                               
      //                                 }
      //                                 connection.release();
      //                      });
      
  });
  



  // router.post("/upload",function(req,res){
  //   var file1 = null;
  //     console.log(req.body);
  //     uploads(req,res,async function(err){
  //         if(err){
  //           res.json({
  //               "error":"True"
  //           });
  //         }else{
  //              console.log(req.file.path);
  //             var c = {
  //               animal_image: name,
  //             }
  //             var query ="INSERT INTO animal_desc SET ?";
  //             var table =[c];
  //             query=mysql.format(query,table);
  //             connection.query(query,function(err,results){
  //                 if(err){
  //                   console.log("Error in the inserting");
  //                 }else{
                   
  //                  query ="SELECT animal_image FROM animal_desc WHERE animal_id=  LAST_INSERT_ID()";
  //                  connection.query(query,function(err,results1){
  //                     if(err){
  //                         console.log('Error in last id');
  //                     }else{
                       
                          
  //                     //   fs.readFile('/home/vishwesh/Desktop/Vish/api/uploads/'+results1[0].animal_image, function (err, content) {
  //                     //     if (err) {
  //                     //         // res.writeHead(400, {'Content-type':'text/html'})
  //                     //         console.log(err);
  //                     //         console.log("No such images") ;
  //                     //     } else {
  //                     //         //specify the content type in the response will be an image
  //                     //         // res.writeHead(200,{'Content-type':'image/jpg'});
  //                     //         sizeof('/home/vishwesh/Desktop/Vish/api/uploads/'+results1[0].animal_image, function (err, dimensions) {
  //                     //           res.json({
  //                     //               "height":dimensions.height,
  //                     //               "width": dimensions.width,
  //                     //           });          
  //                     //         });
                                
  //                     //     }
  //                     // });
                      
  //                     }
  //                  });
                   
  //                 } 
  //             });
              
  //             fs.readdir(directoryPath, function (err, files) {
  //               //handling error
  //               if (err) {
  //                   return console.log('Unable to scan directory: ' + err);
  //               } 
  //               //listing all files using forEach
  //               files.forEach(function (file) {
  //                   // Do whatever you want to do with the file
  //                   file1=file;
  //               }); 
  //               // console.log(req.file.fieldname);
  //               // im.identify(req.fieldname,function(err,features){
  //               //     if(err) throw err;
  //               //     console.log(features);
  //               // });
               
  //           });
          
  //         }
  //     });
  //     ;
  //   });

  }
module.exports = REST_ROUTER;
