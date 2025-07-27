//drawHeatlh.js

export default function drawHealth(ctx, x, y, size, health, color) {

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.fillRect(x - size * 1.3, y + size * 1.1, size * 2 * 1.3 / 100 * health, 7);
    ctx.strokeRect(x - size * 1.3, y + size * 1.1, size * 2 * 1.3, 7);

    ctx.fill();
    ctx.closePath();
    ctx.stroke();

}