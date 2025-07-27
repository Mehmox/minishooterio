module.exports = function updatePlayers(players,bullets) {

    for (const selfid in players) {

        const self = players[selfid];
        const combat = self.combat;

        if (self[self.direction]) self[self.direction]();

        if (combat.isShooting) {

            combat.AMMO_SERVER_POS = {

                x: self.position.x + (combat.AMMO_CLIENT_POS.x - self.pov.width / 2),
                y: self.position.y + (combat.AMMO_CLIENT_POS.y - self.pov.height / 2),

            }

            self.fire(bullets);

        };

    }

}