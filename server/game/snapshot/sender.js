module.exports = function sender(GameBuffer, sockets) {

    Object.entries(GameBuffer).forEach(([socket_id, buffer]) => {

        try {
            sockets.get(socket_id).emit("tick", buffer);
        } catch (error) {
            console.log(socket_id)
            console.log(sockets.get(socket_id))
            throw new Error("socket_id error")
        }

    });

}