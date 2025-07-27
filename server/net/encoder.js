const {
    nicklength,
    Buffer_size_info,
    player_bytes,
    enemy_bytes,
    bullet_bytes,
    board_bytes
} = require("../../client/src/shared/Constants");

const top_player_length = 10;

module.exports = function encode(player, leaderBoard, totalPlayers) {

    const enemy_Num = Object.keys(player.enemyInfo).length;
    const bullet_Num = Object.keys(player.bulletInfo).length;
    const board_Num = totalPlayers > top_player_length ? top_player_length : totalPlayers;

    const enemys_bytes = enemy_Num * enemy_bytes;
    const bullets_bytes = bullet_Num * bullet_bytes;
    const boards_bytes = board_Num * board_bytes;

    const data = Buffer.alloc(Buffer_size_info + player_bytes + enemys_bytes + bullets_bytes + boards_bytes);
    const gap = Buffer_size_info + player_bytes;

    //enemy, bullet, leaderboard number
    data.writeUInt8(enemy_Num, 0);
    data.writeUInt8(bullet_Num, 1);
    data.writeUInt8(board_Num, 2);

    //self
    data.writeUInt32LE(player.x * 1000, 3);
    data.writeUInt32LE(player.y * 1000, 7);
    data.writeUInt8(player.health, 11);

    //enemys
    Object.values(player.enemyInfo).forEach((enemy, i) => {

        const offset = gap + i * enemy_bytes;

        data.writeUInt32LE(enemy.x * 1000, offset);
        data.writeUInt32LE(enemy.y * 1000, offset + 4);
        data.writeUInt8(enemy.health, offset + 8);
        data.writeUInt8(Buffer.from(enemy.nick).byteLength, offset + 9);
        data.write(enemy.nick, offset + 10, nicklength, "utf-8");

    });

    //bullets
    Object.values(player.bulletInfo).forEach((bullet, i) => {

        const offset = gap + enemys_bytes + i * bullet_bytes;

        data.writeInt32LE(bullet.x * 1000, offset);
        data.writeInt32LE(bullet.y * 1000, offset + 4);
        data.writeUInt8(bullet.isowner, offset + 8);

    });

    //leaderboard
    for (let i = 0; i < board_Num && i < leaderBoard.length; i++) {

        const offset = gap + enemys_bytes + bullets_bytes + i * board_bytes;

        data.writeUInt8(leaderBoard[i].KDA.kill > 255 ? 255 : leaderBoard[i].KDA.kill, offset);
        data.writeUInt8(leaderBoard[i].KDA.dead > 255 ? 255 : leaderBoard[i].KDA.dead, offset + 1);
        data.writeUInt8(leaderBoard[i].KDA.assist > 255 ? 255 : leaderBoard[i].KDA.assist, offset + 2);
        data.writeUInt8(Buffer.from(leaderBoard[i].nick).byteLength, offset + 3);
        data.write(leaderBoard[i].nick, offset + 4, nicklength, "utf-8");

    }

    return data;

}