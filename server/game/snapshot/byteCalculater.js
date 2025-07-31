//byteCalculater.js
const { write_schema } = require("../../../client/src/shared/BufferShema");

const instance_id_byte = write_schema["instance_id"].size;
const instance_changed_num_byte = write_schema["instance_changed_num"].size;
const property_schema_id_byte = write_schema["property_schema_id"].size;

module.exports = function ByteCalculater(targets, Dirty) {

    let deltaBufferSizes = {};

    for (let socket_id in targets) {

        let deltaBufferSize = 0;

        const list = targets[socket_id];

        list.forEach(instance_id => {

            const player = Dirty.get(instance_id);

            deltaBufferSize += instance_id_byte;

            deltaBufferSize += instance_changed_num_byte;

            for (const state in player) {

                deltaBufferSize += property_schema_id_byte;

                switch (state) {
                    case "inVision":

                        deltaBufferSize += 1;//total inVision entity num

                        deltaBufferSize += player[state].length * 2;//inVision entity ids

                        deltaBufferSize += player[state].length;//relation entity event id

                        break;

                    case "nick":

                        deltaBufferSize += 1;//nick length

                        deltaBufferSize += Buffer.byteLength(player[state], "utf8");

                        break;

                    default:

                        const dataSize = write_schema[state].dynamic ? 0 : write_schema[state].size;

                        deltaBufferSize += dataSize;//state value bytes

                        break;
                }

            }

        });

        deltaBufferSizes[socket_id] = deltaBufferSize;

    };

    return deltaBufferSizes;

}