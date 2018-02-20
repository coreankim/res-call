var express = require("express");
var moment = require("moment")
var router = express.Router();
var resCallDB = require("../models/patients.js");

router.get("/", function(req, res) {
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
      res.render("addPatient", allInjuries);
    })
  });
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

router.get("/getCount", function(req, res) {
   resCallDB.getCount(function(data) {
    for (var i = 0; i < data.length; i++) {
      var utcString = String(data[i]["createdAt"])
      data[i]["createdAt"] = moment(utcString).format("MMM Do YY")
    }

    var total = {
      total: data
    }

    res.send(total);
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

router.get("/generateEmail", function(req, res) {    
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
    res.send(patientList);
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

router.post("/addPatientCopy/submitPatient", function(req, res) {
  
  resCallDB.addPatientCopy(req.body, function() {
    res.redirect("/");
    console.log("Copy made it to controller!")
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
