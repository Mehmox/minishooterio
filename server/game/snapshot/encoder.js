//encoder.js
function Event(event) {
    switch (event) {
        case "add": return 0;
        case "delete": return 1;
        default: throw new Error("invalid event")
    }
}

module.exports = function encoder(targets, deltaBufferSizes, Dirty, write_schema) {

    let deltaSnapshots = {};

    for (const target in targets) {

        const list = targets[target];

        list.forEach(instance_id => {

            const deltaSnapshot = Buffer.alloc(deltaBufferSizes[target]);

            let offset = 0;

            const player_patch = Dirty.get(instance_id);
            
            deltaSnapshot.writeUint16LE(instance_id, offset);//verisi değişen entitynin idsi

            offset += 2;

            deltaSnapshot.writeUint16LE(Object.keys(player_patch).length, offset);//verisi değişen entitynin değişen veri sayısı

            offset += 2;

            for (const variable_key in player_patch) {

                const data = player_patch[variable_key];

                const schema = write_schema[variable_key];
                const id = schema.id;
                const writeMethod = schema.writeMethod;

                deltaSnapshot.writeUint8(id, offset);//changed data id

                offset++;

                switch (variable_key) {
                    case "inVision":

                        deltaSnapshot.writeUint8(data.length, offset);//total inVision player num

                        offset += 1;

                        data.forEach(entity => {

                            const entity_id = entity.value;

                            deltaSnapshot[writeMethod](entity_id, offset);//inVision player id

                            offset += 2;

                            const event_id = Event(entity.event);

                            deltaSnapshot.writeUint8(event_id, offset);//properys changed value

                            offset += 1;

                        }); break;

                    case "nick":

                        const nick_length = deltaSnapshot.write(data, offset + 1, "utf8");

                        deltaSnapshot.writeUint8(nick_length, offset);

                        offset += 1 + nick_length;

                        break;

                    default:

                        try {
                            deltaSnapshot[writeMethod](data, offset);//properys changed value
                        } catch (error) {
                            console.log(variable_key)
                            console.log(error.message)
                        }

                        offset += schema.size;

                        break;
                }

            }

            deltaSnapshots[target] = deltaSnapshot;

        });

    }

    return deltaSnapshots;

}