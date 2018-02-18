$(document).ready(function() {

	var getRequest = function(searchTerm) {
	    var searchParams = {
	      
	      part: 'snippet',
	      key: 'AIzaSyD7beeskMiAH3aGuOyURD06SuubXkNHmx8',
	      maxResults: 10,
	      q: searchTerm,
	    };

	    url = 'https://www.googleapis.com/youtube/v3/search';

	    $.getJSON(url, searchParams, function(data) {

	      var resultsArray = data.items;
	      console.log(resultsArray);
	      showResults(resultsArray);
	    });
	  };

  	var showResults = function(results) {
    	var html = "";

    	var html = ""

    	$(".carousel-inner").empty()
    	$(".carousel-indicators").empty()
    	$(".carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="0" class="active"></li>')
	    $.each(results, function (key, item) {

	        console.log(key);
	        console.log(item);
	        var imgs = item.snippet.thumbnails.high.url;
	        var title = item.snippet.title;
	        var videoId = item.id.videoId;
	        var channelId = item.snippet.channelId;
	        var channelName = item.snippet.channelTitle;
	        var videoURL = "https://www.youtube.com/watch?v=" + videoId;
	        
	        // html = '<a href="https://www.youtube.com/watch?v=' + videoId + '" target="_blank"><img src="' + imgs + '" class= img-responsive></a>';
	        
	        html = '<a href="https://www.youtube.com/watch?v=' + videoId + '" target="_blank"><img src='+'"'+imgs+'"'+' class="d-block w-100 img-responsive"></a>';
	        var carouselIndicator = $("<li>");
	        var carouselInner = $("<div>")
	        if (key===0) {
		        carouselInner.attr({"class": "item active"})
		        carouselInner.append(html)
		    } else {
		    	carouselIndicator.attr({"data-target":"#myCarousel", "data-slide-to":key})
		        carouselInner.attr({"class": "item"})
		        carouselInner.append(html)
		    }
		    $(".carousel-indicators").append(carouselIndicator)
		    $(".carousel-inner").append(carouselInner)
	    });
	};

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

			getRequest(data["injury"])

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
	  		"status": "Pending",
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

	  	$.post("/addPatientCopy/submitPatient", newPatient, function(data){
	  		console.log("patient copy added successfully!")
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
		  		"status": $("#table-status").val(),
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

	$("#email").on("click", function(event) {
		$("#modal-title-change").html("Email")
		$("#modal-body-chart").hide()
		$("#modal-body-email").empty()
		$.get("/generateEmail", function(data) {
			for (var i = 0; i < data["operativePatient"].length; i++) {
				var div = $("<div>")
				div.append("<p><b>Status:</b> "+data["operativePatient"][i]["status"])
				div.append("<p><b>MRN:</b> "+data["operativePatient"][i]["MRN"])
				div.append("<p><b>Name:</b> "+data["operativePatient"][i]["patient_name"])
				div.append("<p><b>Injury: </b>"+data["operativePatient"][i]["injury"])
				div.append("<p><b>HPI: </b>"+data["operativePatient"][i]["HPI"])
				div.append("<p><b>Plan: </b>"+data["operativePatient"][i]["plan"])
				$("#modal-body-email").append(div);
				$("#modal-body-email").append("<br>");
			};
			for (var i = 0; i < data["pendingPatient"].length; i++) {
				var div = $("<div>")
				div.append("<p><b>Status:</b> "+data["pendingPatient"][i]["status"])
				div.append("<p><b>MRN:</b> "+data["pendingPatient"][i]["MRN"])
				div.append("<p><b>Name:</b> "+data["pendingPatient"][i]["patient_name"])
				div.append("<p><b>Injury:</b> "+data["pendingPatient"][i]["injury"])
				div.append("<p><b>HPI:</b> "+data["pendingPatient"][i]["HPI"])
				div.append("<p><b>Plan:</b> "+data["pendingPatient"][i]["plan"])
				$("#modal-body-email").append(div);
				$("#modal-body-email").append("<br>");
			};
			for (var i = 0; i < data["floorPatient"].length; i++) {
				var div = $("<div>")
				div.append("<p><b>Status:</b> "+data["floorPatient"][i]["status"])
				div.append("<p><b>MRN:</b> "+data["floorPatient"][i]["MRN"])
				div.append("<p><b>Name:</b> "+data["floorPatient"][i]["patient_name"])
				div.append("<p><b>Injury:</b> "+data["floorPatient"][i]["injury"])
				div.append("<p><b>HPI:</b> "+data["floorPatient"][i]["HPI"])
				div.append("<p><b>Plan:</b> "+data["floorPatient"][i]["plan"])
				$("#modal-body-email").append(div);
				$("#modal-body-email").append("<br>");
			};		
		});
	});

	$("#log").on("click", function(event) {
		$("#modal-title-change").html("Log")
		$("#modal-body-email").empty()
		$("#modal-body-chart").show()
	});

	$('#bs-example-modal2').on('shown.bs.modal', function (e) {
		
		var modal = $(this);
	    var canvas = modal.find('.modal-body canvas');

		var ctx = canvas[0].getContext("2d");
		// $.get("/getCount", function(data) {
		// 	console.log(data)
		// 	$.get("/getCount", function(data) {
		// 	data = data["total"]
		// 	var labelsArray = []
		// 	for (var i = 0; i<data.length; i++) {
		// 		console.log(i)
		// 		if (!(data[i]["createdAt"] in labelsArray)) {
		// 			console.log()
		// 			console.log(labelsArray)
		// 			labelsArray.push(data[i]["createdAt"])
		// 		};
		// 	};

			
		// 	console.log(labelsArray)
		// 	var dataObject = {}
		// 	for (var i = 0; i<data.length; i++) {
		// 		dataObject[data[i]["createdAt"]] = 0
		// 	}
		// 	for (var i = 0; i<data.length; i++) {
		// 		if (data[i]["createdAt"] in dataObject) {
		// 			dataObject[data[i]["createdAt"]] += 1
		// 		}
		// 	}

		// 	var finalDataArray = []

		// 	for (var i = 0; i < labelsArray.length; i++) {
		// 		finalDataArray.push(dataObject[labelsArray[i]])
		// 	}

		// 	console.log(finalDataArray)
		var chart = new Chart(ctx, {

			type: 'line',
		    data: {
		        labels: ["January", "February", "March", "April", "May", "June", "July"],
		        datasets: [{
		            label: "Consults",
		            backgroundColor: 'rgb(30,144,255)',
		            borderColor: 'rgb(30,144,255)',
		            data: [0, 10, 5, 2, 20, 30, 45],
		        }]
		    },

		});
	});
});