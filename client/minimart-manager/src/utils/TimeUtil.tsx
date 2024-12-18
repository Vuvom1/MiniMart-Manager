export class TimeUtil {
    private timezoneOffset: number;

    constructor(timezoneOffset: number = 0) {
        this.timezoneOffset = timezoneOffset;
    }

    getTimeFromDate(date: Date): string {
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        
        return `${hours}:${minutes}`;
    }

    getCurrentDate() {
        return new Date();
    }

    getDayAndMonth = (date: any) => {
        if (!(date instanceof Date)) {
            throw new Error("Invalid input: Expected a Date object");
        }

        const day = date.toLocaleString('en-US', { day: '2-digit' });
        const month = date.toLocaleString('en-US', { month: 'long' });

        return { day, month };
    };

    getDayMonthAndYear(date: Date): { day: string, month: string, year: number } {
        if (!(date instanceof Date)) {
            throw new Error("Invalid input: Expected a Date object");
        }

        const day = date.toLocaleString('en-US', { day: '2-digit' });
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();

        return { day, month, year };
    }

    convertToDayMonthYear(timestamp: string): { day: string; month: string; year: number } {
        const date = new Date(timestamp);

        const day = date.toLocaleString('en-US', { day: '2-digit' });
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return { day, month, year };
    }

    convertToDayMonthYearShort(timestamp: string): string {   
        const date = new Date(timestamp);

        const day = date.toLocaleString('en-US', { day: '2-digit' });
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    

    getCurrentDayAndMonth() {
        return this.getDayAndMonth(this.getCurrentDate());
    }

    getCurrentWeekDays = () => {
        const today = new Date();
        const currentDayOfWeek = today.getDay();
        const diff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + diff);

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);

            return {
                dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
                date: date.toISOString().split("T")[0],
            };
        });
    };

    getPrevWeekDays = (currentWeek: { dayOfWeek: string; date: string }[]) => {
        const startOfCurrentWeek = new Date(currentWeek[0].date);

        startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() - 7);

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfCurrentWeek);
            date.setDate(startOfCurrentWeek.getDate() + i);

            return {
                dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
                date: date.toISOString().split("T")[0],
            };
        });
    };

    getNextWeekDays = (currentWeek: { dayOfWeek: string; date: string }[]) => {
        const startOfCurrentWeek = new Date(currentWeek[0].date);

        startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 7);

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfCurrentWeek);
            date.setDate(startOfCurrentWeek.getDate() + i);

            return {
                dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
                date: date.toISOString().split("T")[0],
            };
        });
    };


    formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    formatDateToDayMonthYear = (dateString: string): string => {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };


    getCurrentWeek(): { day: string, month: string, year: number }[] {
        const currentDate = this.getCurrentDate();
        const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

    
        const diff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + diff);


        const week = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            week.push(this.getDayMonthAndYear(day));
        }

        return week;
    }

    convertIsoDateToTimeAndDate(isoDate: string | Date): string {
        const date = new Date(isoDate);

        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    }

    timeDifference(startTime: string, endTime: string): string {
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = endTime.split(":").map(Number);

        if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
            return "0";
        }

        const adjustedStartHours = (startHours + this.timezoneOffset + 24) % 24;
        const adjustedEndHours = (endHours + this.timezoneOffset + 24) % 24;

        const startTotalMinutes = adjustedStartHours * 60 + startMinutes;
        const endTotalMinutes = adjustedEndHours * 60 + endMinutes;

        let diffMinutes = endTotalMinutes - startTotalMinutes;
        if (diffMinutes < 0) {
            diffMinutes += 24 * 60;
        }

        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;

        return hours === 0
            ? `${minutes}m`
            : minutes === 0
                ? `${hours}h`
                : `${hours}h ${minutes}m`;
    }

    sumTimeDifferences(timeStrings: string[]): string {
        let totalMinutes = 0;
        if (!Array.isArray(timeStrings)) {
            return "0";
        }

        for (const timeString of timeStrings) {
            if (typeof timeString === 'string' && timeString) {
                const [hours, minutes] = timeString.split(":").map(Number);
                if (!isNaN(hours) && !isNaN(minutes)) {
                    totalMinutes += hours * 60 + minutes;
                }
            }
        }

        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;

        return `${totalHours}h ${remainingMinutes}m`;
    }

    updateTime(date: Date, timeString: string): Date {
        const [hours, minutes] = timeString.split(':').map(Number);
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0, 0);
        console.log(newDate);
        return newDate;
    }
}