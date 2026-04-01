import { WeekDays } from '../../enums/week-days.enum';

import MONTHS_LOCALIZATION from '../../localization/ru/date/months-for-days.json';
import WEEK_DAYS_LOCALIZATION from '../../localization/ru/date/week-days.json';
import DAYS_LOCALIZATION from '../../localization/ru/date/days.json';

/**
 * Названия месяцев.
 */
export const MONTHS_IN_CASE = [
    MONTHS_LOCALIZATION.january,
    MONTHS_LOCALIZATION.february,
    MONTHS_LOCALIZATION.march,
    MONTHS_LOCALIZATION.april,
    MONTHS_LOCALIZATION.may,
    MONTHS_LOCALIZATION.june,
    MONTHS_LOCALIZATION.july,
    MONTHS_LOCALIZATION.august,
    MONTHS_LOCALIZATION.september,
    MONTHS_LOCALIZATION.october,
    MONTHS_LOCALIZATION.november,
    MONTHS_LOCALIZATION.december,
];

/**
 * Названия дней недели.
 */
export const DAYS = [
    DAYS_LOCALIZATION.sunday,
    DAYS_LOCALIZATION.monday,
    DAYS_LOCALIZATION.tuesday,
    DAYS_LOCALIZATION.wednesday,
    DAYS_LOCALIZATION.thursday,
    DAYS_LOCALIZATION.friday,
    DAYS_LOCALIZATION.saturday,
];

/**
 * Дни недели.
 */
export const WEEK_DAYS = [
    { day: WeekDays.sunday, label: WEEK_DAYS_LOCALIZATION.sundayAbbreviated },
    { day: WeekDays.monday, label: WEEK_DAYS_LOCALIZATION.mondayAbbreviated },
    { day: WeekDays.tuesday, label: WEEK_DAYS_LOCALIZATION.tuesdayAbbreviated },
    { day: WeekDays.wednesday, label: WEEK_DAYS_LOCALIZATION.wednesdayAbbreviated },
    { day: WeekDays.thursday, label: WEEK_DAYS_LOCALIZATION.thursdayAbbreviated },
    { day: WeekDays.friday, label: WEEK_DAYS_LOCALIZATION.fridayAbbreviated },
    { day: WeekDays.saturday, label: WEEK_DAYS_LOCALIZATION.saturdayAbbreviated },
];
