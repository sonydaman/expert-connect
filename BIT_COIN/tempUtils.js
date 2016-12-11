
//                              IOT TEMPERATURE STORAGE CONTRACT

// Create the contract source code
var TemparatureStorageSource = "contract Sequence { uint public sequenceNo; function Sequence() { sequenceNo = 0; } function nextVal() returns (uint number) { return ++sequenceNo; } } contract TemparatureStorage is Sequence{ address owner; struct TempThreshold{ uint lowerTimes100; uint upperTimes100; } struct TempRecord { address node; uint valueTimes100; string deviceID; uint timestamp; } TempThreshold public threshold; mapping (uint => TempRecord) public tempDataMap; event TempRecordData(address nodeAddress, uint tempValueTimes100, string deviceID, uint timestamp); event TempThresholds(address nodeAddress, uint thresholdLowerTimes100, uint thresholdUpperTimes100, uint timestamp); function TemparatureStorage(){ owner = msg.sender; threshold.lowerTimes100 = 0; threshold.upperTimes100 = 0; } function setTempRecord(uint tempValueTimes100, string deviceID) { uint recordCount = nextVal(); address node = msg.sender; uint timestamp = now; tempDataMap[recordCount].node = node; tempDataMap[recordCount].valueTimes100 = tempValueTimes100; tempDataMap[recordCount].deviceID = deviceID; tempDataMap[recordCount].timestamp = timestamp; TempRecordData(tempDataMap[recordCount].node, tempDataMap[recordCount].valueTimes100, tempDataMap[recordCount].deviceID, tempDataMap[recordCount].timestamp); } function setTempThresholds(uint lowerThresholdTimes100, uint upperThresholdTimes100) { address node = msg.sender; uint timestamp = now; if (node == owner){ threshold.lowerTimes100 = lowerThresholdTimes100; threshold.upperTimes100 = upperThresholdTimes100; TempThresholds(node, threshold.lowerTimes100, threshold.upperTimes100, timestamp); } } function reset() { for (uint i = 1; i<=sequenceNo; i++){ delete tempDataMap[i]; } sequenceNo = 0; } }"

// Compile the source with solc - Solidity Compiler
var TemparatureStorageCompiled = web3.eth.compile.solidity(TemparatureStorageSource)

// Extracts info from contract, print json serialisation on console
TemparatureStorageCompiled.TemparatureStorage.info

// Create contract object
var TemparatureStorageContract= web3.eth.contract(TemparatureStorageCompiled.TemparatureStorage.info.abiDefinition);

// --------------------------------------------------------------------------------------------
//	Mining will Happen for these functions -> Asynchronous Event Call Back 
// --------------------------------------------------------------------------------------------

function setTempRecord(tempValue, deviceID){	

	var tempValueTimes100 = parseFloat(tempValue).toFixed(2)*100;

	var transHash = TemparatureStorageContract.at(TempStorageContractAddress).setTempRecord.sendTransaction(tempValueTimes100, deviceID, {from: coinBaseAddress, data:TemparatureStorageCompiled.TemparatureStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}

function setTempThresholds(lowerThreshold, upperThreshold){	

	var lowerThresholdTimes100 = parseFloat(lowerThreshold).toFixed(2)*100;
	var upperThresholdTimes100 = parseFloat(upperThreshold).toFixed(2)*100;

	var transHash = TemparatureStorageContract.at(TempStorageContractAddress).setTempThresholds.sendTransaction(lowerThresholdTimes100, upperThresholdTimes100, {from: coinBaseAddress, data:TemparatureStorageCompiled.TemparatureStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}

function resetTemp(){	

	var transHash = TemparatureStorageContract.at(TempStorageContractAddress).reset.sendTransaction({from: coinBaseAddress, data:TemparatureStorageCompiled.TemparatureStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}


// --------------------------------------------------------------------------------------------
//	No Mining will Happen for these functions -> Synchronous data return
// --------------------------------------------------------------------------------------------

function getTempThresholdLower(){	

	return parseInt(TemparatureStorageContract.at(TempStorageContractAddress).threshold()[0])/100; 
}

function getTempThresholdUpper(){	

	return parseInt(TemparatureStorageContract.at(TempStorageContractAddress).threshold()[1])/100; 
}

function getTempHistRecordCount(){	

	return TemparatureStorageContract.at(TempStorageContractAddress).sequenceNo(); 
}


function getTempRecordAt(position){	

	var jsonString = 
	'{"nodeAddress":"' + 
	TemparatureStorageContract.at(TempStorageContractAddress).tempDataMap(position)[0] + '", ' +
	'"tempValueTimes100":"' + 
	TemparatureStorageContract.at(TempStorageContractAddress).tempDataMap(position)[1] + '", '
	 +
	'"deviceID":"' + 
	TemparatureStorageContract.at(TempStorageContractAddress).tempDataMap(position)[2] + '", '
	 +
	'"timestamp":"' + 
	TemparatureStorageContract.at(TempStorageContractAddress).tempDataMap(position)[3] + '"} ' ;
	
	return jsonString; 
}

function printTempRecordAt(position){
	var jsonString = getTempRecordAt(position);
	var objResult = JSON.parse(jsonString);
	console.log ("Node Address -> " + objResult.nodeAddress);
	console.log ("Temperature Value Times 100 -> " + objResult.tempValueTimes100);
	console.log ("Device ID -> " + objResult.deviceID);
	console.log ("Timestamp -> " + objResult.timestamp);
}


function getTempFlag(tempValue){			
	if (tempValue < getTempThresholdLower()) {
		return("LOW");
	} 
	if (tempValue > getTempThresholdUpper()) {
		return("HIGH");
	} 
	return("NORMAL");
}

function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}







