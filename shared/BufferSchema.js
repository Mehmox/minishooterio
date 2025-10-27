//BufferShema.js
const client_schema = {
    read: [
        { dynamic: false, signed: false, type: "Int", byte: 2, const: true, state: "instance_id" },
        { dynamic: false, signed: false, type: "Int", byte: 1, const: true, state: "instance_type_id" },
        { dynamic: false, signed: false, type: "Int", byte: 2, const: true, state: "instance_changed_num" },
        { dynamic: false, signed: false, type: "Int", byte: 1, state: "property_schema_id" },
        { dynamic: true, signed: false, type: "Int", state: "nick" },
        { dynamic: false, signed: false, type: "Int", byte: 1, state: "health" },
        { dynamic: false, signed: true, type: "Int", byte: 4, state: "x", scale: 100 }, //map size 4000 soo it should be max 100
        { dynamic: false, signed: true, type: "Int", byte: 4, state: "y", scale: 100 }, //map size 4000 soo it should be max 100
        { dynamic: false, signed: false, type: "Int", byte: 1, state: "isowner", scale: 1 },
        { dynamic: false, signed: true, type: "Int", byte: 2, state: "angle", scale: 1000 },
                { dynamic: false, signed: false, type: "Int", byte: 2, state: "inSight" },
        { dynamic: false, signed: false, type: "Int", byte: 2, state: "outSight" },
    ],
    write: {}
};
const server_schema = {
    read: [
        { dynamic: false, signed: false, type: "Int", byte: 1, state: "isShooting" },
        { dynamic: false, signed: false, type: "Int", byte: 2, state: "muzzle_x" },
        { dynamic: false, signed: false, type: "Int", byte: 2, state: "muzzle_y" },
    ],
    write: {}
};
const equals = {
    "client": { read: "get", write: "set" },
    "server": { read: "read", write: "write" },
};
function set(id, data, readingTo, writingTo, write_schema) {
    const read_method_body = equals[readingTo].read;
    const write_method_body = equals[writingTo].write;
    const isSinged = data.signed ? "" : "U";
    const type = data.type;
    const bit = data.byte * 8;
    const read_endian = bit > 8 && readingTo === "server" ? "LE" : "";
    const scale = data.scale ? data.scale : 1;
    const write_endian = bit > 8 && writingTo === "server" ? "LE" : "";
    const readMethod = `${read_method_body}${isSinged}${type}${bit}${read_endian}`;
    data.readMethod = readMethod;
    data.scale = scale;
    const writeMethod = `${write_method_body}${isSinged}${type}${bit}${write_endian}`;
    write_schema.write[data.state] = { id, writeMethod, size: data.byte, scale };
}
client_schema.read.forEach((data, id) => set(id, data, "client", "server", server_schema));
server_schema.read.forEach((data, id) => set(id, data, "server", "client", client_schema));
// console.log("client_schema:");
// client_schema.read.forEach(key => {
//     console.log(key);
// });
// console.log(client_schema.write);
// console.log("\n");
// console.log("server_schema:");
// console.log(server_schema);
export { client_schema, server_schema };
