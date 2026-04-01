/** Функция обработки ошибок в запросах.
 * @param {Promise<T>} requestFunction - Функция запроса.
 * @returns {Promise<T | null>} - Результат выполнения функции или null, в случае ошибки.
 */
export const handleRestApiRequest = async <T>(requestFunction: Promise<T>): Promise<T | null> => {
    // TODO: return null заменить на throw error (проверить работу везде, где используется функция)
    try {
        return await requestFunction;
    } catch (error) {
        console.log(error);
        return null;
    }
};
