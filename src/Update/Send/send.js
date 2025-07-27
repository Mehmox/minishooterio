const encode = require("./encoder");
let j = 0;
module.exports = function send(io, Game) {

    var GameBuffer = {};

    //encoding clients datas
    const test = Object.entries(Game.players);
    test.forEach(res => {

        const id = res[0];
        const player = res[1].compact();

        GameBuffer[id] = encode(player,Game.leaderboard);
        j++;

    });

    //sending all clients encoded data
    Object.keys(Game.players).forEach(playerID => {

        io.sockets.sockets.get(playerID).emit("tick", GameBuffer[playerID]);

    });

}