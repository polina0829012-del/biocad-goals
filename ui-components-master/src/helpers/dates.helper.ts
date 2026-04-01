import { WeekDays } from '../enums/week-days.enum';

import { DAYS, MONTHS_IN_CASE } from '../global/constants/date';
import { addZeroToSingleDigit } from './add-zero-to-single-digit';

/**
 * Возвращает название текущего месяца в родительном падеже (января, февраля..).
 * @returns {string} Название текущего месяца в родительном падеже.
 */
export const getCurrentMonthName = (): string => MONTHS_IN_CASE[new Date().getMonth()];

/**
 * Возвращает текущий день и месяц в родительном падеже (января, февраля..).
 * @returns {string} Строку с текущим днем и месяцем в родительном падеже.
 */
export const getCurrentDayAndMonth = (): string => {
    const todayDate = new Date().getDate();

    return `${todayDate} ${getCurrentMonthName()}`;
};

/**
 * Функция для месяца.
 * @param {Date} date - Дата.
 * @returns {string} Название текущего месяца.
 */
export const getMonthName = (date: Date): string => {
    return MONTHS_IN_CASE[date.getMonth()];
};

/**
 * Функция дня и месяца.
 * @param {Date | string} date - Дата (обьектом Даты, либо строкой).
 * @returns {string} Строку с текущим днем и месяцем.
 */
export const getDayAndMonth = (date: Date | string): string => {
    let dateValue = date;

    if (!(dateValue instanceof Date)) {
        dateValue = new Date(date);
    }

    const day = dateValue.getDate();

    return `${day} ${getMonthName(dateValue)}`;
};

/**
 * Функция определяющая сколько дней осталось до дня рождения пользователя.
 * @param {string} birthDate - Дата рождения пользователя.
 * @returns {number} - Количество дней до дня рождения.
 */
export const daysBeforeBirthday = (birthDate: string): number => {
    const today = new Date();
    const birthday = new Date(birthDate);

    /** Устанавливает год дня рождения равным текущему году.
     * Это делается для того, чтобы "привязать" день рождения к текущему году и получить полную дату дня рождения в текущем году.
     */
    birthday.setFullYear(today.getFullYear());

    /** Если дата дня рождения (в текущем году) уже прошла, то к дате дня рождения прибавляется один год (день рождения в следующем году). */
    if (birthday < today) {
        birthday.setFullYear(today.getFullYear() + 1);
    }

    /** Получаем разницу между двумя датами в миллисекундах. */
    const diffTime = Math.abs(Number(birthday) - Number(today));

    /** Количество миллисекунд в дне (1000 * 60 * 60 * 24). */
    const MS_IN_DAYS = 1000 * 60 * 60 * 24;

    /** Округляем полученную дату. Делим это значение на количество миллисекунд в дне и получаем количество дней между двумя датами. */
    const diffDays = Math.ceil(diffTime / MS_IN_DAYS);

    return diffDays;
};

/** Возвращает корректный текст через сколько дней у человека день рождения, в зависимости от числа.
 * @param {number} days - Количество дней.
 * @returns {string} - текст.
 */
export const getBeforeBirthdayText = (days: number): string => {
    const lastDigit = days % 10;

    if (days === 1) {
        return 'Завтра';
    }
    if (lastDigit === 1 && days !== 11) {
        return `Через ${days} день`;
    }
    if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(days)) {
        return `Через ${days} дня`;
    } else {
        return `Через ${days} дней`;
    }
};

/**
 * Возвращает текущее число, месяц и год в формате dd.mm.yyyy.
 * @param {Date | string} date - Строка даты.
 * @returns {string} - Строку с текущим числом, месяцем и годом в формате dd.mm.yyyy.
 */
export const getDateFormatDDMMYYYY = (date: Date | string): string =>
    new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

/**
 * Возвращает дату в формате ISO: YYYY-MM-DD. Используется локаль "sv" - которая равна формату ISO, но с учетом часового пояса пользователя.
 * @param {string} date - Строка даты.
 * @returns {string} Строку с текущей датой в формате ISO: YYYY-MM-DD.
 */
export const getDateISOFormat = (date: Date | string): string => new Date(date).toLocaleDateString('sv');

/**
 * Возвращает время переданной даты в UTC.
 * @param {string} dateString - Строка даты.
 * @returns {string} - Строку со временем даты.
 */
export const getDateFormatTime = (dateString: string): string =>
    new Date(dateString).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
    });

/**
 * Возвращает дату в ISO формате из даты и времени.
 * @param {string} dateString - Строка даты.
 * @param {string} timeString - Строка времени.
 * @returns {string} - Строку с датой в ISO формате.
 */
export const getFormattedDateTimeFormat = (dateString: string, timeString: string): string => {
    const date = new Date(dateString);

    /** Разбиваем строку времени на часы и минуты. */
    const [hours, minutes] = timeString.split(':').map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);

    const formattedDate = new Date(date.getTime() - date.getTimezoneOffset());

    return formattedDate.toISOString();
};

/**
 * Возвращает дату в корректном формате для сервера.
 * Пример: 2023.09.26.
 * @param {Date} date - Дата, которую нужно отформатировать.
 * @returns {string} - Строку с корректной датой.
 */
export const getDateFormatYYYYMMDD = (date: Date | null): string | undefined => {
    if (date !== null && date !== undefined) {
        const day = isNaN(date.getDate()) ? undefined : addZeroToSingleDigit(date.getDate());

        const month = isNaN(date.getMonth()) ? undefined : addZeroToSingleDigit(date.getMonth() + 1);

        const year = isNaN(date.getFullYear()) ? undefined : date.getFullYear();

        const yearMonthDayIsUndefined = year === undefined || day === undefined || month === undefined;

        const res = !yearMonthDayIsUndefined ? `${year}-${month}-${day}` : '';

        return res;
    }
};

/**
 * Возвращает дату в корректном формате для отображения дня и месяца.
 * @param {string} dateString - Дата, которую нужно отформатировать.
 * @returns {string} - Строку с корректной датой.
 */
export const formatDateWithMonth = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();

    const monthName = MONTHS_IN_CASE[date.getMonth()];

    return `${day} ${monthName}`;
};

/**
 * Проверяет, что текущая дата находится в промежутке даты начала и даты окончания.
 * @param {Date} startDate - Дата начала.
 * @param {Date} endDate - Дата окончания.
 * @returns {boolean} - Текущая дата соответствует промежутку?
 */
export const isCurrentDateInRange = (startDate: Date, endDate: Date): boolean => {
    const currentDate = new Date();

    const isInRange = currentDate >= startDate && currentDate <= endDate;

    return isInRange;
};

/**
 * Получает время даты.
 * @param {string | null} date - Дата.
 * @returns {number} - Время.
 */
export const getDateTime = (date: string | null): number => new Date(date ?? '').getTime();

/**
 * Проверяет пятница ли сегодня.
 * @returns {boolean} - Сегодня пятница?
 */
export const checkIsFridayToday = (): boolean => new Date().getDay() === WeekDays.friday;

/**
 * Получает год даты.
 * @param {string | null} dateString - Дата.
 * @returns {number} - Год.
 */
export const getDateYear = (dateString: string): number => new Date(dateString).getUTCFullYear();

/**
 * Проверяет, что дата валидная.
 * @param {string} dateString - Строка даты.
 * @returns {boolean} - Дата валидная?
 */
export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);

    return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Возвращает текущую дату в формате строки ISO.
 * @returns {string} - Текущая дата в формате строки ISO.
 */
export const getCurrentDateISOString = (): string => new Date(Date.now()).toISOString();

/**
 * Возвращает дату в формате строки ISO.
 * @param {Date | string} date - Строка даты.
 * @returns {string} Строку с датой в формате ISO.
 */
export const getDateISOString = (date: Date | string): string => new Date(date).toISOString();

/**
 * Возвращает дату в формате день месяц строкой год.
 * Пример: 19 мая 2019.
 * @param {Date | string} date - Строка даты.
 * @returns {string} Строку с датой в формате день месяц строкой год.
 */
export const getFullDateWithStringMonth = (date: Date | string): string => {
    return `${getDayAndMonth(new Date(date ?? ''))} ${new Date(date ?? '').getFullYear()}`;
};

/**
 * Возвращает текущий день, месяц (в родительном падеже), год и день недели.
 * @param {Date} date - Дата.
 * @returns {string} Строку с текущим днем, месяцем в родительном падеже, годом и день недели.
 */
export const getDateWithWeekday = (date: Date = new Date()): string => {
    const day = date.getDate();

    const monthIndex = date.getMonth();

    const year = date.getFullYear();

    const dayOfWeek = DAYS[date.getDay()];

    return `${day} ${MONTHS_IN_CASE[monthIndex]} ${year}, ${dayOfWeek}`;
};

/**
 * Форматирует дату в строку формата yyyy-mm-dd.
 * @param {Date} date - Дата.
 * @returns {string} Строку в формате yyyy-mm-dd.
 */
export const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

/**
 * Возвращает текущее число и месяц в формате dd.mm.
 * @param {Date | string} date - Строка даты.
 * @returns {string} - Строку с текущим числом и месяцем в формате dd.mm.
 */
export const getDateFormatDDMM = (date: Date | string): string => {
    return new Date(date).toLocaleDateString('ru-RU', {
        month: '2-digit',
        day: '2-digit',
    });
};

/**
 * Проверяет, что дата находится в текущем году и она не меньше текущей (актуальной) даты.
 * @param {Date} date - Дата.
 * @returns {boolean} - Дата в текущем году и не меньше текущей даты?
 */
export const isDateInCurrentYearAndNotPast = (date: Date): boolean => {
    const currentDate = new Date();

    const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    return date.getFullYear() === currentDate.getFullYear() && dateWithoutTime >= currentDateWithoutTime;
};
