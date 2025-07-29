//decoder.js
import { read_schema } from "../client/src/shared/BufferShema.js";

function Event(event_id) {
    switch (event_id) {
        case 0: return "add";
        case 1: return "delete";
        default: throw new Error("invalid event");
    }
}

export default function decoder(snapshot) {

    const Gamestate = {};

    for (const socket in snapshot) {

        const data = snapshot[socket];

        const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

        const patch = new DataView(arrayBuffer);

        for (let offset = 0; offset < data.byteLength;) {

            const entity_id = patch.getUint16(offset, true);//verisi değişen entitynin idsi

            offset += 2;

            const property_num = patch.getUint16(offset, true);//verisi değişen entitynin değişen veri sayısı

            offset += 2;

            if (!Gamestate[entity_id]) Gamestate[entity_id] = {};//test için

            for (let i = 0; i < property_num; i++) {

                const property_id = patch.getUint8(offset);//değişen verinin idsi

                offset++;

                const property = read_schema[property_id].variable;//değişen verinin adı

                switch (property) {
                    case "inVision":

                        if (!Gamestate[entity_id].inVision) Gamestate[entity_id].inVision = new Set();//test için

                        const inVision_player_num = patch.getUint8(offset);

                        offset += 1;

                        for (let j = 0; j < inVision_player_num; j++) {

                            const value = patch.getUint16(offset, true)//görüşe giren oyuncunun idsi

                            offset += 2;

                            const event_id = patch.getUint8(offset);

                            offset += 1;

                            const event = Event(event_id);

                            Gamestate[entity_id].inVision[event](value);

                        }

                        break;
                        
                    case "nick":

                        const nick_length = patch.getUint8(offset);

                        offset += 1;

                        Gamestate[entity_id].nick = new TextDecoder("utf-8").decode(new Uint8Array(patch.buffer, offset, nick_length))

                        offset += nick_length;

                        break;

                    default:

                        const property_bit = read_schema[property_id].bit;//değişen verinin boyutu
                        const getMetod = "getUint" + property_bit;
                        const size = read_schema[property_id].byte;

                        Gamestate[entity_id][property] = patch[getMetod](offset, true);//değişen verinin değeri

                        offset += size;

                        break;
                }

            }

        }

    }

    console.log(Gamestate)
    console.log("\n")

}