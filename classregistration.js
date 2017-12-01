var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
//var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var TABLE1 = 'Students';
var TABLE2 = 'Classes';
var TABLE3 = 'Students_Classes';

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '!B@ng!',
    database: 'Node',
    table: TABLE1, TABLE2, TABLE3
});



app.post("/classregistration", function (request, response) {
    var results = {
        "studentid": request.body.studentid,
        "classname1": request.body.classname1,
        "department1": request.body.department1,
        "classname2": request.body.classname2,
        "department2": request.body.department2,
        "classname3": request.body.classname3,
        "department3": request.body.department3
    };

    var class_qry1 = connection.query("SELECT class_id FROM " + TABLE2 + " WHERE class_name = '" + request.body.classname1 + "'", 
    function(err, result1) {
        console.log(class_qry1.sql);
        if(err) {
            console.error(err);
            return connection.rollback(function() {
                throw err;
            });
        }
        console.log('classid_1 result:', result1);
        var classid_1 = result1[0].class_id;
        console.log('classid_1:', classid_1);
    



    var class_qry2 = connection.query("INSERT INTO " + TABLE3 + " (student_id, class_id) VALUES ('" + results.studentid + "','" + classid_1 + "')", 
        function(err, res1) {
            console.log(class_qry2.sql);
            if(err) {
                console.error(err);
                return connection.rollback(function() {
                    throw err;
                });
            }
            console.log("classname1 inserted", res1);
            console.log("select and insert of class1 completed");
        


            connection.query("SELECT class_id FROM " + TABLE2 + " WHERE class_name = '" + request.body.classname2 + "'", function (error2, result2) {
                console.log({ "classid_2 inserted": result2 });
                var classid_2 = result2[0].class_id;

                connection.query("INSERT INTO " + TABLE3 + " (student_id, class_id) VALUES ('" + results.studentid + "','" + classid_2 + "')", function (err2, res2) {
                    console.log("classname2 inserted", res2);
                    console.log("select and insert of class2 completed");

                    connection.query("SELECT class_id FROM " + TABLE2 + " WHERE class_name = '" + request.body.classname3 + "'", function (error3, result3) {
                        console.log({ "classid_3 inserted": result3 });
                        var classid_3 = result3[0].class_id;

                        connection.query("INSERT INTO " + TABLE3 + " (student_id, class_id) VALUES ('" + results.studentid + "','" + classid_3 + "')", function (err3, res3) {
                            console.log("classname3 inserted", res3);
                            console.log("select and insert of class3 completed");
                            console.log(" All connections completed");
                            console.log("1. ", request.body.classname1, " 2. ", request.body.classname2, "3. ", request.body.classname3);
                            response.status(200).send({
                                "Hello": request.body.studentid,
                                "You are enrolled in 1.": request.body.classname1,
                                "2.": request.body.classname2, "3.": request.body.classname3
                            });
                        });
                    });
                });
            });
        });
    });


    //});
});
app.listen(3777);
console.log('Example app listening at port:3777');