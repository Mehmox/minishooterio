const strokeLineWidth = 2;

export default function drawNick({ session }, canvas, x, y, size, nick, fgColor) {
    if (!nick) return;

    canvas.font = `${size * 1.3}px Arial`;
    canvas.fillStyle = fgColor;
    canvas.textAlign = "center";

    canvas.beginPath();

    canvas.fillText(nick, x, y - size * 1.7);

    canvas.save();

    canvas.lineWidth = strokeLineWidth * session.scale;

    canvas.strokeText(nick, x, y - size * 1.7);

    canvas.restore();

    canvas.closePath();
    canvas.stroke();

}