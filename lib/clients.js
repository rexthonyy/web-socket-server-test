const WebSocket = require('ws');

let room = {};

function addClientToRoom(roomName, ws){
	if(room[roomName]){
		let isClientInRoom = false;
		room[roomName].forEach(client => {
			if(ws == client){
				isClientInRoom = true;
			}
		});

		if(!isClientInRoom){
			room[roomName].push(ws);
		}
	}else{
		room[roomName] = [];
		room[roomName].push(ws);
		console.log("New client");
	}
}

function broadcastToClientsInRoom(roomName, ws, msg){
	if(room[roomName]){
		room[roomName].forEach(client => {
			if(ws != client && client.readyState === WebSocket.OPEN){
				client.send(msg);
			}
		});
	}
}

function removeClientFromAllRooms(ws){
	for(const [roomName, clientList] of Object.entries(room)){
        const index = clientList.findIndex(client => ws == client);
        if(index !== -1){
        	clientList.splice(index, 1);
        	console.log("Remove client from " + roomName);
        	if(clientList.length == 0){
        		delete room.roomName;
        		console.log(roomName + " deleted");
        	}
        }
    }
}

function showStat(){
	for(const [roomName, clientList] of Object.entries(room)){
		console.log(clientList.length + " Clients in " + roomName);
    }
}

module.exports = {
	addClientToRoom,
	broadcastToClientsInRoom,
	removeClientFromAllRooms,
	showStat
};