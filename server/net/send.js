const encode = require("./encoder");

module.exports = function send(io, Game) {

    let GameBuffer = {};

    //encoding clients datas
    const players = Object.entries(Game.players);
    players.forEach(res => {

        const id = res[0];
        const player = res[1].serialize();

        GameBuffer[id] = encode(player, Game.leaderboard, players.length);

    });

    //sending all clients encoded data
    Object.keys(Game.players).forEach(playerID => {

        io.sockets.sockets.get(playerID).emit("tick", GameBuffer[playerID]);

    });

}