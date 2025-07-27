
import Constants from "../../shared/Constants";

const { nicklength,
    Buffer_size_info,
    player_bytes,
    enemy_bytes,
    bullet_bytes,
    board_bytes } = Constants;

const leaderBoard = {};

export default function decode(Buffer) {

    const data = new DataView(Buffer);

    let player = { x: undefined, y: undefined, health: undefined, enemyInfo: [], bulletInfo: [], leaderBoard };

    const enemy_Num = data.getUint8(0);
    const bullet_Num = data.getUint8(1);
    const board_Num = data.getUint8(2);

    const gap = Buffer_size_info + player_bytes;

    //self
    player.x = data.getUint32(3, true) / 1000;
    player.y = data.getUint32(7, true) / 1000;
    player.health = data.getUint8(11);

    //enemys
    for (let i = 0; i < enemy_Num; i++) {

        const offset = gap + i * enemy_bytes;

        player.enemyInfo.push({
            x: data.getUint32(offset, true) / 1000,
            y: data.getUint32(offset + 4, true) / 1000,
            health: data.getUint8(offset + 8),
            nick: new TextDecoder("utf-8").decode(new Uint8Array(data.buffer, offset + 10, data.getUint8(offset + 9)))
        });

    }

    //bullets
    for (let i = 0; i < bullet_Num; i++) {

        const offset = gap + enemy_Num * enemy_bytes + i * bullet_bytes;

        player.bulletInfo.push({
            x: data.getInt32(offset, true) / 1000,
            y: data.getInt32(offset + 4, true) / 1000,
            isowner: data.getUint8(offset + 8)
        });

    }

    //leaders
    for (let i = 0; i < board_Num; i++) {

        const offset = gap + enemy_Num * enemy_bytes + bullet_Num * bullet_bytes + i * board_bytes;

        player.leaderBoard[i] = {
            kill: data.getUint8(offset),
            dead: data.getUint8(offset + 1),
            assist: data.getUint8(offset + 2),
            nick: new TextDecoder("utf-8").decode(new Uint8Array(data.buffer, offset + 4, data.getUint8(offset + 3)))
        };

    }

    return player;

}