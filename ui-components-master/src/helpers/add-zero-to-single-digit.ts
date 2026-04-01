/**
 * Добавляет ноль перед одинарными значениями цифр.
 * @param {number} time - Числовое значение, поступающее на вход.
 * @returns {string} - Строка с корректной подстановкой ноля.
 */
export const addZeroToSingleDigit = (time: number): string => {
    if (isNaN(time)) return '';

    return time.toString().padStart(2, '0');
};
