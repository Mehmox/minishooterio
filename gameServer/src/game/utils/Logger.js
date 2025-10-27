export default function Log(player, message) {
    console.log(`\n${player.nick.length > 0 ? player.nick : undefined}[#${player.id}][#${player.socket_id}] ${message}.`)
}