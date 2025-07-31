//positioner.js
const addEntityId = require("./addEntityId ");

module.exports = function positioner(Dirty, Pool) {

    const targetMap = {};

    Dirty.forEach((_, instance_id) => {

        const player = Pool[instance_id];

        if (!player.seenBy) return;//if its not player return.

        const target_instance_list = [instance_id];//Data for instance_id x will be sent to the client controlling instance_id x.

        player.seenBy.forEach(enemie_id => {//Data for instance_id x will be sent to the client who sees instance_id x.

            const update = Pool[enemie_id].socket_id;

            addEntityId(targetMap, update, instance_id);

        });

        player.seenBullets.forEach(bullet_id => {//The entities seen by instance_id x will be sent to the client that controls instance_id x.

            target_instance_list.push(bullet_id);

        });

        if (target_instance_list.length === 0) return;

        addEntityId(targetMap, player.socket_id, target_instance_list);

    });

    return targetMap;

}