export default function drawFloor(ctx, lerpX, lerpY, bg) {

    ctx.lineWidth = 0.3;
    ctx.strokeStyle = bg ? "White" : "Black";

    ctx.beginPath();

    for (let i = -(lerpY % 1000); i <= window.innerHeight; i += 30) {

        ctx.moveTo(0, i);

        ctx.lineTo(window.innerWidth, i);

    }

    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();

    for (let i = -(lerpX % 1000); i <= window.innerWidth; i += 30) {

        ctx.moveTo(i, 0);

        ctx.lineTo(i, window.innerHeight);

    }

    ctx.closePath();
    ctx.stroke();

}