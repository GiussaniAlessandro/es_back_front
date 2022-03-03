var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());
var fs = require("fs");
const { stringify } = require("querystring");





var express = require("express");
var cors = require("cors");
var apiServer = express();
apiServer.use(cors());
var fs = require("fs");
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'giussani.alessandro.tave.osdb.it',
    user: 'c179_alessandro',
    password: "Az-61549",
    database: 'c179_5AI_2021',
})
  
var host = "localhost";
var port = 5000;

var array = [];

apiServer.listen(port, host, ()=>{
    console.log("server ---> http://%s:%d", host, port)
})

apiServer.get("/api/login", (req , res) => {
    console.log("ricevuti" , req.query.mail , req.query.psw);
    connection.query(
        'SELECT * FROM `users` WHERE `mail` = ? AND `psw` = ?',
        [req.query.mail, req.query.psw],
        function(err, results, fields) {
            if (results.length === 0) {
                res.status(400).json({message: "log non effettuato"});
            } else {
                res.status(200).json({message: "log effettuato"});
            }
        }
      );
})

apiServer.get("/api/reg", (req , res) => {
    console.log("ricevuti" , req.query.mail , req.query.psw);
    connection.query(
        "INSERT INTO users (mail, psw) VALUES (?,?);",
        [req.query.mail, req.query.psw],
        function(err, results, fields) {
            console.log(err);
            if (err) {
                res.status(400).json({message: "reg non effettuato"});
            } else {
                res.status(200).json({message: "reg effettuato"});
            }
        }
      );
})

