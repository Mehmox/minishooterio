//markDirty.js
const Dirty = require("./Dirty");

function markDirty(id, varible, value, event) {

    // if (event) console.log(id, varible, value, event)
    // else console.log(id, varible, value)

    const data = Dirty.get(id);

    if (varible !== "inVision") {
        Dirty.set(id, { ...data, [varible]: value });
        return;

    }

    if (data && data[varible]) {

        Dirty.set(id, { ...data, [varible]: [...(data[varible]), { event, value }] });

    } else {

        Dirty.set(id, { ...data, [varible]: [{ event, value }] });

    }

}

module.exports = markDirty;