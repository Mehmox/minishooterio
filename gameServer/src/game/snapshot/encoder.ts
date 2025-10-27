//encoder.ts
import { server_schema } from "../../../../shared/BufferSchema.js";
import { server_type_Map } from "../../../../shared/typeMap.js";
// import handleError from "../utils/snapshotError.js";
// import decoder from "../../../ztests/decoder.mjs";

type snapshot = {
    [key: number]: {
        buffer: Buffer;
        socket_id: string;
    }
}

type playerPayloads = {
    [key: number]: {
        trackeds: Array<number>;
        socket_id: string;
    }
}

type Buffers = {
    [key: number]: {
        buffer: Buffer,
        socket_id: string
    }
}

const write: { [key: string]: { [key: string]: string | number } } = server_schema.write;
const map: { [key: string]: number } = server_type_Map.write;

function writeToBuffer(buffer: Buffer, schema_key: string, data: number, offset: number): number {

    const schema = write[schema_key] as { [key: string]: string | number };

    const writeMethod = schema.writeMethod as string;

    const scale = schema.scale as number;

    const value = Math.floor(data * scale);

    let wrote: number;

    try {
        wrote = (buffer as any)[writeMethod](value, offset);
    } catch (error) {
        const size = schema.size as number;
        console.log(`schema_key: ${schema_key};`);
        console.log(`buffer.${writeMethod}(${value}, ${offset});`);
        console.log(`buffer.length: ${buffer.length} offset: ${offset};`);
        console.log(`wrote: ${size} bytes.;`);
        console.log(`returning: ${wrote} bytes.\n`);
        return offset + size;
    }

    return wrote;

}

function writeNick(buffer: Buffer, data: string, offset: number): number {

    let nick_length: number;

    try {
        nick_length = buffer.write(data, offset + 1, "utf8");
    } catch (error) {
        nick_length = Buffer.byteLength(data, "utf8");
        console.log(`buffer.write(${data}, ${offset + 1});`);
        console.log(`\nbuffer.length: ${buffer.length} offset: ${offset};`);
        console.log(`wrote: ${nick_length} + 1 bytes.;`);
        console.log(`returning: ${offset + nick_length} bytes.;`);
        return offset + 1 + nick_length;
    }

    offset = buffer.writeUint8(nick_length, offset);

    return offset + nick_length;

}

function writeTargets(
    payload: Array<number>,
    buffer: Buffer,
    Dirty: Map<number, object>,
    buffers: Buffers,
    socket_id: string,
    player_id: number,
): void {

    let offset = 0;

    payload.forEach(instance_id => {
        if (!Dirty.has(instance_id)) return;

        const patch = Dirty.get(instance_id) as { [key: string]: number | string };

        offset = writeToBuffer(buffer, "instance_id", instance_id, offset);

        const type: number = map[patch.instance_type_id];

        offset = writeToBuffer(buffer, "instance_type_id", type, offset);

        let changed_offset: number = offset;
        let changed_num: number = 0;

        offset += (write as any)["instance_changed_num"].size;

        for (const state in patch) {
            if (state === "instance_type_id") continue;

            const data = patch[state] as number | string;

            const state_id = write[state].id as number;

            offset = writeToBuffer(buffer, "property_schema_id", state_id, offset);

            switch (state) {
                case "nick": offset = writeNick(buffer, (data as any), offset); break;
                default: offset = writeToBuffer(buffer, state, (data as any), offset); break;
            }

            changed_num++;

        }

        writeToBuffer(buffer, "instance_changed_num", changed_num, changed_offset);

    });

    buffers[player_id] = { buffer, socket_id };

}

export default function encoder(
    playerPayloads: playerPayloads,
    deltaBufferSizes: { [key: number]: number },
    Dirty: Map<number, object>
): snapshot {

    const deltaBuffers = {};

    for (const player_id in playerPayloads) {

        const payload = playerPayloads[player_id]?.trackeds as Array<number>;

        const socket_id = playerPayloads[player_id]?.socket_id as string;

        const deltaBuffer = Buffer.alloc(deltaBufferSizes[player_id] as number);

        writeTargets(payload, deltaBuffer, Dirty, deltaBuffers, socket_id, +player_id);

        // decoder(deltaBuffer);

    }

    return deltaBuffers;

}