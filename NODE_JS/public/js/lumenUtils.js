
//                              IOT HUMIDITY STORAGE CONTRACT

// Create the contract source code
var LumenStorageSource = "contract Sequence { uint public sequenceNo; function Sequence() { sequenceNo = 0; } function nextVal() returns (uint number) { return ++sequenceNo; } } contract LumenStorage is Sequence{ address owner; struct LumenThreshold{ uint lowerTimes100; uint upperTimes100; } struct LumenRecord { address node; uint valueTimes100; string deviceID; uint timestamp; } LumenThreshold public threshold; mapping (uint => LumenRecord) public lumenDataMap; event LumenRecordData(address nodeAddress, uint lumenValueTimes100, string deviceID, uint timestamp); event LumenThresholds(address nodeAddress, uint thresholdLowerTimes100, uint thresholdUpperTimes100, uint timestamp); function LumenStorage(){ owner = msg.sender; threshold.lowerTimes100 = 0; threshold.upperTimes100 = 0; } function setLumenRecord(uint lumenValueTimes100, string deviceID) { uint recordCount = nextVal(); address node = msg.sender; uint timestamp = now; lumenDataMap[recordCount].node = node; lumenDataMap[recordCount].valueTimes100 = lumenValueTimes100; lumenDataMap[recordCount].deviceID = deviceID; lumenDataMap[recordCount].timestamp = timestamp; LumenRecordData(lumenDataMap[recordCount].node, lumenDataMap[recordCount].valueTimes100, lumenDataMap[recordCount].deviceID, lumenDataMap[recordCount].timestamp); } function setLumenThresholds(uint lowerThresholdTimes100, uint upperThresholdTimes100) { address node = msg.sender; uint timestamp = now; if (node == owner){ threshold.lowerTimes100 = lowerThresholdTimes100; threshold.upperTimes100 = upperThresholdTimes100; LumenThresholds(node, threshold.lowerTimes100, threshold.upperTimes100, timestamp); } } function reset() { for (uint i = 1; i<=sequenceNo; i++){ delete lumenDataMap[i]; } sequenceNo = 0; } }"

// Compile the source with solc - Solidity Compiler
var LumenStorageCompiled = web3.eth.compile.solidity(LumenStorageSource)

// Extracts info from contract, print json serialisation on console
LumenStorageCompiled.LumenStorage.info

// Create contract object
var LumenStorageContract= web3.eth.contract(LumenStorageCompiled.LumenStorage.info.abiDefinition);


// --------------------------------------------------------------------------------------------
//	Mining will Happen for these functions -> Asynchronous Event Call Back 
// --------------------------------------------------------------------------------------------

function setLumenRecord(lumenValue, deviceID){	

	var lumenValueTimes100 = parseFloat(lumenValue).toFixed(2)*100;

	var transHash = LumenStorageContract.at(LumenStorageContractAddress).setLumenRecord.sendTransaction(lumenValueTimes100, deviceID, {from: coinBaseAddress, data:LumenStorageCompiled.LumenStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}

function setLumenThresholds(lowerThreshold, upperThreshold){	
	lowerThreshold = 200;
	upperThreshold = 600;
	var lowerThresholdTimes100 = parseFloat(lowerThreshold).toFixed(2)*100;
	var upperThresholdTimes100 = parseFloat(upperThreshold).toFixed(2)*100;

	var transHash = LumenStorageContract.at(LumenStorageContractAddress).setLumenThresholds.sendTransaction(lowerThresholdTimes100, upperThresholdTimes100, {from: coinBaseAddress, data:LumenStorageCompiled.LumenStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}

function resetLumen(){	

	var transHash = LumenStorageContract.at(LumenStorageContractAddress).reset.sendTransaction({from: coinBaseAddress, data:LumenStorageCompiled.LumenStorage.code, gas: 10000000});
	
	console.log("transHash: " + transHash); 
	return transHash; 
}


// --------------------------------------------------------------------------------------------
//	No Mining will Happen for these functions -> Synchronous data return
// --------------------------------------------------------------------------------------------

function getLumenThresholdLower(){	

	return parseInt(LumenStorageContract.at(LumenStorageContractAddress).threshold()[0])/100; 
}

function getLumenThresholdUpper(){	

	return parseInt(LumenStorageContract.at(LumenStorageContractAddress).threshold()[1])/100; 
}

function getLumenHistRecordCount(){	

	return LumenStorageContract.at(LumenStorageContractAddress).sequenceNo(); 
}


function getLumenRecordAt(position){	

	var jsonString = 
	'{"nodeAddress":"' + 
	LumenStorageContract.at(LumenStorageContractAddress).lumenDataMap(position)[0] + '", ' +
	'"lumenValueTimes100":"' + 
	LumenStorageContract.at(LumenStorageContractAddress).lumenDataMap(position)[1] + '", '
	 +
	'"deviceID":"' + 
	LumenStorageContract.at(LumenStorageContractAddress).lumenDataMap(position)[2] + '", '
	 +
	'"timestamp":"' + 
	LumenStorageContract.at(LumenStorageContractAddress).lumenDataMap(position)[3] + '"} ' ;
	
	return jsonString; 
}

function printLumenRecordAt(position){
	var jsonString = getLumenRecordAt(position);
	var objResult = JSON.parse(jsonString);
	console.log ("Node Address -> " + objResult.nodeAddress);
	console.log ("Lumen Value Times 100 -> " + objResult.lumenValueTimes100);
	console.log ("Device ID -> " + objResult.deviceID);
	console.log ("Timestamp -> " + objResult.timestamp);
}


function getLumenFlag(lumenValue){			
	if (lumenValue < getLumenThresholdLower()) {
		return("LOW");
	} 
	if (lumenValue > getLumenThresholdUpper()) {
		return("HIGH");
	} 
	return("NORMAL");
}

function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}







