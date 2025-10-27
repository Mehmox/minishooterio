const HatSprite = new Image();
HatSprite.src = '/assets/agentHat.png';

export default function drawMuzzle(canvas, x, y, size) {
    if (!HatSprite.complete) return;

    const width = size * 3.5;
    const height = size * 3;

    canvas.beginPath();

    canvas.drawImage(HatSprite, x - size * 1.74, y - size * 2.25, width, height);

    canvas.closePath();

}