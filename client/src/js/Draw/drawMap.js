import lerp from "../core/Lerp";

export default function drawMap(ctx, map, { prev, next }, bg, { size, pov }, t) {

    const x = lerp.use(prev.x, next.x, t);
    const y = lerp.use(prev.y, next.y, t);

    ctx.lineWidth = 30;
    ctx.fillStyle = "blue";

    ctx.clearRect(0, 0, map.width, map.height);

    //draw client
    ctx.beginPath();

    ctx.arc(x, y, size * 3, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = bg ? "White" : "Black";

    const povLineStart = {
        x: x - pov.width / 2,
        y: y - pov.height / 2
    }
    //draw pov
    ctx.beginPath();

    ctx.moveTo(povLineStart.x, povLineStart.y);
    ctx.lineTo(povLineStart.x + pov.width, povLineStart.y);
    ctx.lineTo(povLineStart.x + pov.width, povLineStart.y + pov.height);
    ctx.lineTo(povLineStart.x, povLineStart.y + pov.height);

    ctx.closePath();
    ctx.stroke();

}