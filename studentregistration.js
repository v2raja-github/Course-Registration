var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
//var request = require('request');
var app = express();

var async = require('async');

//var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
//var classregistration = require("./classregistration.js");

var TABLE1 = 'Students';
var TABLE2 = 'Classes';
var TABLE3 = 'Students_Classes';

var connection = mysql.createConnection({
    host: '127.0.0.1', 
    port: 3306, 
    user: 'root',
    password : '!B@ng!', 
    database : 'Node', 
    table: TABLE1, TABLE2, TABLE3
});

app.post("/studentregistration",function(request,response) {
	var results={
        "firstname": request.body.firstname,
        "lastname": request.body.lastname,
        "username": request.body.username,
        "gender": request.body.gender,
        "age": request.body.age,
        "institution": request.body.institution,
        "degree": request.body.degree,

	};
	
	console.log('student body:', results);
	
	connection.query("INSERT INTO "+TABLE1+" SET ?", results, function(err, result)
	{
		//if existing user
    	if(err){
    			
            console.log("Duplicate entry error!");
            response.send({"Error: Cannot enter a duplicate record!": err});
            		
     	
    	} else {

    	//if new user
			connection.query("SELECT student_id FROM "+TABLE1+" WHERE username = '"+
			request.body.username+"'", function (error, result) {
            	if(error){
                	console.log("There is an error!");
                	response.send({"Error: Cannot retrive requested value!": error});
            	} 
            		console.log({result});
            		response.locals.username = results.username;
            		console.log(results.username);
            		response.locals.firstname = results.firstname;
            		console.log(results.firstname);
            		response.locals.studentid = result[0].student_id;
            		console.log(response.locals.studentid);
                    var studentid = response.locals.studentid;
					//response.send({"firstname": request.body.firstname, "studentid": studentid});
					response.json({"studentid": studentid});
            		//classregistration.classregistration(request, response);
            		//response.end();
            
        	});

     	}
	});
});
    	
app.listen(3555);
console.log('Example app listening at port:3555');
