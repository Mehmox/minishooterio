import lerp from "../core/Lerp";

export default function drawBullet(ctx, origin, { prev, next }, user, t) {

    ctx.lineWidth = 1;

    prev.bulletInfo.forEach((bullet, index) => {

        const canvasBulletPos = {
            x: lerp.use(bullet.x, next.bulletInfo[index] ? next.bulletInfo[index].x : bullet.x, t) - origin.x,
            y: lerp.use(bullet.y, next.bulletInfo[index] ? next.bulletInfo[index].y : bullet.y, t) - origin.y,
        }

        ctx.beginPath();

        ctx.arc(canvasBulletPos.x, canvasBulletPos.y, user.bulletsize, 0, Math.PI * 2);

        if (bullet.isowner) ctx.fillStyle = "green";
        else ctx.fillStyle = "red";

        ctx.fill();
        ctx.closePath();

    });

}