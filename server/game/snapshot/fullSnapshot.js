const importants = ["x", "y", "health","nick"];

module.exports = function fullSnapshot(player, markDirty) {

    importants.forEach(state => {

        markDirty(player.id, state, player[state]);

    });

}