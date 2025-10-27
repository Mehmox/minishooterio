const strokeLineWidth = 2;
const strokeFilling = strokeLineWidth / 2;

export default function drawBody({ session }, canvas, x, y, playerVisualSize, color, lock) {

    canvas.fillStyle = color;

    canvas.beginPath();

    canvas.arc(x, y, playerVisualSize - strokeFilling * session.scale, 0, Math.PI * 2);

    if (lock) console.log(x, y, playerVisualSize, canvas.width, canvas.height);

    canvas.fill();

    canvas.save();

    canvas.strokeStyle = "black";

    canvas.lineWidth = strokeLineWidth * session.scale;

    canvas.stroke();

    canvas.restore();

    canvas.closePath();

}