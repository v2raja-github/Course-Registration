//Init
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var mysql = require('mysql');

Student = require('./models/student.js');

Course = require('./models/course.js');

var TABLE1 = 'Students';
var TABLE2 = 'Classes';
var TABLE3 = 'Students_Classes';

// connect to mysql
var connection = module.exports = mysql.createConnection({
    host: '127.0.0.1', 
    port: 3306, 
    user: 'root',
    password : '!B@ng!', 
    database : 'Node'
    //multipleStatements: true
});

connection.connect(function(err) {
    if(err){
        throw err;
    }
    console.log('MySql Connected');
});


// var class_name = 'Programming Fundamentals';

// var class_qry = connection.query("SELECT class_id FROM Classes WHERE class_name = ?", class_name,
//     function(err, results) {
//         console.log(class_qry.sql);
//         if(err) {
//             console.error(err);
//             return connection.rollback(function() {
//                 throw err;
//             });
//         }
//     console.log('class_qry result:', results);
//     // var classid_1 = result1[0].class_id;
//     // console.log('classid:', classid_1);
// });



connection.end();

app.get('/', function(req, res){
    res.send('Available Web Resources: /api/student or /api/course');
});

app.get("/classregistration", function (request, response) {
    
        var results = module.exports = {
            "studentid": request.body.studentid,
            "classname1": request.body.classname1,
            "department1": request.body.department1,
            "classname2": request.body.classname2,
            "department2": request.body.department2,
            "classname3": request.body.classname3,
            "department3": request.body.department3
        };
        readResults(results);
        response.send(results);
    });

app.post("/classregistration", function (request, response) {

    var results = module.exports = {
        "studentid": request.body.studentid,
        "classname1": request.body.classname1,
        "department1": request.body.department1,
        "classname2": request.body.classname2,
        "department2": request.body.department2,
        "classname3": request.body.classname3,
        "department3": request.body.department3
    };
    readResults(results);
    response.send(results);
});

let readResults = function (body){

    var testResults = module.exports = body;
    console.log('test:', body);
};

console.log('Test Results:', testResults);

// app.get('/api/students', function(req, res){
//     Student.getStudents(function(err,students){
//         if(err){
//             throw err;
//         }
//         res.json(students);
//     });
// });

// app.post('/api/students', function(req, res){
//     var student = req.body;
//     Student.addStudent(function(err,student){
//         if(err){
//             throw err;
//         }
//         res.json(student);
//     });
// });

// app.get('/api/courses', function(req, res){
//     Course.getCourses(function(err,courses){
//         if(err){
//             throw err;
//         }
//         res.json(courses);
//     });
// });


app.listen(3010);
console.log('Running on port 3010...');