//byteCalculater.js
import { server_schema } from "../../../../shared/BufferSchema.js";

const write = server_schema.write;

const instance_id_byte = (write as any)["instance_id"].size;
const instance_type_id_byte = (write as any)["instance_type_id"].size;
const instance_changed_num_byte = (write as any)["instance_changed_num"].size;
const property_schema_id_byte = (write as any)["property_schema_id"].size;

type patch = {
    [key: string]: number | string;
    nick: string;
}

type playerPayloads = {
    [key: number]: {
        trackeds: Array<number>;
        socket_id: string;
    }
}

function countAllTargets(
    payload: Array<number>,
    deltaBufferSizes: { [key: number]: number },
    Dirty: Map<number, object>,
    player_id: number,
): void {

    let deltaBufferSize = 0;

    payload.forEach(instance_id => {

        const patch = Dirty.get(instance_id) as patch;

        deltaBufferSize += instance_id_byte;

        deltaBufferSize += instance_type_id_byte;

        deltaBufferSize += instance_changed_num_byte;

        for (const state in patch) {
            if (state === "instance_type_id") continue;

            deltaBufferSize += property_schema_id_byte;

            switch (state) {
                case "nick":

                    deltaBufferSize += 1;//nick length byte

                    deltaBufferSize += Buffer.byteLength(patch.nick, "utf8");

                    break;

                default:

                    deltaBufferSize += (write as any)[state].size;//state size bytes

                    break;
            }

        }

    });

    deltaBufferSizes[player_id] = deltaBufferSize;

}

export default function ByteCalculater(
    playerPayloads: playerPayloads,
    Dirty: Map<number, object>
): { [key: number]: number } {

    const deltaBufferSizes = {};

    for (let player_id in playerPayloads) {

        const payload = playerPayloads[player_id]?.trackeds as Array<number>;

        countAllTargets(payload, deltaBufferSizes, Dirty, +player_id);

    };

    return deltaBufferSizes;

}