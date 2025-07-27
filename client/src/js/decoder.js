//decoder.js
const Buffer_bytes = 4 + 4 + 1;//x, y, heath/isowner
const Board_bytes = 1 + 1 + 1 + 1;//kill/dead/asisst nicklength
const Buffer_size_info = 1 + 1 + 1//enemy, bullet, leaderboard number
export default function decode(Buffer) {

    const data = new DataView(Buffer);

    var player = { x: undefined, y: undefined, health: undefined, enemyInfo: [], bulletInfo: [] };

    const enemy_Num = data.getUint8(0);
    const bullet_Num = data.getUint8(1);
    const board_Num = data.getUint8(2);

    const gap = Buffer_bytes + Buffer_size_info;

    //self
    player.x = data.getUint32(3, true) / 1000;
    player.y = data.getUint32(7, true) / 1000;
    player.health = data.getUint8(11);

    //enemys
    for (let i = 0; i < enemy_Num; i++) {

        const offset = i * Buffer_bytes + gap;

        player.enemyInfo.push({
            x: data.getUint32(offset, true) / 1000,
            y: data.getUint32(offset + 4, true) / 1000,
            health: data.getUint8(offset + 8)
        });

    }

    //bullets
    for (let i = 0; i < bullet_Num; i++) {

        const offset = i * Buffer_bytes + gap + enemy_Num * Buffer_bytes;

        player.bulletInfo.push({
            x: data.getInt32(offset, true) / 1000,
            y: data.getInt32(offset + 4, true) / 1000,
            isowner: data.getUint8(offset + 8)
        });

    }

    return player;

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