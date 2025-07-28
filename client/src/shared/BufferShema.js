//BufferShema.js
const read_schema = [
    { relation: "entity", variable: "inVision", writeMethod: "writeUint16LE", dynamic: true },
    { relation: "self", variable: "nick", writeMethod: "writeUint16LE", dynamic: true },
    { relation: "self", variable: "health", writeMethod: "writeUint8", dynamic: false, byte: 1, bit: 8 },
    { relation: "self", variable: "x", writeMethod: "writeUint32LE", dynamic: false, byte: 4, bit: 32 },
    { relation: "self", variable: "y", writeMethod: "writeUint32LE", dynamic: false, byte: 4, bit: 32 },
    { relation: "self", variable: "muzleAngle", writeMethod: "writeUint16LE", dynamic: false, byte: 2, bit: 16 },
    { relation: "self", variable: "login", dynamic: true },//bu henüz çalışmıyor encoder/decoder düzgün çalışsın ekliyeceğim
];

const write_schema = {};

read_schema.forEach((k, i) => {

    write_schema[k.variable] = { relation: k.relation, id: i, dynamic: k.dynamic, writeMethod: k.writeMethod }

    if (!k.dynamic) write_schema[k.variable].size = k.byte;

});
// console.log("write_schema:")
// console.log(write_schema)
// console.log("\n")
module.exports = { read_schema, write_schema };