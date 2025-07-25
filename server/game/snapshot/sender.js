const set = new Set();
module.exports = function sender(GameBuffer, sockets) {

    Object.entries(GameBuffer).forEach(([socket_id, buffer]) => {
        if (socket_id === "undefined" || set.has(socket_id)) return;

        const socket = sockets.get(socket_id);
        
        if (socket) socket.emit("tick", buffer);

    });

}