const strokeLineWidth = 2;

export default function drawHealth({ session }, canvas, x, y, size, health, color) {

    canvas.fillStyle = color;

    canvas.beginPath();

    canvas.fillRect(x - size * 1.3, y + size * 1.1, size * 2 * 1.3 / 100 * health, size / 2.5);

    canvas.fill();

    canvas.save();

    canvas.strokeStyle = "black";

    canvas.lineWidth = strokeLineWidth * session.scale;

    canvas.strokeRect(x - size * 1.3, y + size * 1.1, size * 2 * 1.3, size / 2.5);

    canvas.restore();

    canvas.closePath();
    canvas.stroke();

}

