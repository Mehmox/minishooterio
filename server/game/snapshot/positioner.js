//positioner.js
const crypto = require('crypto');

//test için geçici socket id oluşturucu
function generateSocketLikeId(length = 21) {
    return crypto.randomBytes(length)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .slice(0, length);
}

module.exports = function positioner(Dirty, Pool) {

    const ne_nereye_gidecek = {};//düzgün bir ad bulamadım geçici türkçe isim verdim.

    Dirty.keys().forEach((instance_id, i) => {

        const player = Pool.player[instance_id];

        const target_instance_list = [instance_id];

        player.enemyInfo.keys().forEach((enemie_id) => {

            if (!Dirty.has(instance_id)) return;

            target_instance_list.push(enemie_id);

        });

        ne_nereye_gidecek[player.socket_id || ` ${generateSocketLikeId()} `] = target_instance_list;

    });

    return ne_nereye_gidecek;

}