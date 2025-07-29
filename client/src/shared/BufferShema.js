//BufferShema.js
const read_schema = [
    { state: "instance_id", writeMethod: "writeUint16LE", dynamic: false, byte: 2 },
    { state: "instance_changed_num", writeMethod: "writeUint16LE", dynamic: false, byte: 2 },
    { state: "property_schema_id", writeMethod: "writeUint8", dynamic: false, byte: 1 },

    { state: "inVision", writeMethod: "writeUint16LE", dynamic: true },
    { state: "nick", writeMethod: "writeUint16LE", dynamic: true },
    { state: "health", writeMethod: "writeUint8", dynamic: false, bit: 8, byte: 1 },
    { state: "x", writeMethod: "writeUint32LE", dynamic: false, bit: 32, byte: 4 },
    { state: "y", writeMethod: "writeUint32LE", dynamic: false, bit: 32, byte: 4 },
    { state: "muzleAngle", writeMethod: "writeUint16LE", dynamic: false, bit: 16, byte: 2 },
    { state: "login", dynamic: true },//bu henüz çalışmıyor encoder/decoder düzgün çalışsın ekliyeceğim
];

const write_schema = {};

read_schema.forEach((k, i) => {

    write_schema[k.state] = { id: i, dynamic: k.dynamic, writeMethod: k.writeMethod }

    if (!k.dynamic) write_schema[k.state].size = k.byte;

});
// console.log("write_schema:")
// console.log(write_schema)
// console.log("\n")
module.exports = { read_schema, write_schema };