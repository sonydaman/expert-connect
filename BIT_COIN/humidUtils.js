
//                              IOT HUMIDITY STORAGE CONTRACT

// Create the contract source code
var HumidityStorageSource = "contract Sequence { uint public sequenceNo; function Sequence() { sequenceNo = 0; } function nextVal() returns (uint number) { return ++sequenceNo; } } contract HumidityStorage is Sequence{ address owner; struct HumidThreshold{ uint lowerTimes100; uint upperTimes100; } struct HumidRecord { address node; uint valueTimes100; string deviceID; uint timestamp; } HumidThreshold public threshold; mapping (uint => HumidRecord) public humidDataMap; event HumidRecordData(address nodeAddress, uint humidValueTimes100, string deviceID, uint timestamp); event HumidThresholds(address nodeAddress, uint thresholdLowerTimes100, uint thresholdUpperTimes100, uint timestamp); function HumidityStorage(){ owner = msg.sender; threshold.lowerTimes100 = 0; threshold.upperTimes100 = 0; } function setHumidRecord(uint humidValueTimes100, string deviceID) { uint recordCount = nextVal(); address node = msg.sender; uint timestamp = now; humidDataMap[recordCount].node = node; humidDataMap[recordCount].valueTimes100 = humidValueTimes100; humidDataMap[recordCount].deviceID = deviceID; humidDataMap[recordCount].timestamp = timestamp; HumidRecordData(humidDataMap[recordCount].node, humidDataMap[recordCount].valueTimes100, humidDataMap[recordCount].deviceID, humidDataMap[recordCount].timestamp); } function setHumidThresholds(uint lowerThresholdTimes100, uint upperThresholdTimes100) { address node = msg.sender; uint timestamp = now; if (node == owner){ threshold.lowerTimes100 = lowerThresholdTimes100; threshold.upperTimes100 = upperThresholdTimes100; HumidThresholds(node, threshold.lowerTimes100, threshold.upperTimes100, timestamp); } } function reset() { for (uint i = 1; i<=sequenceNo; i++){ delete humidDataMap[i]; } sequenceNo = 0; } }"

// Compile the source with solc - Solidity Compiler
var HumidityStorageCompiled = web3.eth.compile.solidity(HumidityStorageSource)

// Extracts info from contract, print json serialisation on console
HumidityStorageCompiled.HumidityStorage.info

// Create contract object
var HumidityStorageContract= web3.eth.contract(HumidityStorageCompiled.HumidityStorage.info.abiDefinition);


// --------------------------------------------------------------------------------------------
//	Mining will Happen for these functions -> Asynchronous Event Call Back 
// --------------------------------------------------------------------------------------------

function setHumidRecord(humidValue, deviceID){	

	var humidValueTimes100 = parseFloat(humidValue).toFixed(2)*100;

	var transHash = HumidityStorageContract.at(HumidStorageContractAddress).setHumidRecord.sendTransaction(humidValueTimes100, deviceID, {from: coinBaseAddress, data:HumidityStorageCompiled.HumidityStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}

function setHumidThresholds(lowerThreshold, upperThreshold){	
	lowerThreshold =  27;
	upperThreshold = 34;
	var lowerThresholdTimes100 = parseFloat(lowerThreshold).toFixed(2)*100;
	var upperThresholdTimes100 = parseFloat(upperThreshold).toFixed(2)*100;

	var transHash = HumidityStorageContract.at(HumidStorageContractAddress).setHumidThresholds.sendTransaction(lowerThresholdTimes100, upperThresholdTimes100, {from: coinBaseAddress, data:HumidityStorageCompiled.HumidityStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}

function resetHumid(){	

	var transHash = HumidityStorageContract.at(HumidStorageContractAddress).reset.sendTransaction({from: coinBaseAddress, data:HumidityStorageCompiled.HumidityStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}


// --------------------------------------------------------------------------------------------
//	No Mining will Happen for these functions -> Synchronous data return
// --------------------------------------------------------------------------------------------

function getHumidThresholdLower(){	

	return parseInt(HumidityStorageContract.at(HumidStorageContractAddress).threshold()[0])/100; 
}

function getHumidThresholdUpper(){	

	return parseInt(HumidityStorageContract.at(HumidStorageContractAddress).threshold()[1])/100; 
}

function getHumidHistRecordCount(){	

	return HumidityStorageContract.at(HumidStorageContractAddress).sequenceNo(); 
}


function getHumidRecordAt(position){	

	var jsonString = 
	'{"nodeAddress":"' + 
	HumidityStorageContract.at(HumidStorageContractAddress).humidDataMap(position)[0] + '", ' +
	'"humidValueTimes100":"' + 
	HumidityStorageContract.at(HumidStorageContractAddress).humidDataMap(position)[1] + '", '
	 +
	'"deviceID":"' + 
	HumidityStorageContract.at(HumidStorageContractAddress).humidDataMap(position)[2] + '", '
	 +
	'"timestamp":"' + 
	HumidityStorageContract.at(HumidStorageContractAddress).humidDataMap(position)[3] + '"} ' ;
	
	return jsonString; 
}

function printHumidRecordAt(position){
	var jsonString = getHumidRecordAt(position);
	var objResult = JSON.parse(jsonString);
	console.log ("Node Address -> " + objResult.nodeAddress);
	console.log ("Humidity Value Times 100 -> " + objResult.humidValueTimes100);
	console.log ("Device ID -> " + objResult.deviceID);
	console.log ("Timestamp -> " + objResult.timestamp);
}


function getHumidFlag(humidValue){			
	if (humidValue < getHumidThresholdLower()) {
		return("LOW");
	} 
	if (humidValue > getHumidThresholdUpper()) {
		return("HIGH");
	} 
	return("NORMAL");
}

function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}







