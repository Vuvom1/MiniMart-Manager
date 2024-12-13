type IntervalCallback = (timeLeft: number) => void;

class Interval {
    private endTime: Date;
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private callback: IntervalCallback;

    constructor(endTime: Date, callback: IntervalCallback) {
        this.endTime = endTime;
        this.callback = callback;
    }

    start() {
        this.stop(); 
        this.intervalId = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = this.endTime.getTime() - now;

            if (timeLeft <= 0) {
                this.stop();
                this.callback(0);
            } else {
                this.callback(timeLeft);
            }
        }, 100);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset(newEndTime: Date) {
        this.endTime = newEndTime;
        this.start();
    }
}

export default Interval;