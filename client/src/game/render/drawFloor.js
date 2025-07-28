export default function drawFloor(ctx, system, lerpX, lerpY, bg) {

    ctx.lineWidth = system.lineWidth;
    ctx.strokeStyle = bg ? "White" : "Black";

    ctx.beginPath();

    for (let i = -(lerpY % 1000); i <= window.innerHeight; i += system.lineGap) {

        ctx.moveTo(0, i);

        ctx.lineTo(window.innerWidth, i);

    }

    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();

    for (let i = -(lerpX % 1000); i <= window.innerWidth; i += system.lineGap) {

        ctx.moveTo(i, 0);

        ctx.lineTo(i, window.innerHeight);

    }

    ctx.closePath();
    ctx.stroke();

}