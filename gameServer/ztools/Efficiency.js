import Log from "../../shared/Log.js";

class Efficiency {

    constructor(mode) {

        this.timerStart = undefined;
        this.timerEnd = undefined;

        this.maxTickMs = 0;
        this.minTPS = 0;
        this.avg = 0;

        this.logs = new Map();

        switch (mode) {
            default:
                this.log = (tick, ms) => {
                    Log(`Tick ${tick}:{\n \t${this.format(ms.toFixed(1))} ms!    max: ${this.format(this.maxTickMs.toFixed(1))} ms!  avg: ${this.format((this.avg / tick).toFixed(1))} ms!\n \t${this.format((1000 / ms).toFixed(1))} TPS!   min: ${this.format((this.minTPS).toFixed(1))} TPS! avg: ${this.format((1000 / (this.avg / tick)).toFixed(1))} TPS!\n}`);
                }; break;

            case "part":
                this.log = (tick, ms) => {
                    this.logs.set(this.count, ms);

                    if (tick > this.nextLog) {

                        this.nextLog = tick + this.frequency;

                        let log = "[";
                        let resultCounter = 0;
                        this.logs.forEach(data => {
                            log += `,${data}`;
                            resultCounter++;
                            if (resultCounter >= 20) {
                                Log(log);
                                log = "";
                                resultCounter = 0;
                            }
                        });
                        Log("\n");
                        this.logs.clear();
                    }
                }; break;
        }

    }

    check(currentTick) {
        if (this.timerStart) {
            this.timerEnd = performance.now();

            const delta = this.timerEnd - this.timerStart;

            if (delta > this.maxTickMs) {
                this.maxTickMs = delta;
                this.minTPS = 1000 / delta;
            }

            this.avg += delta;

            this.log(currentTick, delta);
        }

        this.timerStart = performance.now();

    }

    format(number) {
        let numStr = number.toString();
        let padding = 5 - numStr.length;
        let string = "";

        for (let i = 0; i < padding; i++) {
            string += " ";
        }

        return string + numStr;
    }


}

export default Efficiency;