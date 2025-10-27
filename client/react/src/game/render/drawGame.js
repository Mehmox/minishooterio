import StateManager from "../state/StateManager.js";
import drawFloor from "./instance/drawFloor.js";
import drawBullets from "./instance/drawBullets.js";
import drawPlayers from "./instance/drawPlayers.js";
import PrintMap from "./instance/drawMap.js";
import lerp from "../utils/lerp.js";

export default function drawGame(t) {

    const { game, session, react } = StateManager;

    const prev = game.prev;
    const next = game.next;

    const originInstanceId = session.instance_id;

    const end = next.has(originInstanceId) ? next.get(originInstanceId) : prev.get(originInstanceId);
    const start = prev.has(originInstanceId) ? prev.get(originInstanceId) : end;

    const lerpX = lerp(start.x, end.x, t);
    const lerpY = lerp(start.y, end.y, t);

    const canvasStart = {
        x: lerpX - window.innerWidth / 2,
        y: lerpY - window.innerHeight / 2
    }

    react.refs.gameCtx.clearRect(0, 0, react.refs.gameRef.current.width, react.refs.gameRef.current.height);

    drawFloor(lerpX, lerpY);

    drawBullets(canvasStart, prev, next, t);

    drawPlayers(canvasStart, prev, next, t);

    PrintMap(prev, next, t);

}