import fs from "fs";
import markDirty from "../utils/markDirty.js";
const game_settings = JSON.parse(fs.readFileSync("./game_settings.json", "utf8"));
const ENV = process.env.NODE_ENV;

const { width, height } = game_settings.map;

export default function Respawn(player) {

    switch (ENV) {

        case "production":
            player.x = Math.random() * (width - player.size) + player.size;
            player.y = Math.random() * (height - player.size) + player.size;
            break;

        case "test":
        default:
            player.x = width / 2 - player.size;
            player.y = height / 2 - player.size;
            break;

    }

    markDirty(player, "x");
    markDirty(player, "y");

}