module.exports = function Log(player, socket, message) {
    console.log(`"${player.nick.length > 0 ? player.nick : undefined}"[#${socket.id}]#${player.id} ${message}.`)
}