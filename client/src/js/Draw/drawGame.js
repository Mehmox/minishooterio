import drawFloor from "./drawFloor.js";
import drawBullet from "./drawBullet.js";
import drawBodys from "./drawBody.js";
import PrintMap from "../draw/drawMap.js";
import lerp from "../core/Lerp.js";

export default function drawGame({ ctxg, ctxm }, player, map, bg, user, t) {

    ctxg.clearRect(0, 0, user.pov.width, user.pov.height);

    const lerpX = lerp.use(player.prev.x, player.next.x, t);
    const lerpY = lerp.use(player.prev.y, player.next.y, t);

    const origin = {
        x: lerpX - user.pov.width / 2,
        y: lerpY - user.pov.height / 2
    }

    drawFloor(ctxg, user.pov, lerpX, lerpY, bg);

    drawBullet(ctxg, origin, player, user, t);

    drawBodys(ctxg, origin, player, player.next.health, user, t, bg);

    PrintMap(ctxm, map, player, bg, user, t);

}
