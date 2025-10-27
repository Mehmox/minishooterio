export default function aLerp(a, b, t) {
    let diff = b - a;

    if (diff > Math.PI) diff -= 2 * Math.PI; else
    if (diff < -Math.PI) diff += 2 * Math.PI;

    return a + diff * t;
}
