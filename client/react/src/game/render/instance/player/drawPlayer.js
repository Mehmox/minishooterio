import drawMuzzle from "./drawMuzzle.js";
import drawHealth from "./drawHealth.js";
import drawNick from "./drawNick.js";
import drawBody from "./drawBody.js";
import drawHat from "./drawHat.js";

export default function drawPlayer(StateManager, canvas, x, y, playerVisualSize, angle, player, fgColor, bodyColor, healthColor, lock) {

    drawMuzzle(canvas, x, y, playerVisualSize, angle);

    drawHealth(StateManager, canvas, x, y, playerVisualSize, player.health, healthColor);

    drawBody(StateManager, canvas, x, y, playerVisualSize, bodyColor, lock);

    drawHat(canvas, x, y, playerVisualSize);

    drawNick(StateManager, canvas, x, y, playerVisualSize, player.nick, fgColor);

}