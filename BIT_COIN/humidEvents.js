	var humidDataEvent = HumidityStorageContract.at(HumidStorageContractAddress).HumidRecordData();
	var humidThresholdsEvent = HumidityStorageContract.at(HumidStorageContractAddress).HumidThresholds();
	
		// Start Event Listener for Humidity Data Event
		humidDataEvent.watch(function(error, result){
			console.log(" ");
			console.log("HumidityStorageContract Event Listener - Humidity Record Details...");
			var jsonString = JSON.stringify(result.args);
			console.log("Event Message from Blockchain HumidityStorageContract Contract ->  " + jsonString);
			console.log(" ");		
		});

		// Start Event Listener for Humidity Thresholds Set Event
		humidThresholdsEvent.watch(function(error, result){
			console.log(" ");
			console.log("HumidityStorageContract Event Listener -  Thresholds Set Details...");
			var jsonString = JSON.stringify(result.args);
			console.log("Event Message from Blockchain HumidityStorageContract Contract ->  " + jsonString);
			console.log(" ");		
		});