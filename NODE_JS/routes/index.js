var express = require('express');
var router = express.Router();


var oldData = "";
router.get('/', function(req, res, next) {
 //console.log(res.socket);
 broker(res.io,res.socket,res.client);
   //res.render("index",{title:"SONYDAMAN"});
   res.render("html/home");
});
var broker = function (io,socket,client){
	//console.log("connect");console.log(socket,"OUTER");
	client.on('connect', function (data) {
	console.log("connect-1");
		//client.subscribe("topic/testtopic");
		client.subscribe("topic/SensorData");
		client.on('message', function (topic, message) {
			var myData = message.toString(),outPut = JSON.parse(message.toString());
			outPut.id = "";
			console.log("RECIEVE");
			if(oldData !== myData)
			   try{
					outPut.id = socket;
					console.log(outPut);
					io.sockets.socket[outPut.id].emit('comeFromDevice',output)
					}
					catch(e){
						io.emit('comeFromDevice', outPut)
					}
				//console.log(outPut);
			
			oldData = myData
			//client.end();
		 })
		}).setMaxListeners(0);
}

module.exports = router;
