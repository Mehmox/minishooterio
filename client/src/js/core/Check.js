export default class Check {

    constructor(promiseNumber = 2, func) {

        this.func = func;

        this.PROMISES = [];

        this.RESOLVES = [];

        for (let i = 0; i < promiseNumber; i++) {

            let resolve;

            this.PROMISES.push(new Promise((res) => resolve = res));

            this.RESOLVES.push(resolve);

        }

        Promise.all(this.PROMISES).then(() => this.func());

    }

    set(func) {

        this.func = func;

    }

    check(promisId) {

        if (this.RESOLVES[promisId - 1]) {

            this.RESOLVES[promisId - 1]();

        }

    }

    clear(promiseNumber = 2, func) {

        this.func = func;

        this.PROMISES = [];

        this.RESOLVES = [];

        for (let i = 0; i < promiseNumber; i++) {

            let resolve;

            this.PROMISES.push(new Promise((res) => resolve = res));

            this.RESOLVES.push(resolve);

        }

        Promise.all(this.PROMISES).then(() => this.func());

    }

}