$(document).ready(function() {

	$("#add-patient").on("click", function(event) {
		$.get("/getAllInjuries", function(data) {
			console.log("Injuries retrieved successfully!")
		});
	});
	
	$('#add-initial-task').keypress(function(e) {
        if(e.which == 13) {
            var task = $('#add-initial-task').val();
			
			// Creating checkbox
			var tableRow = $("<tr>");
			var tdCheckBox = $("<td>");

			var label = $("<label>")
            label.attr({"class": "container-checkbox"}) 

            var checkBox = $("<input>");
			var checkBoxStatus = "not_checked";
			checkBox.attr({"type": "checkbox", "id": task, "checkbox_status": checkBoxStatus})

			var span = $("<span>")
			span.attr({"class": "checkmark"})

			label.append(checkBox);
			label.append(span);
			tdCheckBox.append(label)

			//This is for the actual task text.
			var tdTask = $("<td>")
			tdTask.append('<input type="text" class="form-control no-border" value="'+task+'">')
			
			var tdDelete = $("<td>")
			tdDelete.append('<button type="button" class="btn btn-default del-button-dimensions">Delete</button>')

			tableRow.append(tdCheckBox)
			tableRow.append(tdTask)
			tableRow.append(tdDelete)

			$("#patient-plan").append(tableRow);
			$('#add-initial-task').val("");
        };
    });

	$("#view-patients").on("click", function(event) {
		$.get("/viewPatients", function(data) {
			console.log("patients displayed successfully!")
		});
	});

	$(".patient-button").on("click", function(event) {
		console.log("You clicked on a patient!")
		console.log(event.target.id)
		// var PID = event.target.id.split("-")[1];
		var PID = event.target.id;
		console.log(PID)
		$.get("/viewPatients/"+PID, function(data) {
			console.log(data)
			data = data.patientInfo["0"];
			$("#table-name").val(data["patient_name"]);
			$("#table-MRN").val(data["MRN"]); 
			$("#table-injury").val(data["injury"]);
			$("#table-HPI").val(data["HPI"]);
			$("#table-plan").empty();

			var planObj = JSON.parse(data["plan"]);
			for (var action in planObj) {

				var tableRow = $("<tr>");
				var tdCheckBox = $("<td>");

				//Creating checkbox
	            var label = $("<label>")
	            label.attr({"class": "container-checkbox"}); 

				var checkBox = $("<input>");
				var checkBoxStatus = "";
				checkBox.attr({"type": "checkbox", "id": action+"-"+PID, "checkbox_status": checkBoxStatus, "PID": PID, "action": action});
				
				if (planObj[action] === "0") {
					checkBox.attr("checkbox_status", "not_checked");
					checkBox.prop("checked", false)
				} else if (planObj[action] === "1") {
					checkBox.attr("checkbox_status", "checked");
					checkBox.prop("checked", true); 
				};

				var span = $("<span>")
				span.attr({"class": "checkmark"})

				label.append(checkBox);
				label.append(span);
				tdCheckBox.append(label)

				var tdTask = $("<td>")
				tdTask.append('<input type="text" class="form-control no-border" value="'+action+'">')

				var tdDelete = $("<td>")
				tdDelete.append('<button type="button" class="btn btn-default del-button-dimensions" id='+action+"-"+PID+'>Delete</button>')
				
				tableRow.append(tdCheckBox)
				tableRow.append(tdTask)
				tableRow.append(tdDelete)

				$("#table-plan").append(tableRow);
			};
			
			var addTask = $("<input>")
			addTask.attr({"type": "text-field", "class": "form-control", "id": "add-update-task", "value": "", "PID": PID});
			$("#add-update-task-span").empty();
			$("#add-update-task-span").append("<br>Add task: <br>");
			$("#add-update-task-span").append(addTask);
		});
		var updateButton = $("<button>")
		updateButton.attr({"type": "button", "class": "btn btn-default update-patient-info", "id": "update_"+PID})
		updateButton.append("Update")

		var deleteButton = $("<button>")
		deleteButton.attr({"type": "button", "class": "btn btn-default delete-patient-info", "id": "delete_"+PID})
		deleteButton.append("Delete")

		$("#update-patient-button-div").empty();
		$("#update-patient-button-div").append(updateButton);	
		$("#update-patient-button-div").append(deleteButton);		
	});

	$("#table-plan").on("click", function(event) {
		var actionID = event.target.id;
		if ($("[id='"+actionID+"']").attr("checkbox_status") === "not_checked") {
			$("[id='"+actionID+"']").attr("checkbox_status", "checked")
		} else if ($("[id='"+actionID+"']").attr("checkbox_status") === "checked") {
			$(("[id='"+actionID+"']")).attr("checkbox_status", "not_checked")
		}
	});

	$('#add-update-task-span').keypress(function(e) {
        if(e.which == 13) {
        	var PID = $('#add-update-task').attr("PID")
            var task = $('#add-update-task').val();
            
            var tableRow = $("<tr>")

            var tdCheckBox = $("<td>")
            var label = $("<label>")
            label.attr({"class": "container-checkbox"}) 
            var checkBox = $("<input>");

			var checkBoxStatus = "not_checked";
			checkBox.attr({"type": "checkbox", "id": task+"-"+PID, "checkbox_status": checkBoxStatus, "PID": PID, "action": task})

			var span = $("<span>")
			span.attr({"class": "checkmark"})

			label.append(checkBox);
			label.append(span);
			tdCheckBox.append(label)

            var tdTask = $("<td>")
			tdTask.append('<input type="text" class="form-control no-border" value="'+task+'">')

			var tdDelete = $("<td>")
			tdDelete.append('<button type="button" class="btn btn-default del-button-dimensions id='+task+"-"+PID+'>Delete</button>')
			
			tableRow.append(tdCheckBox)
			tableRow.append(tdTask)
			tableRow.append(tdDelete)
			
			$("#table-plan").append(tableRow);
        };
    });

    $("#table-plan").on("click", function(event) {
		console.log(event)
	});

	$('#injury-type').change(function(event) {
	    var injury = event.target.value;
	    console.log(injury)
	    $.get("/getPlan/"+injury, function(data) {
			var taskArray = data["plan"]["0"]["plan"].split(" || ");
			for (var i = 0; i < taskArray.length; i++) {

				var tableRow = $("<tr>")

				var tdCheckBox = $("<td>")
				var label = $("<label>")
	            label.attr({"class": "container-checkbox"}) 
	            var checkBox = $("<input>");

				var checkBoxStatus = "not_checked";
				checkBox.attr({"type": "checkbox", "id": taskArray[i], "checkbox_status": checkBoxStatus})
				var span = $("<span>")
				span.attr({"class": "checkmark"})

				label.append(checkBox);
				label.append(span);
				tdCheckBox.append(label)

	       		var tdTask = $("<td>")
				tdTask.append('<input type="text" class="form-control no-border" value="'+taskArray[i]+'">')

				var tdDelete = $("<td>")
				tdDelete.append('<button type="button" class="btn btn-default del-button-dimensions">Delete</button>')
				
				tableRow.append(tdCheckBox)
				tableRow.append(tdTask)
				tableRow.append(tdDelete)

				$("#patient-plan").append(tableRow);
			};
		});
	});

	$("#patient-plan").on("click", function(event) {
		var actionID = event.target.id;
		if ($("[id='"+actionID+"']").attr("checkbox_status") === "not_checked") {
			$("[id='"+actionID+"']").attr("checkbox_status", "checked")
		} else if ($("[id='"+actionID+"']").attr("checkbox_status") === "checked") {
			$(("[id='"+actionID+"']")).attr("checkbox_status", "not_checked")
		}
	});

	$("#submit-patient").on("click", function(event) {				
	  	
		var planObj = {};
		$("#patient-plan input").each(function() {
   			var action = $(this).attr("id");
   			console.log(action)
   			if ($(this).attr("checkbox_status") === "checked") {
	   			planObj[action] = "1";
	   		} else if ($(this).attr("checkbox_status") === "not_checked") {
	   			planObj[action] = "0";
	   		};
		});

		console.log(planObj)

	  	var newPatient = {
	  		"patient_name": $("#patient-name").val(),
	  		"MRN": $("#patient-MRN").val(),
	  		"injury": $("#injury-type").val(),
	  		"HPI": $("#patient-HPI").val(),
	  		"plan": JSON.stringify(planObj)
	  	};

	  	$.post("/addPatient/submitPatient", newPatient, function(data){
	  		console.log("patient added successfully!")
	  		$("#patient-name").val(""),
	  		$("#patient-MRN").val(""),
	  		$("#injury-type").val(""),
	  		$("#patient-HPI").val(""),
	  		$("#add-update-task").val("")
	  		$("#patient-plan").empty()	
	  	});
	});

	$("#update-patient-button-div").on("click", function(event) {
		
		var selectedButtonType = event.target.id.split("_")[0];
		var PID = event.target.id.split("_")[1];
		
		var updatedPlan = {};
		$("#table-plan input").each(function() {
   			var action = $(this).attr("action");
   			if ($(this).attr("checkbox_status") === "checked") {
	   			updatedPlan[action] = "1";
	   		} else if ($(this).attr("checkbox_status") === "not_checked") {
	   			updatedPlan[action] = "0";
	   		};
		});

		if (selectedButtonType === "update") {
			var updatePatient = {
				"id": PID,
		  		"patient_name": $("#table-name").val(),
		  		"MRN": $("#table-MRN").val(),
		  		"HPI": $("#table-HPI").val(),
		  		"plan": JSON.stringify(updatedPlan)
		  	};

		  	$.post("/viewPatients/updatePatient", updatePatient, function(data) {
		  		$("#add-update-task").val("");
		  		console.log("Patient updated successfully!")
		  	});
		};

		if (selectedButtonType === "delete") {

		  	$.post("/viewPatients/deletePatient", {"id": PID}, function(data) {
		  		console.log("Patient deleted successfully!")
		  	});
		  	$("#"+PID).remove()
		};		
	});
});