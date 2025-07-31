//encoder.js
const { write_schema } = require("../../../client/src/shared/BufferShema");

function Event(event) {
    switch (event) {
        case "add": return 0;
        case "delete": return 1;
        default: throw new Error("invalid event")
    }
}

function writeToBuffer(buffer, schema_key, value, offset) {

    const schema = write_schema[schema_key];

    const writeMethod = schema.writeMethod;

    return buffer[writeMethod](value, offset);

}

function writeInVision(buffer, data, offset) {

    offset = buffer.writeUint8(data.length, offset);//total inVision player num

    const writeMethod = write_schema["inVision"].writeMethod;

    data.forEach(entity => {

        const entity_id = entity.value;

        offset = buffer[writeMethod](entity_id, offset);//inVision player id;

        const event_id = Event(entity.event);

        offset = buffer.writeUint8(event_id, offset);//properys changed value

    });

    return offset;

}

function writeNick(buffer, data, offset) {

    const nick_length = buffer.write(data, offset + 1, "utf8");

    offset = buffer.writeUint8(nick_length, offset);

    return offset + nick_length;

}

module.exports = function encoder(targets, deltaBufferSizes, Dirty) {

    let deltaSnapshots = {};

    for (const owner_socket_id in targets) {

        const list = targets[owner_socket_id];

        const deltaSnapshot = Buffer.alloc(deltaBufferSizes[owner_socket_id]);

        let offset = 0;

        list.forEach(instance_id => {

            const player_patch = Dirty.get(instance_id);

            offset = writeToBuffer(deltaSnapshot, "instance_id", instance_id, offset);

            let changed_offset = offset;
            let changed_num = 0;

            offset = offset + write_schema["instance_changed_num"].size;

            for (const state in player_patch) {

                const data = player_patch[state];

                offset = writeToBuffer(deltaSnapshot, "property_schema_id", write_schema[state].id, offset);

                switch (state) {
                    case "inVision": offset = writeInVision(deltaSnapshot, data, offset); break;
                    case "nick": offset = writeNick(deltaSnapshot, data, offset); break;
                    default: offset = writeToBuffer(deltaSnapshot, state, data, offset); break;
                }

                changed_num++;

            }

            writeToBuffer(deltaSnapshot, "instance_changed_num", changed_num, changed_offset);

            deltaSnapshots[owner_socket_id] = deltaSnapshot;

        });

    }

    return deltaSnapshots;

}