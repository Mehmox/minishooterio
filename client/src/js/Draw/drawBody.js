//drawBody.js
import drawHealth from "./drawHealth.js";
import drawNick from "./drawNick.js";

export default function drawBody(ctx, origin, enemeys, health, user) {

    enemeys.forEach(enemy => {

        ctx.fillStyle = "red";

        const canvasPos = {
            x: enemy.x - origin.x,
            y: enemy.y - origin.y,
        }

        ctx.beginPath();

        ctx.arc(canvasPos.x, canvasPos.y, user.size, 0, Math.PI * 2);

        ctx.fill();
        ctx.closePath();

        drawHealth(ctx, canvasPos.x, canvasPos.y, user.size, enemy.health, "red");

        drawNick(ctx, canvasPos.x, canvasPos.y, user.size, enemy.nick);

    });

    //draw user
    ctx.fillStyle = "blue";
    ctx.beginPath();

    ctx.arc(user.pov.width / 2, user.pov.height / 2, user.size, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();

    drawHealth(ctx, user.pov.width / 2, user.pov.height / 2, user.size, health, "green");

    drawNick(ctx, user.pov.width / 2, user.pov.height / 2, user.size, user.nick);

}