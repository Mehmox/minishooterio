const game_settings = require("../../../game_settings.json").map;
const markDirty = require("../utils/markDirty");

module.exports = function Move(players) {

    players.forEach(player => {

        switch (player.direction) {

            case "Up": Up(player, player.speed); break;
            case "Right": Right(player, player.speed); break;
            case "Down": Down(player, player.speed); break;
            case "Left": Left(player, player.speed); break;

            case "UpRight":
                Up(player, player.crossspeed);
                Right(player, player.crossspeed); break;
            case "UpLeft":
                Up(player, player.crossspeed);
                Left(player, player.crossspeed); break;
            case "DownRight":
                Right(player, player.crossspeed);
                Down(player, player.crossspeed); break;
            case "LeftDown":
                Down(player, player.crossspeed);
                Left(player, player.crossspeed); break;

            default: break;
        }

    });

}

function Up(player, speed) {

    if (player.y - speed >= 0) {

        player.y -= speed;

        markDirty(player.id, "y", player.y);

    }


}
function Right(player, speed) {

    if (player.x + speed <= game_settings.width) {

        player.x += speed;

        markDirty(player.id, "x", player.x);

    }


}
function Down(player, speed) {

    if (player.y + speed <= game_settings.height) {

        player.y += speed;

        markDirty(player.id, "y", player.y);

    }


}
function Left(player, speed) {

    if (player.x - speed >= 0) {

        player.x -= speed;

        markDirty(player.id, "x", player.x);

    }


}