/**
 * Проверяет, является ли переданный аргумент массивом с хотя бы одним элементом.
 * @template TItems - Обобщение типа для элементов массива.
 * @param {TItems[] | null} array - Массив любого типа или undefined/null.
 * @returns {boolean} - True, если arr — массив с длиной больше 0, иначе false.
 */
export function hasItemsInArray<TItems>(array?: TItems[] | null): array is TItems[] {
    return Array.isArray(array) && array.length > 0;
}
