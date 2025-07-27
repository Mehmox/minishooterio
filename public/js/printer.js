//printer.js
export default function Print(ctx, canvas, player, players) {
    ctx.clearRect(0, 0, player.pov.width, player.pov.height);

    canvas.style.backgroundPosition = `-${players[player.self].position.x}px -${players[player.self].position.y}px`;

    const originX = players[player.self].position.x - player.pov.width / 2;
    const originY = players[player.self].position.y - player.pov.height / 2;

    for (const enemie in players[player.self].enemieInfo) {
        const canvasPosX = players[player.self].enemieInfo[enemie].position.x - originX;
        const canvasPosY = players[player.self].enemieInfo[enemie].position.y - originY;

        ctx.beginPath();

        ctx.arc(canvasPosX, canvasPosY, players[player.self].enemieInfo[enemie].size, 0, Math.PI * 2);
        ctx.fillStyle = "red";

        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    //draw player.self
    ctx.beginPath();

    ctx.arc(player.pov.width / 2, player.pov.height / 2, players[player.self].size, 0, Math.PI * 2);
    ctx.fillStyle = "blue";

    ctx.fill();
    ctx.closePath();
    ctx.stroke();


    ctx.fillStyle = "green"
    for (const bullet of players[player.self].bullets) {
        ctx.beginPath();

        ctx.fillRect(bullet.position.x, bullet.position.y, bullet.size, bullet.size)

        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}