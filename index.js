var connection = require('./connection')

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/register.html');
});

app.post('/',function(req,res){
   // console.log(req.body);

   var name = req.body.name;
   var email = req.body.email;
   var mno = req.body.mno;

   connection.connect(function(error) {
    if(error) throw error;

    var sql="INSERT INTO user(name, email, mno) VALUES('"+name+"','"+email+"','"+mno+"')";
    connection.query(sql,function(error, result) {
        if(error) throw error;
        res.send('user register successfull'+result.insertId);
    });

   });
   
});

app.listen(7000);
