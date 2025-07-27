//drawPlayers.js
export default function Print(ctx, players, self, bullets = []) {
    ctx.clearRect(0, 0, 1080, 720);

    for (const player in players) {
        ctx.beginPath();

        ctx.arc(players[player].x, players[player].y, players[player].size, 0, Math.PI * 2);

        if (player === self) ctx.fillStyle = "blue";
        else ctx.fillStyle = "red";

        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    ctx.fillStyle = "green"
    bullets.forEach(bullet => {
        const { x, y, size } = bullet;

        ctx.beginPath();

        ctx.strokeRect(x, y, size, size)

        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    });
}