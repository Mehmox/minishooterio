const importants = ["x", "y", "health", "nick"];

export default function fullSnapshot(player, markDirty) {

    importants.forEach(state => {

        markDirty(player, state);

    });

}