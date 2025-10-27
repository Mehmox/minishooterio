import snapshotManager from "../snapshot/snapshotManager.js";

export default function socketListeners(StateManager) {

    const { react, session, gate } = StateManager;

    const loginHandler = ({ id, settings, nick, delta }) => {

        session.set(id, settings, nick, delta);

        react.refs.gameRef.current.width = window.innerWidth;
        react.refs.gameRef.current.height = window.innerHeight;

        react.refs.mapRef.current.width = settings.map.width;
        react.refs.mapRef.current.height = settings.map.height;

        gate.check(1);

    };

    const tickHandler = (newSnapshot) => {

        session.lastSnapshotReceivedAt = performance.now();

        snapshotManager.on(newSnapshot);

        react.uiRefs.bytes.current.innerText = `Packets: ${newSnapshot.byteLength} bytes`;

        gate.check(2);

    };

    react.socket.once("login", loginHandler);
    react.socket.on("tick", tickHandler);

    return () => {
        react.socket.off("login", loginHandler);
        react.socket.off("tick", tickHandler);
    }

}