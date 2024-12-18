class TimeUtil {
    static getCurrentTime() {
        return new Date().toLocaleTimeString();
    }

    static getCurrentDate() {
        return new Date().toLocaleDateString();
    }

    static getTimestamp() {
        return new Date().getTime();
    }

    static formatDate(date, format) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    static formatTime(date, format) {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleTimeString(undefined, options);
    }
    static isTimeGreaterThan(time1, time2) {
        const [hours1, minutes1] = time1.split(':').map(Number);
        const [hours2, minutes2] = time2.split(':').map(Number);

        if (hours1 > hours2) return true;
        if (hours1 === hours2 && minutes1 > minutes2) return true;
        return false;
    }
}

module.exports = TimeUtil;