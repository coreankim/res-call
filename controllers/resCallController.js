var express = require("express");
var moment = require("moment")
var router = express.Router();
var resCallDB = require("../models/patients.js");

router.get("/", function(req, res) {
   res.render("addPatient");
});

router.get("/addPatient", function(req, res) {
  resCallDB.getAllInjuries(function(injuryInfo) {
    resCallDB.viewPatients(function(data) {

    var pendingPatients = []
    var operativePatients = []
    var floorPatients = []
    var seenPatients = []

    for (var i = 0; i < data.length; i++) {
      var utcString = String(data[i]["createdAt"])
      data[i]["createdAt"] = moment(utcString).format('LT')
    }
    
    for (var i = 0; i < data.length; i++) {
      if (data[i]["status"] === "Pending") {
        pendingPatients.push(data[i]) 
      }
      if (data[i]["status"] === "Operative") {
        operativePatients.push(data[i]) 
      }
      if (data[i]["status"] === "Floor") {
        floorPatients.push(data[i]) 
      }
      if (data[i]["status"] === "Seen") {
        seenPatients.push(data[i])
      }
    }
    patients = operativePatients.concat(pendingPatients, seenPatients, floorPatients)

      var allInjuries = {
        injury: injuryInfo,
        patient: patients
      }
      console.log(allInjuries)
      res.render("addPatient", allInjuries);
    })
  });
});

router.get("/getPlan/:injury", function(req, res) {
   resCallDB.getPlan(req.params.injury, function(data) {

    var plan = {
      plan: data
    }

    res.send(plan);
   });
});

router.get("/viewPatients", function(req, res) {    
  resCallDB.viewPatients(function(data) {

    var pendingPatients = []
    var operativePatients = []
    var floorPatients = []
    var seenPatients = []

    for (var i = 0; i < data.length; i++) {
      var utcString = String(data[i]["createdAt"])
      data[i]["createdAt"] = moment(utcString).format('LT')
    }
    
    for (var i = 0; i < data.length; i++) {
      if (data[i]["status"] === "Pending") {
        pendingPatients.push(data[i]) 
      }
      if (data[i]["status"] === "Operative") {
        operativePatients.push(data[i]) 
      }
      if (data[i]["status"] === "Floor") {
        floorPatients.push(data[i]) 
      }
      if (data[i]["status"] === "Seen") {
        seenPatients.push(data[i])
      }
    }
    pendingPatients = pendingPatients.concat(seenPatients)

    var patientList = {
      pendingPatient: pendingPatients,
      operativePatient: operativePatients,
      floorPatient: floorPatients
    }

    res.render("viewPatients", patientList);
  });
});

router.get("/viewPatients/:MRN", function(req, res) {    

  resCallDB.viewOnePatient(req.params.MRN, function(data) {

    var patientInfo = {
      patientInfo: data
    }

    res.send(patientInfo);
  });
});

router.post("/addPatient/submitPatient", function(req, res) {
  
  resCallDB.addPatient(req.body, function() {
    res.redirect("/");
  });
});

router.post("/viewPatients/updatePatient", function(req, res) {

  resCallDB.updatePatient(req.body, function() {
    res.redirect("/");
  });
});

router.post("/updatePlan", function(req, res) {

  resCallDB.updatePlan(req.body, function() {
    res.redirect("/");
  });
});

router.post("/viewPatients/deletePatient", function(req, res) {
  
  resCallDB.deletePatient(req.body, function() {
    res.redirect("/");
  });
});


module.exports = router;
