export default function sender(GameBuffer, sockets) {

    const entries = Object.entries(GameBuffer);

    // const invalidSockets = entries.filter(([_, { socket_id }]) => {

    //     if (!sockets.get(socket_id)) return true;

    // }).map(arr => arr[0]);//if some sockets are invalid return just instance id;

    // if (invalidSockets.length > 0) {
    //     return invalidSockets;
    // };

    entries.forEach(([_, { socket_id, buffer }]) => {

        try {
            sockets.get(socket_id).emit("tick", buffer);
        } catch (error) {
            console.log(`${socket_id} not found`);
         }

    });

    return false;

}