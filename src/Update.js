//Update.js
const is_In_Pov = require("./inPov");
let counter = 0;

module.exports = function Update(io, Game, ENV) {

    for (const id in Game.players) {

        switch (Game.players[id].direction) {
            case "up": Game.players[id].Up(); break;
            case "right": Game.players[id].Right(); break;
            case "down": Game.players[id].Down(); break;
            case "left": Game.players[id].Left(); break;

            case "upright": Game.players[id].UpRight(); break;
            case "upleft": Game.players[id].UpLeft(); break;

            case "rightdown": Game.players[id].RightDown(); break;
            case "downleft": Game.players[id].DownLeft(); break;
        }

        Game.players[id].enemieInfo = {}

        for (const enemie in Game.players) {
            if (id !== enemie && is_In_Pov(Game.players[id], Game.players[enemie])) {
                Game.players[id].enemieInfo[enemie] = {
                    x: Game.players[enemie].x,
                    y: Game.players[enemie].y,
                    size: Game.players[enemie].size
                }
            } else delete Game.players[id].enemieInfo[enemie];
        }

        // if (ENV !== "pro") {
        //     counter++
        //     if (counter % 60 === 0) {
        //         console.log("\n\n\n\n")
        //         console.log(Game.players)
        //     }
        // }

        counter++
        if (counter % 60 === 0) {
            for (const bullet of Game.players[id].bullets) {
                bullet.position.x += bullet.speed;
                if (is_In_Pov(Game, id, bullet)) {
                    Game.players[id].enemieInfo[enemie] = {
                        x: Game.players[enemie].x,
                        y: Game.players[enemie].y,
                        size: Game.players[enemie].size
                    }
                } else delete Game.players[id].enemieInfo[enemie];
            }
        }

    }

    io.emit("update", Game);
}