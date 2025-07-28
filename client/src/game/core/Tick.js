import PrintGame from "../render/drawGame.js";

let max = 0;
function maxDelay(now, system) {
    if (now - system.lastSnapshotTime > max) {
        max = now - system.lastSnapshotTime
        console.log(max)
        console.log({ after: now, before: system.lastSnapshotTime })
    }
}
export default function tickLoop(system, user, ctxg, ctxm, Gamestate, map, options, canvas) {

    const movement = user.movement;

    function Update() {

        movement.direction = "";

        if (movement.KeyW) movement.direction += "Up";
        if (movement.KeyA) movement.direction += "Left";
        if (movement.KeyS) movement.direction += "Down";
        if (movement.KeyD) movement.direction += "Right";

        if (Gamestate.prev) {

            const now = performance.now();

            // maxDelay(now, system);

            const t = Math.min(1, (now - system.lastSnapshotTime) / system.SnapshotDelta);
            // console.log("looping!", t);
            PrintGame({ ctxg, ctxm }, Gamestate, map, options[0].value, user, t, canvas, system);

        }

        system.renderId = requestAnimationFrame(Update);

    }

    Update();

}