//client/src/js/Draw/drawFloor.js
export default function drawFloor(type, ctx, { width, height }, { x, y }) {

    ctx.lineWidth = (type === "Game" ? 0.1 : 100);

    ctx.beginPath();

    for (let i = (type === "Game" ? -(y % 1000) : 0); i <= width; i += (type === "Game" ? 30 : 2000)) {

        ctx.moveTo(0, i);

        ctx.lineTo(height, i);

    }

    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();

    for (let i = (type === "Game" ? -(x % 1000) : 0); i <= height; i += (type === "Game" ? 30 : 2000)) {

        ctx.moveTo(i, 0);

        ctx.lineTo(i, width);

    }

    ctx.closePath();
    ctx.stroke();

}