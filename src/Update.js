//Update.js
module.exports = function Update(io, players) {
    for (const id in players) {

        switch (players[id].direction) {
            case "up": players[id].Up(); break;
            case "right": players[id].Right(); break;
            case "down": players[id].Down(); break;
            case "left": players[id].Left(); break;

            case "upright": players[id].UpRight(); break;
            case "upleft": players[id].UpLeft(); break;

            case "rightdown": players[id].RightDown(); break;
            case "downleft": players[id].DownLeft(); break;
            default: continue
        }

    }
    io.emit("update", players);
}