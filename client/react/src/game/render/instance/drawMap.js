import StateManager from "../../state/StateManager.js";
import drawPlayer from "./player/drawPlayer.js";
import lerp from "../../utils/Lerp.js";
import aLerp from "../../utils/aLerp.js";
const selfColor = "rgb(0,170,255)";
const selfHeatlhColor = "green";

export default function drawMap(prev, next, t) {
    const { react, session } = StateManager;

    const mapCtx = react.refs.mapCtx;
    const map = react.refs.mapRef.current;
    const pov = session.pov;
    const fgColor = react.fgColor;

    const playerVisualSize = session.playerCollisionSize * session.scale;

    const self = prev.has(session.instance_id) ? prev.get(session.instance_id) : next.get(session.instance_id);
    const selfEnd = next.get(session.instance_id);

    const angle = aLerp(self.angle, selfEnd.angle, t);

    const x = lerp(self.x, selfEnd.x, t);
    const y = lerp(self.y, selfEnd.y, t);

    mapCtx.clearRect(0, 0, map.width, map.height);

    mapCtx.lineWidth = 60 * session.scale;
    mapCtx.fillStyle = "blue";

    //draw self
    drawPlayer(StateManager, mapCtx, x, y, playerVisualSize, angle, self, fgColor, selfColor, selfHeatlhColor, true);

    mapCtx.strokeStyle = fgColor;

    const povLineStart = {
        x: x - pov.width / 2,
        y: y - pov.height / 2
    }
    //draw pov
    mapCtx.beginPath();

    mapCtx.moveTo(povLineStart.x, povLineStart.y);
    mapCtx.lineTo(povLineStart.x + pov.width, povLineStart.y);
    mapCtx.lineTo(povLineStart.x + pov.width, povLineStart.y + pov.height);
    mapCtx.lineTo(povLineStart.x, povLineStart.y + pov.height);

    mapCtx.closePath();
    mapCtx.stroke();

}