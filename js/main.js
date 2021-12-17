
var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');


var app = express();


app.use(cors());


var connection = mysql.createConnection({
    host: 'localhost',      //mysql database host name
    user: 'it59xxxxxx',       //mysql database user name
    password: 'it59xxxxxx',   //mysql database password
    database: 'it59xxxxxx'    //mysql database name
});


connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')
})

// To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(__dirname + '/'));

// start body-parser configuration
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


var server = app.listen(7778, function () {
    var host = server.address().address
    var port = server.address().port


    console.log("Web server listening at http://%s:%s", host, port)
});

/*
// enable Access-Control-Allow-Origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

app.get('/employees', function (req, res) {
    connection.query('SELECT * FROM employee', function (error, results, fields) {
        if (error) throw error;
        // res.end 
        res.end(JSON.stringify(results));
    });
});


app.get('/employees/:id', function (req, res) {
    // console.log(req.body);
    // id=? เน€เธเนเธเธเธฒเธฃ binding เธเธฑเธเธเนเธฒเธเนเธญเธกเธนเธฅเธ—เธตเนเธญเธขเธนเนเนเธเธงเธเน€เธฅเนเธ [req.params.id]
    connection.query('SELECT * FROM employee WHERE id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});


app.post('/employees', function (req, res) {
    console.log(req.body);
    var postData = req.body;
    // console.log(postData);
   
    connection.query('INSERT INTO employee SET ?', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});


app.put('/employees', function (req, res) {
    console.log(req.body);
   
    connection.query('UPDATE employee SET employee_name=?,employee_salary=?,employee_age=? WHERE id=?', [req.body.employee_name, req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});


app.delete('/employees', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM employee WHERE id=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});