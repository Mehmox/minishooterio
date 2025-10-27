class StartupGate {

    constructor(root, checks = 2) {

        this.root = root;
        this.checks = checks;
        this.clear(checks);

    }

    set(func) {

        this.func = func;

    }

    check(promisId) {

        if (!this.RESOLVES[promisId - 1]) return;

        this.RESOLVES[promisId - 1]();

    }

    clear() {

        this.PROMISES = [];

        this.RESOLVES = [];

        for (let i = 0; i < this.checks; i++) {

            this.PROMISES.push(new Promise((res) => {

                this.RESOLVES.push(res);

            }));

        }

        Promise.all(this.PROMISES).then(() => this.func());

    }

}

export default StartupGate;