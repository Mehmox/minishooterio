import drawFloor from "./drawFloor.js";
import drawBullet from "./drawBullet.js";
import drawBodys from "./drawBody.js";
import PrintMap from "./drawMap.js";
import lerp from "../utils/Lerp.js";

export default function drawGame({ ctxg, ctxm }, player, map, bg, user, t, canvas, system) {

    ctxg.clearRect(0, 0, canvas.width, canvas.height);

    const lerpX = lerp(player.prev.x, player.next.x, t);
    const lerpY = lerp(player.prev.y, player.next.y, t);

    const origin = {
        x: lerpX - window.innerWidth / 2,
        y: lerpY - window.innerHeight / 2
    }

    drawFloor(ctxg, system, lerpX, lerpY, bg);

    drawBodys(ctxg, origin, player, player.next.health, user, t, bg);

    drawBullet(ctxg, origin, player, user, t);

    PrintMap(ctxm, map, player, bg, user, t);

}
