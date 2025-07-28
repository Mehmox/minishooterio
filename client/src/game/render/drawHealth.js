export default function drawHealth(ctx, x, y, size, health, color) {

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.fillRect(x - size * 1.3, y + size * 1.1, size * 2 * 1.3 / 100 * health, size / 3);
    ctx.strokeRect(x - size * 1.3, y + size * 1.1, size * 2 * 1.3, size / 3);

    ctx.fill();
    ctx.closePath();
    ctx.stroke();

}