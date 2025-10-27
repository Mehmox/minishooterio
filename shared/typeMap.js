//BufferShema.js
const client_type_Map = {
    read: {
        0: "Player",
        1: "Bullet",
    },
    write: {}
};
const server_type_Map = {
    read: {},
    write: {}
};
function set(read, write) {
    for (const key in read.read) {
        write.write[read.read[key]] = +key;
    }
}
set(client_type_Map, server_type_Map);
set(server_type_Map, client_type_Map);
// console.log("client_type_Map: ");
// console.log(client_type_Map);
// console.log("server_type_Map: ");
// console.log(server_type_Map);
export { client_type_Map, server_type_Map };
