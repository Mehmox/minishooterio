export default Efficiency;
declare class Efficiency {
    constructor(mode: any);
    timerStart: number | undefined;
    timerEnd: number | undefined;
    maxTickMs: number;
    minTPS: number;
    avg: number;
    logs: Map<any, any>;
    log: (tick: any, ms: any) => void;
    nextLog: any;
    check(currentTick: any): void;
    format(number: any): string;
}
//# sourceMappingURL=Efficiency.d.ts.map