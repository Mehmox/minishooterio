module.exports = function sender(GameBuffer, sockets) {

    Object.entries(GameBuffer).forEach(([socket_id, buffer]) => {
        if (socket_id === "undefined") return;

        const socket = sockets.get(socket_id);
        
        if (socket) socket.emit("tick", buffer);

    });

}