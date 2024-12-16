class DateUtil {
    static getCurrentDate() {
        return new Date();
    }

    static getStartOfToday() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);  
        return date;
    }

    static getEndOfToday() {
        const date = new Date();
        date.setHours(23, 59, 59, 999);  
        return date;
    }

    static getStartOfYesterday() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(0, 0, 0, 0);  
        return date;
    }

    static getEndOfYesterday() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(23, 59, 59, 999);  
        return date;
    }

    static getStartOfCurrentMonth() {
        const date = new Date();
        date.setDate(1);                 
        date.setHours(0, 0, 0, 0);        
        return date;
    }

    static getStartOfLastMonth() {
        const date = new Date();
        date.setDate(1);               
        date.setMonth(date.getMonth() - 1); 
        return date;
    }

    static getEndOfLastMonth() {
        const date = new Date();
        date.setDate(0);               
        return date;
    }

    static getStartOfCurrentYear() {
        const date = new Date();
        date.setMonth(0, 1);  
        date.setHours(0, 0, 0, 0); 
        return date;
    }

    static getStartOfLastYear() {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1); 
        date.setMonth(0, 1);  
        date.setHours(0, 0, 0, 0); 
        return date;
    }

    static getEndOfLastYear() {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1); 
        date.setMonth(11, 31);  
        date.setHours(23, 59, 59, 999); 
        return date;
    }

    static getWeek(date) {
        const onejan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }
}

module.exports = DateUtil;
