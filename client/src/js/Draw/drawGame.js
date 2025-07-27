//drawGame.js

import drawBullet from "./drawBullet.js";
import drawBodys from "./drawBody.js";

export default function drawGame(ctx, canvas, player, user) {

    ctx.clearRect(0, 0, user.pov.width, user.pov.height);

    canvas.style.backgroundPosition = `-${player.x}px -${player.y}px`;

    const origin = {
        x: player.x - user.pov.width / 2,
        y: player.y - user.pov.height / 2
    }

    drawBullet(ctx, origin, player.bulletInfo, user);

    drawBodys(ctx, origin, player.enemyInfo, user, player.health);

}
