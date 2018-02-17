// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var patients = {
  // The variables cols and vals are arrays.
    addPatient: function(patientInfo, cb) {
      orm.addPatient("patients", patientInfo, function(res) {
        cb(res);
      });
    },

    getPlan: function(injury, cb) {
      orm.getPlan("scenarios", injury, function(res) {
        cb(res);
      });
    },

    getAllInjuries: function(cb) {
      orm.getAllInjuries("scenarios", function(res) {
        cb(res);
      });
    },

    viewPatients: function(cb) {
      orm.viewPatients("patients", function(res) {
        cb(res);
      });
    },

    viewOnePatient: function(PID, cb) {
      orm.viewOnePatient("patients", PID, function(res) {
        cb(res);
      });
    },

    updatePatient: function(patientInfo, cb) {
      orm.updatePatient("patients", patientInfo, function(res) {
        cb(res);
      });
    },

    updatePlan: function(updatedPlan, cb) {
      orm.updatePlan("patients", updatedPlan, function(res) {
        cb(res);
      })
    },

    deletePatient: function(PID, cb) {
      orm.deletePatient("patients", PID, function(res) {
        cb(res);
      });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = patients;