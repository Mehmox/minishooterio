//byteCalculater.js
module.exports = function ByteCalculater(targets, Dirty, schema) {

    let deltaBufferSizes = {};

    for (let socket_id in targets) {

        let deltaBufferSize = 0;

        const list = targets[socket_id];

        list.forEach((instance_id) => {

            const player = Dirty.get(instance_id);

            deltaBufferSize += 2;//instance_id size 2 byte

            deltaBufferSize += 2;//instance_id changed property num 2 byte

            for (const property in player) {

                const size = schema[property].dynamic ? 0 : schema[property].size;

                deltaBufferSize += 1;//property shema id 1 byte

                switch (property) {
                    case "inVision":

                        deltaBufferSize += 1;//total inVision entity num

                        deltaBufferSize += player[property].length * 2;//inVision entity ids

                        deltaBufferSize += player[property].length;//relation entity event id

                        break;

                    case "nick":

                        deltaBufferSize += 1;//nick length

                        deltaBufferSize += Buffer.byteLength(player[property], "utf8");

                        break;

                    default:

                        deltaBufferSize += size;//property value bytes

                        break;
                }

            }

        });

        deltaBufferSizes[socket_id] = deltaBufferSize;

    };

    return deltaBufferSizes;

}