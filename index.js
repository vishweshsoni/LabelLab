
const http = require('http'); //for http request
const mysql =require('mysql');
const express= require('express');
const fs= require('fs');
const rest=require('./routes/rest');
const animal_router=require('./routes/animal');
// require('dotenv').config();


var app=express();



app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
    });

const bodyparser = require("body-parser");
const hostname = '';
function REST(){
var self=this;
self.connectMysql();

};
REST.prototype.connectMysql =function(){
var self =this;
 var pool =mysql.createPool({
    connectionLimit:100,
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE,
    debug:false
 });

// REST.prototype.connectMysql =function(){
// var self =this;
//  var pool =mysql.createPool({
//     connectionLimit:2,
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'Labellab',
//     debug:false
//  });

pool.getConnection(function (err,connection) {
   if(err){     
       console.log('vishwesh');
        console.log(err);

   }else{
         self.configureExpress(connection);
   }
});
}

REST.prototype.configureExpress = function(connection){
    var self=this;
    app.use(bodyparser.urlencoded({extended:true}));
    app.use(bodyparser.json());
    var router= express.Router();
        app.use('/',router);
        var rest_router=new rest(router,connection);
        app.use('/animal',router);
        var animal_out= new animal_router(router,connection);
        
        self.startServer();
        }
    

    REST.prototype.startServer = function(){
        app.listen(process.env.PORT,function(){
            console.log("All Right I'm Alive");
        });
    }

    // REST.prototype.startServer = function(){
    //     app.listen(8110,function(){
    //         console.log("All Right I'm Alive");
    //     });
    // }

    
new REST();
 