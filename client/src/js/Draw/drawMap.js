//drawMap.js

export default function drawMap(ctx, map, { x, y }, { size, pov }) {

    ctx.fillStyle = "blue";

    ctx.clearRect(0, 0, map.width, map.height);

    //draw client
    ctx.beginPath();

    ctx.arc(x, y, size, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();
    ctx.stroke();


    const povLineStart = {
        x: x - pov.width / 2,
        y: y - pov.height / 2
    }

    ctx.lineWidth = 25;
    //draw pov
    ctx.beginPath();

    ctx.moveTo(povLineStart.x, povLineStart.y);
    ctx.lineTo(povLineStart.x + pov.width, povLineStart.y);
    ctx.lineTo(povLineStart.x + pov.width, povLineStart.y + pov.height);
    ctx.lineTo(povLineStart.x, povLineStart.y + pov.height);

    ctx.closePath();
    ctx.stroke();

}