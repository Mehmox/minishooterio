import StateManager from '../state/StateManager.js';
import socketListeners from "./socketListeners.js"

import Tick from './Tick.js';
import Listeners from "../input/listeners.js";
import { Inputs, Ack } from "./Timers.js";

export default function initClient(props) {

    props.refs.gameCtx = props.refs.gameRef.current.getContext("2d");
    props.refs.mapCtx = props.refs.mapRef.current.getContext("2d");

    console.log(StateManager);

    StateManager.gate.set(Tick);

    StateManager.react = { ...StateManager.react, ...props };

    const clearSocketListeners = socketListeners(StateManager);

    const clearInputInterval = Inputs(StateManager);

    const clearPingInterval = Ack(StateManager);

    const clearListener = Listeners(StateManager);

    return () => {
        
        cancelAnimationFrame(StateManager.session.animationFrameId);

        clearSocketListeners();
        clearInputInterval();
        clearPingInterval();
        clearListener();

        StateManager.clear();

        console.log("Client cleared!");

    }

}