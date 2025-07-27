//printerGame.js

import SetBullet from "./bullets.js";
import SetEnemies from "./enemies.js";

export default function PrintGame(ctx, canvas, players, client) {

    const self = players[client.self];

    ctx.clearRect(0, 0, client.pov.width, client.pov.height);

    canvas.style.backgroundPosition = `-${self.position.x}px -${self.position.y}px`;

    const origin = {
        x: self.position.x - client.pov.width / 2,
        y: self.position.y - client.pov.height / 2
    }

    SetBullet(ctx, origin, client.self, self.bulletInfo);

    SetEnemies(ctx, origin, self.enemieInfo);

    //draw client
    ctx.fillStyle = "blue";
    ctx.beginPath();

    ctx.arc(client.pov.width / 2, client.pov.height / 2, self.stats.size, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();
    ctx.stroke();

}