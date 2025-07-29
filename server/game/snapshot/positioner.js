//positioner.js
module.exports = function positioner(Dirty, Pool) {

    const ne_nereye_gidecek = {};//düzgün bir ad bulamadım geçici türkçe isim verdim.

    Dirty.keys().forEach(instance_id => {

        const player = Pool[instance_id];

        const target_instance_list = [instance_id];

        if (!player.enemyInfo) return;

        player.enemyInfo.keys().forEach(enemie_id => {
            if (!Dirty.has(enemie_id)) return;

            target_instance_list.push(enemie_id);

        });

        player.bulletInfo.keys().forEach(bullet_id => {
            if (!Dirty.has(bullet_id)) return;

            target_instance_list.push(bullet_id);

        });

        ne_nereye_gidecek[player.socket_id] = target_instance_list;

    });

    return ne_nereye_gidecek;

}