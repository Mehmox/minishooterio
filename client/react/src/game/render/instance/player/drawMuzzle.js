import StateManager from "../../../state/StateManager.js";

const HandSprite = new Image();
HandSprite.src = '/assets/greymuzle.png';

export default function drawMuzzle(canvas, x, y, height, angle) {

    if (!HandSprite.complete) return;

    const width = height * 2;

    canvas.beginPath();

    canvas.save();
    canvas.translate(x, y);
    canvas.rotate(angle);

    canvas.drawImage(HandSprite, width / 3, -height / 5, width, height);

    canvas.restore();

    if (StateManager.Development) {
        canvas
    }

    canvas.closePath();

}