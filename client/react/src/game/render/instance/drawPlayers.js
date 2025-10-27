import StateManager from "../../state/StateManager.js";
import drawPlayer from "./player/drawPlayer.js";
import lerp from "../../utils/lerp.js";
import aLerp from "../../utils/aLerp.js";
const enemyColor = "red";
const enemyHeatlhColor = "red";
const selfColor = "rgb(36, 167, 161)";
const selfHeatlhColor = "green";

export default function drawPlayers(canvasStart, prev, next, t) {

    const { react, session } = StateManager;

    const gameCtx = react.refs.gameCtx;

    const fgColor = react.fgColor;

    const playerVisualSize = session.playerCollisionSize * session.scale;

    //draw enemys
    prev.forEach((player, instance_id) => {
        if (player.type !== "Player" || instance_id === session.instance_id) return;

        const playerEnd = next[instance_id] ? next[instance_id] : player;

        const normalizedPostX = lerp(player.x, playerEnd.x, t) - canvasStart.x;
        const normalizedPostY = lerp(player.y, playerEnd.y, t) - canvasStart.y;

        const angle = aLerp(player.angle, playerEnd.angle, t);

        drawPlayer(StateManager, gameCtx, normalizedPostX, normalizedPostY, playerVisualSize, angle, player, fgColor, enemyColor, enemyHeatlhColor);

    });

    //draw self
    const self = prev.has(session.instance_id) ? prev.get(session.instance_id) : next.get(session.instance_id);
    const selfEnd = next.get(session.instance_id);

    const angle = aLerp(self.angle, selfEnd.angle, t);

    drawPlayer(StateManager,    gameCtx, window.innerWidth / 2, window.innerHeight / 2, playerVisualSize, angle, self, fgColor, selfColor, selfHeatlhColor);

}