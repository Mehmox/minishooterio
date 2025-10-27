//markDirty.js
import Player from "../entities/Player.js";
import Dirty from "./Dirty.js";

export default function markDirty(entity, state, value) {

    const data = Dirty.get(entity.id);

    Dirty.set(entity.id, { ...data, instance_type_id: entity.type, [state]: value ? value : entity[state] });

}