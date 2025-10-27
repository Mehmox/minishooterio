import ReactState from "./states/ReactState.js";
import GameState from "./states/GameState.js";
import SnapshotState from "./states/SnapshotState.js";
import SessionState from "./states/SessionState.js";
import ClientState from "./states/ClientState.js";
import StartupGate from '../utils/StartupGate.js';

class StateManager {

    constructor() {

        if (StateManager.instance) return StateManager.instance;
        StateManager.instance = this;

        this.Development = null;
        this.react = new ReactState(this);
        this.game = new GameState(this);
        this.snapshot = new SnapshotState(this);
        this.session = new SessionState(this);
        this.client = new ClientState(this);
        this.gate = new StartupGate(this, 3);

    }

    clear() {
        this.game.clear();
        this.snapshot.clear();
        this.session.clear();
        this.client.clear();
        this.gate.clear();
    }

}

const State = new StateManager();

export default State;