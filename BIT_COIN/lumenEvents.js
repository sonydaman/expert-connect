	var lumenDataEvent = LumenStorageContract.at(LumenStorageContractAddress).LumenRecordData();
	var lumenThresholdsEvent = LumenStorageContract.at(LumenStorageContractAddress).LumenThresholds();
	
		// Start Event Listener for Lumen Data Event
		lumenDataEvent.watch(function(error, result){
			console.log(" ");
			console.log("LumenStorageContract Event Listener - Lumen Record Details...");
			var jsonString = JSON.stringify(result.args);
			console.log("Event Message from Blockchain LumenStorageContract Contract ->  " + jsonString);
			console.log(" ");		
		});

		// Start Event Listener for Lumen Thresholds Set Event
		lumenThresholdsEvent.watch(function(error, result){
			console.log(" ");
			console.log("LumenStorageContract Event Listener -  Thresholds Set Details...");
			var jsonString = JSON.stringify(result.args);
			console.log("Event Message from Blockchain LumenStorageContract Contract ->  " + jsonString);
			console.log(" ");		
		});