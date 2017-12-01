var http = require('http');
var fs = require('fs');
var path = require('path');
var request = require('request');
var express = require('express');
var app = express();
//var ejs = require('ejs');
var async = require('async');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

async function registerStudent(results, callback1) {

    var studentdata = JSON.stringify(results);

    console.log('student data:', studentdata);
    
    var studentoptions = { 
        host: 'localhost', 
        port: '3555', 
        path: "/studentregistration", 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(studentdata)
        }  
    };

    // request.post(
    //     'http://localhost:3555/studentregistration',
    //     results,
    //     function(err, response, body) {
    //         if(!err && response.statusCode === 200) {
    //             console.log('data from student',body);
    //             callback1(body);
    //         }
    //     }
    // );

    var result = '';

        var post_req = http.request(studentoptions, function (res) {
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                result += chunk;
            });

            res.on('end', function() {
                console.log('result is:', JSON.parse(result));

                return callback1(result); 
            })
        });

        post_req.on('error', function(err){
            console.log(err);
        })

        post_req.write(studentdata);
        post_req.end();

};

function registerClass(results, callback) {
    
        var classdata = JSON.stringify(results);
    
        console.log('class data:', classdata);
        
        var classoptions = { 
            host: 'localhost', 
            port: '3777', 
            path: "/classregistration", 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(classdata)
            }  
        };
        var result = '';
        var post_req = http.request(classoptions, function (res) {
            res.setEncoding('utf8');
    
            res.on('data', function (chunk) {
                result += chunk;
            });
    
            res.on('end', function() {
                console.log(JSON.parse(result));
            })
        });
    
        post_req.on('error', function(err){
            console.log(err);
        })
    
        post_req.write(classdata);
        post_req.end();

    };

//console.log('I am here');


app.post("/finalregistration", function(request,response) {
    var student = {
        "firstname": request.body.firstname,
        "lastname": request.body.lastname,
        "username": request.body.username,
        "gender": request.body.gender,
        "age": request.body.age,
        "institution": request.body.institution,
        "degree": request.body.degree
    };

    //console.log('final body:', results);

    registerStudent(student, function(res){
        console.log("registerStudent completed.", JSON.parse(res));

        var studentid = JSON.parse(res);

        console.log('student:', studentid);
        

        var studentclass = {
            "studentid": studentid.studentid,
            "classname1": request.body.classname1,
            "department1": request.body.department1,
            "classname2": request.body.classname2,
            "department2": request.body.department2,
            "classname3": request.body.classname3,
            "department3": request.body.department3
        };

        registerClass(studentclass, function(){
            console.log("registerClass completed.");
        })

    })

    //console.log('student callback:', studentCallback());

    



    // async.waterfall([
    //     registerStudent(student, function(res){
    //         console.log("registerStudent completed.", JSON.parse(res));
    //     }),
    //     registerClass(studentclass, function(){
    //         console.log("registerClass completed.");
    //     })],
    //     function(){
    //         console.log('done');
    //     }
    // );


    response.end('registered');
}); 


app.listen(3999, function(err){
    if(err) throw err;
});
console.log('Example app listening at port:3999');