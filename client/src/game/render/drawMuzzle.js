let lock = false;
export default function name(ctx, size) {

    if (!lock) {//test
        lock = !lock;
        console.log(size)
        console.log(window.devicePixelRatio)
        // setTimeout(() => {
        //     lock = false
        // }, 1000);
    }

    const x = window.innerWidth / 2 + size / 2;
    const y = window.innerHeight / 2 - size / 3;

    ctx.fillStyle = "rgb(155,155,155)";

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size, y + size / 1.5);
    ctx.lineTo(x, y + size / 1.5);
    ctx.lineTo(x, y);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

}