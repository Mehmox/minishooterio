//decoder.js
import { client_schema } from '../../shared/BufferSchema.js';
import { client_type_Map } from '../../shared/typeMap.js';

const read = client_schema.read;
const map = client_type_Map.read;

DataView.prototype.getUInt8 = DataView.prototype.getUint8;
DataView.prototype.getUInt16 = DataView.prototype.getUint16;
DataView.prototype.getUInt32 = DataView.prototype.getUint32;

function readFromBuffer(Gamestate, headers, patch, state, offset, property_id) {

    const readMethod = read[property_id].readMethod;
    const scale = read[property_id].scale;
    const size = read[property_id].byte;

    // try {
    Gamestate[headers.instance_id][state] = patch[readMethod](offset, true) / scale;//değişen verinin değeri
    // } catch (e) {
    console.log(`state: ${state};`);
    console.log(`DataView.${readMethod}(${offset}, true);`);
    console.log(`buffer.length: ${patch.byteLength} offset: ${offset};`);
    console.log(`read: ${size} bytes;`);
    console.log(`returning: ${offset + size} bytes;\n`);
    // console.log("ERRORR................");
    // }

    return offset + size;
}

function readNick(Gamestate, headers, patch, offset) {

    const nick_length = patch.getUint8(offset);

    console.log(`state: nick;`);
    console.log(`buffer.length: ${patch.buffer.byteLength} offset: ${offset};`);
    console.log(`read: ${nick_length} + 1 bytes;`);

    offset += 1;

    Gamestate[headers.instance_id].nick = new TextDecoder("utf-8").decode(new Uint8Array(patch.buffer, offset, nick_length));

    offset += nick_length;

    console.log(`returning: ${offset} bytes;\n`);

    return offset;

}

function readHeaders(patch, headers, offset) {

    //verisi değişen entitynin idsi
    //verisi değişen entitynin türü
    //verisi değişen entitynin değişen veri sayısı
    read.forEach(element => {
        if (!element.const) return;

        const readMethod = element.readMethod;
        const state = element.state;
        const size = element.byte;
        // try {
        headers[state] = patch[readMethod](offset, true);
        // } catch (error) {
        // console.log(`state: ${state};`);
        // console.log(`DataView.${readMethod}(${offset}, true);`);
        // console.log(`buffer.length: ${patch.byteLength} offset: ${offset};`);
        // console.log(`read: ${size} bytes;`);
        // }

        offset += size;

    });

    console.log(`returning: ${offset} bytes;\n`);

    return offset;

}

export default function decoder(snapshot) {

    const Gamestate = {};

    const arrayBuffer = snapshot.buffer.slice(snapshot.byteOffset, snapshot.byteOffset + snapshot.byteLength);

    const patch = new DataView(arrayBuffer);

    // for (let offset = 0; offset < arrayBuffer.byteLength;) {
    for (let offset = 0; offset < 1;) {

        const headers = {};

        offset = readHeaders(patch, headers, offset);

        if (!Gamestate[headers.instance_id]) Gamestate[headers.instance_id] = { type: map[headers.instance_type_id] };

        for (let i = 0; i < headers.instance_changed_num; i++) {

            const property_id = patch.getUint8(offset);//değişen verinin idsi
            console.log("+1 property_id");
            offset++;

            const state = read[property_id].state;//değişen verinin adı

            switch (state) {
                case "nick": offset = readNick(Gamestate, headers, patch, offset); break;
                default: offset = readFromBuffer(Gamestate, headers, patch, state, offset, property_id); break;
            }

        }

    }

    return Gamestate;

}