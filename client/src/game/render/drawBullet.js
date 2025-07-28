import lerp from "../utils/Lerp.js";
const history = {
    first: [],
    second: [],
}
let triggerd = false;
export default function drawBullet(ctx, origin, { prev, next }, user, t) {

    ctx.lineWidth = 1;

    for (const bulletId in prev.bulletInfo) {

        const bullet = prev.bulletInfo[bulletId];

        const x = lerp(bullet.x, next.bulletInfo[bulletId] ? next.bulletInfo[bulletId].x : bullet.x, t) - origin.x;
        const y = lerp(bullet.y, next.bulletInfo[bulletId] ? next.bulletInfo[bulletId].y : bullet.y, t) - origin.y;
        ctx.beginPath();

        ctx.arc(x, y, user.bulletsize, 0, Math.PI * 2);

        if (bullet.isowner) ctx.fillStyle = "green";
        else ctx.fillStyle = "red";

        ctx.fill();
        ctx.closePath();

    }

    // prev.bulletInfo.forEach((bullet, index) => {

    //     const x = lerp(bullet.x, next.bulletInfo[index] ? next.bulletInfo[index].x : bullet.x, t) - origin.x;
    //     const y = lerp(bullet.y, next.bulletInfo[index] ? next.bulletInfo[index].y : bullet.y, t) - origin.y;
    //     // if (index === 0) {
    //     //     if (history.first.length === 0) history.first.push({ x: x.toFixed(1), y: y.toFixed(1) })
    //     //     else history.first.push({ x: (history.first[0].x - x.toFixed(1)).toFixed(1), y: (history.first[0].y - y.toFixed(1)).toFixed(1) })
    //     // }
    //     // else {
    //     //     if (history.second.length === 0) history.second.push({ x: x.toFixed(1), y: y.toFixed(1) })
    //     //     else history.second.push({ x: (history.second[0].x - x.toFixed(1)).toFixed(1), y: (history.second[0].y - y.toFixed(1)).toFixed(1) })
    //     // }

    //     ctx.beginPath();

    //     ctx.arc(x, y, user.bulletsize, 0, Math.PI * 2);

    //     if (bullet.isowner) ctx.fillStyle = "green";
    //     else ctx.fillStyle = "red";

    //     ctx.fill();
    //     ctx.closePath();

    // });

    // if (!triggerd) {
    //     triggerd = true;
    //     Test();
    // }


}
function Test() {
    setTimeout(() => {
        console.log(history);
    }, 1000);
}
