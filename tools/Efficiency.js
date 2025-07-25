//tools/Efficiency.js
module.exports = class name {

    constructor() {

        this.startEnd = 0;

        this.start = undefined;
        this.end = undefined;

    }

    format(number) {

        if (number < 10) return `  ${number}`;

        if (number < 100) return ` ${number}`;

        return number;

    }

    now() {

        if (this.startEnd % 2 === 0) {

            this.start = performance.now();

        } else {

            this.end = performance.now();

            if (this.startEnd % 21 === 0) console.log(`${(this.end - this.start).toFixed(4)}ms!`);

        }

        this.startEnd++;

    }

}
