import User from "../utils/User";

export default function applyDelta(next, Delta) {
    console.log("self: ", Delta[User.id])
    for (const instance_id in Delta) {
        if (+instance_id === User.id) continue;
        console.log(instance_id, Delta[instance_id])
    }
}