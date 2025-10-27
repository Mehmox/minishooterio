export default class SessionState {

    constructor(root) {

        this.root = root;
        this.pov = { width: 1920, height: 925 };
        this.clear();

    }

    set(id, settings, nick, delta) {

        this.snapshotMs = delta;

        this.instance_id = id;
        this.nick = nick;
        this.fireRate = null;

        this.bulletVisualSize = settings.bullet.size;
        this.bulletCollisionSize = settings.bullet.size;

        this.playerCollisionSize = settings.player.size;

        this.scale = 1 / window.devicePixelRatio;

    }

    clear() {

        this.snapshotMs = 0;
        this.lastSnapshotTime = 0;
        this.animationFrameId = 0;
        this.floorLineSize = 0.4;
        this.floorLineSpacing = 30;

        this.instance_id = null;
        this.nick = null;
        this.fireRate = null;

        this.snapshotMs = null;
        this.lastSnapshotReceivedAt = null;

        this.bulletCollisionSize = null;

        this.playerCollisionSize = null;

        this.scale = null;
        
    }

}