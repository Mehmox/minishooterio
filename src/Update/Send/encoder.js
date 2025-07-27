//encoder.js
const Buffer_bytes = 4 + 4 + 1;//x, y, heath/isowner
const Board_bytes = 1 + 1 + 1 + 1;//kill/dead/asisst nicklength
const Buffer_size_info = 1 + 1 + 1//enemy, bullet, leaderboard number
module.exports = function encode(player, leaderBoard) {

    const enemy_Num = Object.keys(player.enemyInfo).length;
    const bullet_Num = Object.keys(player.bulletInfo).length;
    const board_Num = leaderBoard.length;

    const enemys_bytes = enemy_Num * Buffer_bytes;
    const bullets_bytes = bullet_Num * Buffer_bytes;

    const data = Buffer.alloc(Buffer_bytes + Buffer_size_info + enemys_bytes + bullets_bytes);
    const gap = Buffer_bytes + Buffer_size_info;

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

        const offset = i * Buffer_bytes + gap;

        data.writeUInt32LE(enemy.x * 1000, offset);
        data.writeUInt32LE(enemy.y * 1000, offset + 4);
        data.writeUInt8(enemy.health, offset + 8);

    });

    //bullets
    Object.values(player.bulletInfo).forEach((bullet, i) => {

        const offset = i * Buffer_bytes + gap + enemys_bytes;

        data.writeInt32LE(bullet.x * 1000, offset);
        data.writeInt32LE(bullet.y * 1000, offset + 4);
        data.writeUInt8(bullet.isowner, offset + 8);

    });

    leaderBoard.forEach((player, i) => {



    });

    return data;

}
/*
player
    enemyInfoLength
    bulletInfoLength
    x, y, health, 

        enemyInfo:
            x, y, health
            x, y, health
        
        bulletInfo:
            x, y, isowner
            x, y, isowner
    
    pe_length=1,
    pb_length=1,
    p_x = 4, p_y = 4, p_health = 1, 
        pe_x = 4, pe_y = 4, pe_health = 1
        pb_x = 4, pb_y = 4, pb_isowner = 1

*/