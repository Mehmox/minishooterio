//src/class/Efficiency.js

module.exports = class name {

    constructor(config = { log_Mode: "log" }, test_Time = 2) {

        this.config = config;

        this.startEnd = 0;

        this.start = undefined;
        this.end = undefined;

        this.second = { value: 0 };

        this.passed_second = 0;

        this.test_Time = { value: test_Time };

        this.second_Log = [];
        this.results = [];

    }

    format(number) {

        if (number < 10) return `  ${number}`;

        if (number < 100) return ` ${number}`;

        return number;

    }

    now() {

        switch (this.config.log_Mode) {
            case "linear":
                if (this.startEnd % 2 === 0) {

                    this.start = performance.now();

                } else {

                    this.end = performance.now();

                    if (this.startEnd % 21 === 0) console.log(`${(this.end - this.start).toFixed(4)}ms!`);

                }
                break;
            case "log":
                if (this.second.value <= this.test_Time.value) {

                    if (this.startEnd % 2 === 0) {

                        this.start = performance.now();

                    } else {

                        this.end = performance.now();

                        this.second_Log.push(this.end - this.start)

                        if (this.second.value !== this.passed_second) {

                            this.passed_second = this.second.value;

                            this.results.push(this.second_Log);

                            this.second_Log = [];

                        }

                    }

                }

                if (this.startEnd === 0) {

                    let last_update = 0;
                    const second = this.second;
                    const test_Time = this.test_Time.value;
                    const results = this.results;

                    function Every_Second() {

                        if (second.value <= test_Time) {

                            second.value++;

                        } else {
                            // console.log(this.results[0])

                            let secondTotal = 0;

                            results.forEach((secondData, second_index) => {

                                console.log(`\n\nbetween ${second_index}-${second_index + 1} seconds:`);

                                secondData.forEach((currentTickData, tick_index) => {

                                    // let body = `\ttick: ${this.format(tick_index)}-${this.format(tick_index + 1)}     `;

                                    // console.log(body + currentTickData + "ms");

                                    secondTotal += currentTickData;

                                });

                                console.log(`Avarage: ${secondTotal / secondData.length}.`);

                                secondTotal = 0;

                            });

                            second.value++;

                        };

                    }

                    function Check() {

                        const now = performance.now();

                        if (now - last_update >= 1000) {

                            Every_Second();

                            last_update = now;

                        }


                        if (second.value <= test_Time + 1) {

                            setImmediate(() => Check());

                        }

                    }

                    Check();

                }
                break;
        }

        this.startEnd++;

    }
}
