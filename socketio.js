'use-strict';

const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


const { get_redis_subscriber } = require('../frappe/node_utils');
const subscriber = get_redis_subscriber();


const { get_fsocket_conf } = require('./node_utils');
const { fsocketio_port } = get_fsocket_conf();


app.use('/test', express.static(path.join(__dirname, './client')));

server.listen(fsocketio_port, function () {
	console.log('listening on *:', fsocketio_port);
});

subscriber.subscribe('events');


// Listen to events emmited by frappe.publish_realtime
subscriber.on('message', function (channel, message, room) {
	message = JSON.parse(message);
	if (message.room) {
		io.to(message.room).emit(message.event, message.message);
	} else {
		io.emit(message.event, message.message);
	}
});


// Listen to events emmited by the clients
io.on('connection', function (socket) {
	socket.on('msgprint', function(message) {
		console.log('message from client', message);
	});
});
