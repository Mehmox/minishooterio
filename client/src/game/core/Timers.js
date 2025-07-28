function Inputs(socket, user) {

    return setInterval(() => {

        socket.emit("combat", { isShooting: user.combat.isShooting, Muzzle_Direction: user.combat.Muzzle_Direction, direction: user.movement.direction, angle: user.combat.angle });

    }, 1000 / 20);

}

function Ping(socket, data) {

    return setInterval(() => {

        const now = performance.now();

        socket.emit("ping", () => {

            const end = performance.now();

            data.ping.current.innerText = `Ping: ${Math.ceil((end - now) / 2)} ms`;

        });

    }, 400);

}

export { Inputs, Ping }