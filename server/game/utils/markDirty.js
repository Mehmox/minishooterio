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
//test inputs
markDirty(0, "nick", "instance id: 0 custom nick: üç yüz altmış beş gün test nick");
markDirty(0, "inVision", 2, "add");
markDirty(0, "inVision", 5, "add");
markDirty(0, "inVision", 7, "add");
markDirty(0, "inVision", 12, "add");
markDirty(0, "inVision", 32, "add");
markDirty(0, "inVision", 12, "delete");
markDirty(0, "x", 3000);
markDirty(0, "y", 2500);


markDirty(2, "nick", "instance id: 2 custom nick: abugle");
markDirty(2, "health", 150);
markDirty(2, "x", 500);
markDirty(2, "muzleAngle", 216);

markDirty(5, "nick", "instance id: 5 custom nick: niye çalışmıyor bu");
markDirty(5, "health", 2);

markDirty(7, "nick", "instance id: 7 custom nick: çalışıyor???");

markDirty(12, "health", 2);
markDirty(12, "x", 5000);
markDirty(12, "y", 15500);

markDirty(32, "nick", "instance id: 32 custom nick: jimmy");
markDirty(32, "health", 2);
markDirty(32, "x", 4000);

module.exports = markDirty;