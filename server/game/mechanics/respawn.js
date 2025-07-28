const ENV = process.env.ENV;
const { width, height } = require("../../../game_settings.json").map;

module.exports = function Respawn(player) {

    switch (ENV) {

        case "production":
            player.x = Math.random() * (width - player.size) + player.size;
            player.y = Math.random() * (height - player.size) + player.size;
            break;

        case "test":
        default:
            player.x = 3000;
            player.y = 3000;
            break;

    }

}