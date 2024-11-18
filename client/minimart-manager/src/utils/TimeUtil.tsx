export class TimeUtil {
    private timezoneOffset: number;

    constructor(timezoneOffset: number = 0) {
        this.timezoneOffset = timezoneOffset;
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

    getCurrentDayAndMonth() {
        return this.getDayAndMonth(this.getCurrentDate());
    }

    getCurrentWeekDays = () => {
        const today = new Date();
        const currentDayOfWeek = today.getDay();
        const diff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek; // Start week on Monday
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + diff);

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);

            return {
                dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }), // e.g., "Monday"
                date: date.toISOString().split("T")[0], // YYYY-MM-DD
            };
        });
    };

    formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" }); // "Jul"
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    getCurrentWeek(): { day: string, month: string, year: number }[] {
        const currentDate = this.getCurrentDate();
        const currentDayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

        // Calculate the start of the week (Monday)
        const diff = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + diff);

        // Get all 7 days of the week
        const week = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            week.push(this.getDayMonthAndYear(day));
        }

        return week;
    }

    timeDifference(startTime: string, endTime: string): string {
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = endTime.split(":").map(Number);

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
}