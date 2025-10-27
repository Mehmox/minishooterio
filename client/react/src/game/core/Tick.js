import StateManager from "../state/StateManager.js";
import drawGame from "../render/drawGame.js";

export default function tickLoop() {

    const { client, session } = StateManager;

    function Update() {

        client.direction = "";

        if (client.KeyW) client.direction += "Up";
        if (client.KeyA) client.direction += "Left";
        if (client.KeyS) client.direction += "Down";
        if (client.KeyD) client.direction += "Right";

        const now = performance.now();

        const t = Math.min(1, (now - session.lastSnapshotReceivedAt) / session.snapshotMs);
        // console.log("rendering!");
        drawGame(t);

        // if (StateManager.Development) setTimeout(Update, 1000 / 1); else
        session.animationFrameId = requestAnimationFrame(Update);

    }

    Update();

}