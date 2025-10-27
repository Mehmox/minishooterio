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
    const fgColor = react.fgColor;

    const playerVisualSize = session.playerCollisionSize * session.scale;

    const self = prev.has(session.instance_id) ? prev.get(session.instance_id) : next.get(session.instance_id);
    const selfEnd = next.get(session.instance_id);

    const angle = aLerp(self.angle, selfEnd.angle, t);

    const x = lerp(self.x, selfEnd.x, t);
    const y = lerp(self.y, selfEnd.y, t);

    mapCtx.clearRect(0, 0, map.width, map.height);

    mapCtx.lineWidth = 5;
    mapCtx.fillStyle = "blue";

    //draw self
    drawPlayer(mapCtx, x, y, playerVisualSize, angle, self, fgColor, selfColor, selfHeatlhColor, true);

    mapCtx.strokeStyle = fgColor;

    const povLineStart = {
        x: x - session.width / 2,
        y: y - session.height / 2
    }
    //draw pov
    mapCtx.beginPath();

    mapCtx.moveTo(povLineStart.x, povLineStart.y);
    mapCtx.lineTo(povLineStart.x + session.width, povLineStart.y);
    mapCtx.lineTo(povLineStart.x + session.width, povLineStart.y + session.height);
    mapCtx.lineTo(povLineStart.x, povLineStart.y + session.height);

    mapCtx.closePath();
    mapCtx.stroke();

}