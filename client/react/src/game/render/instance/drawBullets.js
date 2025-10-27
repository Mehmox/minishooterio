import StateManager from "../../state/StateManager.js";
import lerp from "../../utils/lerp.js";

const strokeLineWidth = 2;
const strokeFilling = strokeLineWidth / 2;

export default function drawBullets(canvasStart, prev, next, t) {
    
    const { react, session } = StateManager;

    const gameCtx = react.refs.gameCtx;

    const bulletVisualSize = session.bulletCollisionSize * session.scale;

    prev.forEach((bullet, instance_id) => {
        if (bullet.type !== "Bullet") return;

        const bulletEnd = next[instance_id] ? next[instance_id] : bullet;

        const normalizedPostX = lerp(bullet.x, bulletEnd.x, t) - canvasStart.x;
        const normalizedPostY = lerp(bullet.y, bulletEnd.y, t) - canvasStart.y;

        gameCtx.beginPath();

        gameCtx.arc(normalizedPostX, normalizedPostY, bulletVisualSize - strokeFilling * session.scale, 0, Math.PI * 2);

        if (bullet.isowner) gameCtx.fillStyle = "green";
        else gameCtx.fillStyle = "red";

        gameCtx.fill();

        gameCtx.save();

        gameCtx.lineWidth = strokeLineWidth * session.scale;

        gameCtx.stroke();

        gameCtx.restore();

        gameCtx.closePath();

    });

}