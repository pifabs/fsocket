window.onload = function() {
	const socket = io("ws://localhost:9002", {
		transports: ["websocket", "polling"],
		path: '/socket.io',
	});
	socket.open();
	window.socket = socket;

	socket.on('update', function (room) {
		console.log(room);
	});

	socket.on("msgprint", (message) => {
		 console.log(message);
	});

	socket.on("connect", () => {
		console.log(socket.id);
	});
	socket.on("disconnect", () => {
		console.log(socket.id);
	});

	socket.on("connect_error", (err) => {
		console.log(`connect_error due to ${err.message}`);
		socket.io.opts.transports = ["polling", "websocket"];
		socket.open();
	});
}