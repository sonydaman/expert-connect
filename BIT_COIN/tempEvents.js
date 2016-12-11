	var tempDataEvent = TemparatureStorageContract.at(TempStorageContractAddress).TempRecordData();
	var tempThresholdsEvent = TemparatureStorageContract.at(TempStorageContractAddress).TempThresholds();
	
		// Start Event Listener for Temperature Data Event
		tempDataEvent.watch(function(error, result){
			console.log(" ");
			console.log("TempStorageContract Event Listener - Temperature Record Details...");
			var jsonString = JSON.stringify(result.args);
			console.log("Event Message from Blockchain TempStorageContract Contract ->  " + jsonString);
			console.log(" ");		
		});

		// Start Event Listener for Temperature Thresholds Set Event
		tempThresholdsEvent.watch(function(error, result){
			console.log(" ");
			console.log("TempStorageContract Event Listener -  Thresholds Set Details...");
			var jsonString = JSON.stringify(result.args);
			console.log("Event Message from Blockchain TempStorageContract Contract ->  " + jsonString);
			console.log(" ");		
		});