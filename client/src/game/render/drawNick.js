export default function drawNick(ctx, x, y, size, nick, bg) {

    ctx.font = "33px Arial";
    ctx.fillStyle = bg ? "White" : "Black";
    ctx.textAlign = "center";

    ctx.beginPath();

    if (nick) {
        ctx.fillText(nick, x, y - size * 1.3);
        ctx.strokeText(nick, x, y - size * 1.3);
    }

    ctx.closePath();
    ctx.stroke();

}