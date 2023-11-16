const bodyParser = require('body-parser');
const express = require('express')
const mysql = require('mysql')
const server = express()
server.use(bodyParser.json())
const cors = require("cors")

server.use(cors())

const db = mysql.createConnection({
    // host:"SQLEXPRESS",
    host:"127.0.0.1",
    user:'root',
    password:'',
    database:"employee",
    options:{
        trustedConnection:true,
    },
    // port:55245
    
});

db.connect(function(error){
// function createPool(db){
    if(error){
        console.log("Error connecting to db",error.stack);
        
    }
    else{
        console.log("DB Connection successful!")
    }
});

server.listen(8088,function check(error){
    if(error)console.log("Error!");
    else console.log("Server Started!");
});


server.post("/api/employee/create", (req, res) => {

    console.log("REq body",req.body)

    let details = {
        Name: req.body.Name,
        Code: req.body.Code,
        Department: req.body.Department,
        Residence: req.body.Residence,
        Distance: req.body.Distance,
      Private:{
        days: req.body.days,
        vehicleType:req.body.vehicleType,
        fuelType:req.body.fuelType,
        engineCapacity:req.body.engineCapacity,
        vehicleMake:req.body.vehicleMake,
        mileage: req.body.mileage
      },

      Public:{
        days: req.body.days,
        vehicleType:req.body.vehicleType,
        seatingCapacity:req.body.seatingCapacity,
        fuelType:req.body.fuelType
      },

      Shared:{
        seatingCapacity:req.body.seatingCapacity,
        days: req.body.days,
        vehicleType:req.body.vehicleType,
        fuelType:req.body.fuelType,
        engineCapacity:req.body.engineCapacity,
        vehicleMake:req.body.vehicleMake,
        mileage: req.body.mileage

      }
    };

    const jsondetails = JSON.stringify(req.body)
    console.log("JSON",jsondetails) 
    let sql = "INSERT INTO employee.jsontable SET ?";
    db.query(sql, [req.body] , (error) => {
      if (error) {
        console.error("Error",error.message)
        res.send({ status: false, message: "Employee creation Failed" });
      } else {
        res.send({ status: true, message: "Employee creation successfully" });
      }
    });
  });


  server.get("/", (req, res) => {
    var sql = "SELECT * FROM employee.jsontable";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB",error);
      } else {
        res.json({ status: true, data: result });
      }
    });
  });