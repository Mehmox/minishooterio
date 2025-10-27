function Inputs(StateManager) {
    const socket = StateManager.react.socket;
    const client = StateManager.client;

    const inputInterval = setInterval(() => {

        socket.emit("combat", {
            isShooting: client.isShooting,
            Muzzle_Direction: client.Muzzle_Direction,
            direction: client.direction,
        });

    }, 1000 / 60);

    return () => clearInterval(inputInterval);

}

function Ack(StateManager) {
    const { react, gate } = StateManager;
    const socket = react.socket;
    const pingDiv = react.uiRefs.ping.current;
    const playerDiv = react.uiRefs.playerCount.current;

    const ackInterval = setInterval(() => {

        const now = performance.now();

        socket.emit("ping", ({ playerCount, playerLimit }) => {

            const end = performance.now();

            pingDiv.innerText = `Ping: ${Math.ceil((end - now) / 2)} ms`;
            playerDiv.innerText = `${playerCount}/${playerLimit}`;

        });

        gate.check(3);

    }, 1000);

    return () => clearInterval(ackInterval);

}

export { Inputs, Ack };