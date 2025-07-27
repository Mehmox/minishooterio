//client/src/js/Draw/drawBullet.js
export default function drawBullet(ctx, origin, bullets, user) {

    ctx.lineWidth = 1;

    bullets.forEach(bullet => {

        const canvasBulletPos = {
            x: bullet.x - origin.x,
            y: bullet.y - origin.y,
        }

        ctx.beginPath();

        ctx.arc(canvasBulletPos.x, canvasBulletPos.y, user.bulletsize, 0, Math.PI * 2);

        if (bullet.isowner) ctx.fillStyle = "green";
        else ctx.fillStyle = "red";

        ctx.fill();
        ctx.closePath();
        ctx.stroke();

    });

}