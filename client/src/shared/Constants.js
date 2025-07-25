const nicklength = 9;
const Buffer_size_info = 1 + 1 + 1//enemy number, bullet number, leaderboard number
const player_bytes = 4 + 4 + 1;//x, y, heath_percent
const enemy_bytes = 4 + 4 + 1 + 1 + nicklength;//x, y, heath_percent, nicklength, nick
const bullet_bytes = 4 + 4 + 1;//x, y, isowner
const board_bytes = 1 + 1 + 1 + 1 + nicklength;//kill, dead, asisst, nicklength, nick

module.exports = {
    nicklength,
    Buffer_size_info,
    player_bytes,
    enemy_bytes,
    bullet_bytes,
    board_bytes
};