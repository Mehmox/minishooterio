//enemies.js

export default function SetEnemies(ctx, origin, enemieInfo) {

    ctx.lineWidth = 1;
    ctx.fillStyle = "red";

    for (const enemieId in enemieInfo) {

        const enemie = enemieInfo[enemieId];
        const canvasPos = {
            x: enemie.position.x - origin.x,
            y: enemie.position.y - origin.y,
        }

        ctx.beginPath();

        ctx.arc(canvasPos.x, canvasPos.y, enemie.size, 0, Math.PI * 2);

        ctx.fill();
        ctx.closePath();
        ctx.stroke();

    }

}