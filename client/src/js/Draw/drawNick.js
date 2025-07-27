//client/src/js/Draw/drawNick.js
export default function drawNick(ctx, x, y, size, nick) {

    ctx.font = "41px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    ctx.beginPath();

    if (nick) {
        ctx.fillText(nick, x, y - size * 1.3);
        ctx.strokeText(nick, x, y - size * 1.3);
    }

    ctx.closePath();
    ctx.stroke();

}