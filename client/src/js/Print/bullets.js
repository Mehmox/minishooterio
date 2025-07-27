//bullets.js

export default function SetBullet(ctx, origin, selfId, bullets) {

    ctx.lineWidth = 1;

    for (const bulletId in bullets) {

        const bullet = bullets[bulletId];

        const canvasBulletPos = {
            x: bullet.position.x - origin.x,
            y: bullet.position.y - origin.y,
        }

        ctx.beginPath();

        ctx.arc(canvasBulletPos.x, canvasBulletPos.y, bullet.size, 0, Math.PI * 2);

        if (bullet.owner === selfId) ctx.fillStyle = "green";
        else ctx.fillStyle = "red";

        ctx.fill();
        ctx.closePath();
        ctx.stroke();

    }

}