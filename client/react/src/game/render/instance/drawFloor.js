import StateManager from "../../state/StateManager.js";

export default function drawFloor(lerpX, lerpY) {
    const { react, session } = StateManager;

    const gameCtx = react.refs.gameCtx;

    const floorLineSize = session.floorLineSize * session.scale;
    const floorLineSpacing = session.floorLineSpacing * session.scale;

    gameCtx.lineWidth = floorLineSize;
    gameCtx.strokeStyle = react.fgColor;

    gameCtx.beginPath();

    for (let i = -lerpY; i <= window.innerHeight; i += floorLineSpacing) {

        gameCtx.moveTo(0, i);

        gameCtx.lineTo(window.innerWidth, i);

    }

    gameCtx.closePath();
    gameCtx.stroke();

    gameCtx.beginPath();

    for (let i = -lerpX; i <= window.innerWidth; i += floorLineSpacing) {

        gameCtx.moveTo(i, 0);

        gameCtx.lineTo(i, window.innerHeight);

    }

    gameCtx.closePath();
    gameCtx.stroke();

}