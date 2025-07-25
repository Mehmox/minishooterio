module.exports = function updatePlayers(players, bullets) {

    Object.values(players).forEach(player => {

        const combat = player.combat;

        if (player[player.direction]) player[player.direction]();

        if (combat.isShooting) {

            combat.AMMO_SERVER_POS = {

                x: player.position.x + (combat.AMMO_CLIENT_POS.x - player.pov.width / 2),
                y: player.position.y + (combat.AMMO_CLIENT_POS.y - player.pov.height / 2),

            }

            player.fire(bullets);

        };

    });

}