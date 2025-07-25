import drawHealth from "./drawHealth.js";
import drawNick from "./drawNick.js";
import drawMuzzle from "./drawMuzzle.js";
import lerp from "../utils/Lerp.js";

export default function drawBody(ctx, origin, { prev, next }, health, user, t, bg) {

    ctx.lineWidth = 1;

    prev.enemyInfo.forEach((enemy, index) => {

        ctx.fillStyle = "rgb(255,0,0)";

        const canvasPos = {
            x: lerp(enemy.x, next.enemyInfo[index] ? next.enemyInfo[index].x : enemy.x, t) - origin.x,
            y: lerp(enemy.y, next.enemyInfo[index] ? next.enemyInfo[index].y : enemy.y, t) - origin.y,
        }

        ctx.beginPath();

        ctx.arc(canvasPos.x, canvasPos.y, user.size, 0, Math.PI * 2);

        ctx.fill();
        ctx.closePath();

        drawHealth(ctx, canvasPos.x, canvasPos.y, user.size, enemy.health, "red");

        drawNick(ctx, canvasPos.x, canvasPos.y, user.size, enemy.nick, bg);

    });

    //draw user
    ctx.fillStyle = "rgb(51,153,255)";
    ctx.beginPath();

    ctx.arc(window.innerWidth / 2, window.innerHeight / 2, user.size, 0, Math.PI * 2);

    ctx.fill();

    ctx.closePath();

    // drawMuzzle(ctx, user.size);

    drawHealth(ctx, window.innerWidth / 2, window.innerHeight / 2, user.size, health, "green");

    drawNick(ctx, window.innerWidth / 2, window.innerHeight / 2, user.size, user.nick, bg);

}