var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com');
var routes = require('./routes/index');
var iot = require('./routes/iot');
var sockets = []
var app = express();
var publishData = function(data){
			console.log("New Connecting");
			console.log(data);
			    client.publish("topic/ControlData", data.temp, function() {
					console.log(data.temp);
					console.log("Message is published");
				  });
}
var server = require('http').Server(app);
var io = require('socket.io')(server);var oldData = "";
 io.on('connection', function (socket) {
	 socket.emit("id",socket.id);
	 sockets.push(socket.id);
	 //console.log("CONNECTION",sockets);
		//socket.emit('myId', socket.id);
		socket.on('sendtoDevice', function (data) {
			//console.log(data);
			for(var i=0; i<sockets.length; i++ ) {
					var p = sockets[i];
					//console.log(p ,"==", sockets[i])
					if(p == sockets[i]){
						//io.sockets.socket(p).emit('correct', data);
						if(oldData !== data)
							publishData(data)
						//console.log(data);
						break;
					}
			}
			oldData = data
			});
		socket.on('disconnect', function () {
			//console.log(socket.id);
			sockets.splice(sockets.indexOf(socket.id), 1);
			//client.end();
			console.log('disconnect',sockets);
		});
 });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(function(req, res, next){
 // console.log(sockets,"HI");
  res.io = io;
  res.client = client;
  res.socket = sockets[0];
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/iot', iot);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = {app: app, server: server};
