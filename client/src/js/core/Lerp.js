class Lerp {

    constructor() {
        this.isOn = false;
    }

    set() {
        this.isOn = !this.isOn;
    }

    use(start, end, t) {
        if (this.isOn) return start + (end - start) * t;
        else return end;
    }

}

export default new Lerp();