/**
 * Разделитель "пробельный символ".
 */
const whitespaceSeparator = ' ';

/**
 * Значение пустой строки.
 */
const emptyStringValue = '';

/**
 * Возвращает полное имя пользователя.
 * @param {string | null | undefined} lastName - Фамилия.
 * @param {string | null | undefined} firstName - Имя.
 * @returns {string} - Полное имя пользователя.
 */
export const getFullName = (lastName: string | null | undefined, firstName: string | null | undefined): string =>{
    return joinStringValues(whitespaceSeparator, lastName, firstName);
}

/**
 * Возвращает инициалы пользователя.
 * @param {string | null} lastName - Фамилия.
 * @param {string | null} firstName - Имя.
 * @returns {string} - Инициалы пользователя.
 */
export const getInitials = (lastName: string | null, firstName: string | null): string => {
    return getAbbreviationByFirstLiteral(lastName, firstName);
}

/**
 * Возвращает аббревиатуру слов по первому символу.
 * @param {Array<string | null>} values - Строковые значения.
 * @returns {string} - Аббревиатура из слов.
 */
const getAbbreviationByFirstLiteral = (...values: Array<string | null>): string => {
    return values.map((value) => (getFirstLiteral(value) ?? emptyStringValue)).join(emptyStringValue);
}

/**
 * Возвращает первый символ.
 * @param {string | null} value - Строковое значение.
 * @returns {string | null} - Первый символ.
 */
const getFirstLiteral = (value: string | null): string | null => {
    return value !== null ? (value.length !== 0 ? value[0] : emptyStringValue) : null;
}

/**
 * Объединяет значения строк.
 * @param {string} separator - Разделитель строк.
 * @param {Array<string | null>} values - Строковые значения.
 * @returns {string} - Объединенная строка.
 */
const joinStringValues = (separator: string, ...values: Array<string | null | undefined>) : string => {
    return values.filter((value) => (value !== null)).join(separator);
}