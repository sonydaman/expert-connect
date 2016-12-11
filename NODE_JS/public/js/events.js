
// node1
	var tempDataEvent = null;
	var tempthresholdsEvent = null;
	var humidDataEvent = null;
	var humidThresholdsEvent = null;	
	var lumenDataEvent = null;
	var lumenThresholdsEvent = null;

	web3.eth.filter('latest').watch(function(){ 
		displayNotofication();
		displayBCV();
	});
	

function displayNotofication() {
	var tempDataEvent = TemparatureStorageContract.at(TempStorageContractAddress).TempRecordData();
	var tempthresholdsEvent = TemparatureStorageContract.at(TempStorageContractAddress).TempThresholds();
	var humidDataEvent = HumidityStorageContract.at(HumidStorageContractAddress).HumidRecordData();
	var humidThresholdsEvent = HumidityStorageContract.at(HumidStorageContractAddress).HumidThresholds();
	var lumenDataEvent = LumenStorageContract.at(LumenStorageContractAddress).LumenRecordData();
	var lumenThresholdsEvent = LumenStorageContract.at(LumenStorageContractAddress).LumenThresholds();
		
	// Start Event Listener for Temperature Data Event
		tempDataEvent.watch(function(error, result){
			var jsonString = JSON.stringify(result.args);
			displayTV(jsonString);
			tempDataEvent.stopWatching();
			tempthresholdsEvent.stopWatching();
			humidDataEvent.stopWatching();
			humidThresholdsEvent.stopWatching();
			lumenDataEvent.stopWatching();
			lumenThresholdsEvent.stopWatching();
		});

	// Start Event Listener for Temperature Thresholds Set Event
		tempthresholdsEvent.watch(function(error, result){
			var jsonString = JSON.stringify(result.args);
			displayTT(jsonString);
			tempDataEvent.stopWatching();
			tempthresholdsEvent.stopWatching();
			humidDataEvent.stopWatching();
			humidThresholdsEvent.stopWatching();
			lumenDataEvent.stopWatching();
			lumenThresholdsEvent.stopWatching();
		});
	
	// Start Event Listener for Humidity Data Event
		humidDataEvent.watch(function(error, result){
			var jsonString = JSON.stringify(result.args);
			displayHV(jsonString);
			tempDataEvent.stopWatching();
			tempthresholdsEvent.stopWatching();
			humidDataEvent.stopWatching();
			humidThresholdsEvent.stopWatching();
			lumenDataEvent.stopWatching();
			lumenThresholdsEvent.stopWatching();
		});

	// Start Event Listener for Humidity Thresholds Set Event
		humidThresholdsEvent.watch(function(error, result){
			var jsonString = JSON.stringify(result.args);
			displayHT(jsonString);
			tempDataEvent.stopWatching();
			tempthresholdsEvent.stopWatching();
			humidDataEvent.stopWatching();
			humidThresholdsEvent.stopWatching();
			lumenDataEvent.stopWatching();
			lumenThresholdsEvent.stopWatching();
		});
		
		// Start Event Listener for Lumen Data Event
		lumenDataEvent.watch(function(error, result){
			var jsonString = JSON.stringify(result.args);
			displayLV(jsonString);
			tempDataEvent.stopWatching();
			tempthresholdsEvent.stopWatching();
			humidDataEvent.stopWatching();
			humidThresholdsEvent.stopWatching();
			lumenDataEvent.stopWatching();
			lumenThresholdsEvent.stopWatching();	
		});

		// Start Event Listener for Lumen Thresholds Set Event
		lumenThresholdsEvent.watch(function(error, result){
			var jsonString = JSON.stringify(result.args);
			displayLT(jsonString);
			tempDataEvent.stopWatching();
			tempthresholdsEvent.stopWatching();
			humidDataEvent.stopWatching();
			humidThresholdsEvent.stopWatching();
			lumenDataEvent.stopWatching();
			lumenThresholdsEvent.stopWatching();	
		});

}









