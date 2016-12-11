
   var navPage;
  
  function submitToChainTR(){  
  	navPage ="TR";
	var lower = document.getElementById("tempLower").value;
 	var upper = document.getElementById("tempUpper").value;
	var transHash = setTempThresholds(lower, upper);
  }
  
    function submitToChainHR(){  
    navPage ="HR";
	var lower = document.getElementById("humidLower").value;;
 	var upper = document.getElementById("humidUpper").value;;
	var transHash = setHumidThresholds(lower, upper);
  }
  
   function submitToChainLR(){  
    navPage ="LR";
	var lower = document.getElementById("lumenLower").value;
 	var upper = document.getElementById("lumenUpper").value;
	var transHash = setLumenThresholds(lower, upper);
  }
  
   
   
  function displayTT(jsonString){
	var jsonObject = JSON.parse(jsonString);
	var text = "New threshold values for Temparature saved in Blockchain";
	document.getElementById("modaltextTR").innerHTML = text;
	var ele = document.getElementById('notifyTR');
	if(typeof ele.click == 'function') {
	  ele.click()
	} else if(typeof ele.onclick == 'function') {
	  ele.onclick()		
	}
  }
   
  function displayHT(jsonString){
	var jsonObject = JSON.parse(jsonString);
	var text = "New threshold values for Humidity saved in Blockchain";
	document.getElementById("modaltextHR").innerHTML = text;
	var ele = document.getElementById('notifyHR');
	if(typeof ele.click == 'function') {
	  ele.click()
	} else if(typeof ele.onclick == 'function') {
	  ele.onclick()		
	}
  }
  
  function displayLT(jsonString){
	var jsonObject = JSON.parse(jsonString);
	var text = "New threshold values for Luminance saved in Blockchain";
	document.getElementById("modaltextLR").innerHTML = text;
	var ele = document.getElementById('notifyLR');
	if(typeof ele.click == 'function') {
	  ele.click()
	} else if(typeof ele.onclick == 'function') {
	  ele.onclick()		
	}
  }
  
   function displayTV(jsonString){
	var jsonObject = JSON.parse(jsonString);
	document.getElementById("tempNodeID").value = jsonObject.nodeAddress;
	document.getElementById("tempDeviceID").value = jsonObject.deviceID;
	document.getElementById("tempValue").value = jsonObject.tempValueTimes100/100;
	
	var tstamp = jsonObject.timestamp;
	
	var date = new Date(parseInt(tstamp)* 1000);	
	document.getElementById("tempTimestamp").value = date;
	
	var tempFlag = getTempFlag(jsonObject.tempValueTimes100/100);
	
	var text = "";	
	if(strcmp(tempFlag, "NORMAL") == 0){
	 	text = '<div  class="firstcolmargin"><label class="labelcss" >Temperature Status : <font color="red"><b>Within Threshold</b></font></label></div>';
	} else if(strcmp(tempFlag, "LOW") == 0){
		text = '<div class="firstcolmargin"><label class="labelcss" >Temperature Status :  <font color="red"><b>Below Threshold</b> </font> </label><img src="img/bulb_glow.jpg" width="140" height="125"></div>';
	} else if(strcmp(tempFlag, "HIGH") == 0){
		text = '<div class="firstcolmargin"><label class="labelcss" >Temperature Status :  <font color="red"><b>Above Threshold</b></font></label><img src="img/bulb_glow.jpg" width="140" height="125"></div>';
		text = '<div class="firstcolmargin"><label class="labelcss" >Temperature Status :  <font color="red"><b>Above Threshold</b></font></label><img src="img/bulb_glow.jpg" width="140" height="125"></div>';
	} else {}
	
	document.getElementById("tempGlow").innerHTML = text;			
  }
  
   function displayHV(jsonString){
	var jsonObject = JSON.parse(jsonString);
	document.getElementById("humidNodeID").value = jsonObject.nodeAddress;
	document.getElementById("humidDeviceID").value = jsonObject.deviceID;
	document.getElementById("humidValue").value = jsonObject.humidValueTimes100/100;
	
	var tstamp = jsonObject.timestamp;
	
	var date = new Date(parseInt(tstamp)* 1000);	
	document.getElementById("humidTimestamp").value = date;
	
	var humidFlag = getHumidFlag(jsonObject.humidValueTimes100/100);
	
	var text = "";	
	if(strcmp(humidFlag, "NORMAL") == 0){
	 	text = '<div  class="firstcolmargin"><label class="labelcss" >Humidity Status : <font color="red"><b>Within Threshold</b></font></label></div>';
	} else if(strcmp(humidFlag, "LOW") == 0){
		text = '<div class="firstcolmargin"><label class="labelcss" >Humidity Status :  <font color="red"><b>Below Threshold</b> </font> </label><img src="img/bulb_glow.jpg" width="140" height="125"></div>';
	} else if(strcmp(humidFlag, "HIGH") == 0){
		text = '<div class="firstcolmargin"><label class="labelcss" >Humidity Status :  <font color="red"><b>Above Threshold</b></font></label><img src="img/bulb_glow.jpg" width="140" height="125"></div>';
	} else {}
	
	document.getElementById("humidGlow").innerHTML = text;			
  }
  
  
   function displayLV(jsonString){
	var jsonObject = JSON.parse(jsonString);
	document.getElementById("lumenNodeID").value = jsonObject.nodeAddress;
	document.getElementById("lumenDeviceID").value = jsonObject.deviceID;
	document.getElementById("lumenValue").value = jsonObject.lumenValueTimes100/100;
	
	var tstamp = jsonObject.timestamp;
	
	var date = new Date(parseInt(tstamp)* 1000);	
	document.getElementById("lumenTimestamp").value = date;
	
	var lumenFlag = getLumenFlag(jsonObject.lumenValueTimes100/100);
	
	var text = "";	
	if(strcmp(lumenFlag, "NORMAL") == 0){
	 	text = '<div  class="firstcolmargin"><label class="labelcss" >Luminance Status : <font color="red"><b>Within Threshold</b></font></label></div>';
	} else if(strcmp(lumenFlag, "LOW") == 0){
		text = '<div class="firstcolmargin"><label class="labelcss" >Luminance Status :  <font color="red"><b>Below Threshold</b> </font> </label><img src="img/bulb_glow.jpg" width="140" height="125"></div>';
	} else if(strcmp(lumenFlag, "HIGH") == 0){
		text = '<div class="firstcolmargin"><label class="labelcss" >Luminance Status :  <font color="red"><b>Above Threshold</b></font></label><img src="img/bulb_glow.jpg" width="140" height="125"></div>';
	} else {}
	
	document.getElementById("lumenGlow").innerHTML = text;			
  }
    	
	function displayBCVdetails(blockNum){
	  document.getElementById("blockDetails").style.visibility = "visible";		
	  var block = web3.eth.getBlock(blockNum);
	  document.getElementById('title').innerHTML = '<h4>Block# ' + blockNum + '</h4>';
	  document.getElementById('hash').innerText = block.hash;
	  document.getElementById('difficulty').innerText = block.difficulty;
	  document.getElementById('miner').innerText = block.miner;
	  document.getElementById('gasLimit').innerText = block.gasLimit;
	  document.getElementById('gasUsed').innerText = block.gasUsed;
	  document.getElementById('timestamp').innerText = block.timestamp;
	  document.getElementById('size').innerText = block.size;
	  document.getElementById('extraData').innerText = block.extraData;
	  document.getElementById('stateRoot').innerText = block.stateRoot;
	  document.getElementById('nonce').innerText = block.nonce;
	  var table_src;
	  if(block.transactions.length>0)
	  {
		table_src = '<table class="table table-condensed"> <thead><tr><th>Hash</th><th>From</th><th>To</th><th>Amount</th></tr></thead>'
		for(var i=0; i<block.transactions.length; i++)
		{
			table_src += '<tr>';
			var txn = web3.eth.getTransaction(block.transactions[i]);
			table_src += '<td title="' + txn.hash + '">' + txn.hash.substring(0,12)+'...</td>';
			table_src += '<td title="' + txn.from + '">' + txn.from.substring(0,12)+'...</td>';
			if(txn.to != null)
			{
				table_src += '<td title="' + txn.to + '">' + txn.to.substring(0,12)+'...</td>';
			}
			else
			{
				table_src += '<td>NA </td>';
			}
			table_src += '<td>' + web3.fromWei(txn.value, "ether") + '</td>';
			table_src += '</tr>';
		} 
		table_src += '</table>';

		}
		else
		{
			table_src = "No Transactions";
		}
		document.getElementById('tableTrans').innerHTML = table_src;
	}
		
	function displayBCV() {
	
	 document.getElementById("blockDetails").style.visibility = "hidden";
	
	  var coinbase = web3.eth.coinbase;
	  var total = web3.eth.blockNumber;
	  var table_src = '<table class="table table-condensed"> <thead><tr><th>Number</th><th>Hash</th><th>Difficulty</th><th>Miner</th><th>Gas</th><th>Time</th><th>Tx #</th></tr></thead>'
	  for(var j=0; j<5; j++)
	  {
	  	i = total - j;
		if (i>0){
			table_src += '<tr>';
			var block = web3.eth.getBlock(i);
			table_src += '<td><a href="#" onclick="displayBCVdetails(' + i + ');" return false;">' + i + '</a></td>';
			table_src += '<td title="' + block.hash + '">' + block.hash.substring(0,12) + '...</td>';
			table_src += '<td>' + block.difficulty + '</td>';
			table_src += '<td title="' + block.miner + '">' + block.miner.substring(0,12) + '...</td>';
			table_src += '<td>' + block.gasUsed + '</td>';
			table_src += '<td>' + block.timestamp + '</td>';
			table_src += '<td>' + block.transactions.length + '</td>';
			table_src += '</tr>';
		}
	  } 
		table_src += '</table>';
		document.getElementById('tableBCV').innerHTML = table_src;
}

    var connection = io.connect('http://localhost:8080')
	var host = location.origin.replace(/^http/, 'ws')
      var ws = new WebSocket(host);
	oldData = "";
	ws.onmessage = function (event) {
		switch(event)
		{
			case "comeFromDevice" : call(data); break;
			case "disconnect" : disconnect(); break;
		}
	};
  function disconnect() {
			console.log('disconnect client event....');
	}
//window.setInterval(sendToBc,10000);

function call(data){
	//tempLower
	/* 
		{"deviceId":"sensor001","SensorType":"Humidity","SensorValue":"25.00"}
		{"deviceId":"sensor001","SensorType":"TempC","SensorValue":"28.00"}
		{"deviceId":"sensor001","SensorType":"Lux","SensorValue":"560.00"}
	*/
	 var res;
    switch(data.SensorType){
		/* case 'Humidity' : setHumidRecord(data.SensorValue,data.deviceId);
		res = getHumidFlag(data.SensorValue);
		break;
		case 'TempC' : setTempRecord(data.SensorValue,data.deviceId);
		res = getTempFlag(data.SensorValue);
		break; */
		case 'Lux' : 
				//if(data.falg=="start")
				{
					setLumenRecord(data.SensorValue,data.deviceId);
					res = getLumenFlag(data.SensorValue);
					console.log(res);
				}
		break;
		default : console.log(data);break;
	}
	
	var data = (res == "HIGH" || res == "LOW") ? {temp:"ON"} : {temp:"OFF"};
	console.log(data.temp,oldData);
	oldData = data.temp;
	ws.send('sendtoDevice',data);
	//connection.emit('sendtoDevice',data)
	//(data.temp !=oldData) ?
	//  connection.emit('sendtoDevice',data) : '';
	/* $.ajax({
		url:"users/client",
		data : data,
		success : function(data){
			console.log(data);
		},
		"method":"post"
		
	}); */
} 
         
  function init(){    
	document.getElementById("notifyTR").style.visibility = "hidden";
	document.getElementById("notifyHR").style.visibility = "hidden";
	document.getElementById("notifyLR").style.visibility = "hidden";

	document.getElementById("tempLower").value = getTempThresholdLower();
	document.getElementById("tempUpper").value = getTempThresholdUpper();	
	displayTV(getTempRecordAt(getTempHistRecordCount()));
	
	document.getElementById("humidLower").value = getHumidThresholdLower();
	document.getElementById("humidUpper").value = getHumidThresholdUpper();	
	displayHV(getHumidRecordAt(getHumidHistRecordCount()));
	
	document.getElementById("lumenLower").value = getLumenThresholdLower();
	document.getElementById("lumenUpper").value = getLumenThresholdUpper();	
	displayLV(getLumenRecordAt(getLumenHistRecordCount()));
  }