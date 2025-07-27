//client/src/js/Draw/drawGame.js
import drawFloor from "./drawFloor.js";
import drawBullet from "./drawBullet.js";
import drawBodys from "./drawBody.js";

function lerp(start, end, t) {
    return start + (end - start) * t;
}

export default function drawGame(ctx, player, user, t) {

    ctx.clearRect(0, 0, user.pov.width, user.pov.height);

    const origin = {
        x: player.x - user.pov.width / 2,
        y: player.y - user.pov.height / 2
    }

    drawFloor("Game", ctx, user.pov, player, t);

    drawBullet(ctx, origin, player.bulletInfo, user, t);

    drawBodys(ctx, origin, player.enemyInfo, player.health, user, t);

}
