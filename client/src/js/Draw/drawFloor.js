export default function drawFloor(ctx, { width, height }, lerpX, lerpY, bg) {

    ctx.lineWidth = 0.3;
    ctx.strokeStyle = bg ? "White" : "Black";

    ctx.beginPath();

    for (let i = -(lerpY % 1000); i <= height; i += 30) {

        ctx.moveTo(0, i);

        ctx.lineTo(width, i);

    }

    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();

    for (let i = -(lerpX % 1000); i <= width; i += 30) {

        ctx.moveTo(i, 0);

        ctx.lineTo(i, height);

    }

    ctx.closePath();
    ctx.stroke();

}