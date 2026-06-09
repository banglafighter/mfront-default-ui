import {format, parse} from 'date-fns';

export default class DateTimeFormatter {

    static getFormattedDate(formatString: string = "dd/MM/yyyy", datetime?: any) {
        let now: any = datetime;
        if (!now) {
            now = new Date()
        }
        return format(now, formatString);
    }

    static getDateFromSting(dataTime: string, format: string) {
        return parse(dataTime, format, new Date())
    }

    static stringDateToFormattedDateTime(dataTime: string, stringFormat: string, expectedFormat: string) {
        let parsedDateTime: any = this.getDateFromSting(dataTime, stringFormat)
        return this.getFormattedDate(expectedFormat, parsedDateTime)
    }

}

/**
 * Common date-fns Format Tokens:
 *
 * Year:
 *  - yyyy : 4-digit year (e.g., 2025)
 *  - yy   : 2-digit year (e.g., 25)
 *
 * Month:
 *  - MMMM : Full month name (e.g., January)
 *  - MMM  : Abbreviated month name (e.g., Jan)
 *  - MM   : 2-digit month (e.g., 01, 12)
 *  - M    : 1-2 digit month (e.g., 1, 12)
 *
 * Day:
 *  - dd   : 2-digit day of the month (e.g., 01, 31)
 *  - d    : 1-2 digit day of the month (e.g., 1, 31)
 *  - do   : Day of month with ordinal (e.g., 1st, 2nd)
 *
 * Weekday:
 *  - EEEE : Full weekday name (e.g., Monday)
 *  - EEE  : Abbreviated weekday name (e.g., Mon)
 *
 * Hour:
 *  - HH   : 2-digit hour (24-hour clock) (e.g., 00–23)
 *  - hh   : 2-digit hour (12-hour clock) (e.g., 01–12)
 *
 * Minute:
 *  - mm   : 2-digit minutes (e.g., 00–59)
 *
 * Second:
 *  - ss   : 2-digit seconds (e.g., 00–59)
 *
 * AM/PM:
 *  - a    : AM/PM marker
 */
