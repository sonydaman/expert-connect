

   var socket = io();
    socket.on('comeFromDevice', function (data) {
      console.log(data);
	   socket.emit('sendtoDevice', {temp:"OFF",id:data.id});
    });
window.onbeforeunload = function (event) {
	socket.emit('myId', localStorage.getItem("id"));
};
if (typeof(Storage) !== "undefined") {
    socket.on('myId', function (data) {
		console.log(id);
		localStorage.setItem("id",data );
	})
} else {
    // Sorry! No Web Storage support..
}   	