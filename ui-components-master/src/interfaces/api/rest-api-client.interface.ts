/**
 * REST ответ от API.
 * @template TResult - Тип результата.
 * @prop {number} statusCode - Код статуса.
 * @prop {TResult | null} result - Результат.
 * @prop {Record<string, string>} headers - Заголовки ответа.
 */
export interface IRestApiResponse<TResult> {
    statusCode: number;
    result: TResult | null;
    headers: Record<string, string>;
}

/**
 * Контракт клиента для REST взаимодействия с API.
 */
export interface IRestApiClient {
    /**
     * Выполняет запрос.
     * @template TResult - Тип результата.
     * @param {string} url - Относительный путь.
     * @param {object | undefined} - Опции запроса.
     * @returns {Promise<IRestApiResponse<TResult>>} Запрашиваемый ресурс.
     */
    default: <TResult>(url: string, options?: {}) => Promise<IRestApiResponse<TResult>>;

    /**
     * Выполняет запрос для получения ресурса.
     * @template TResult - Тип результата.
     * @param {string} url - Относительный путь.
     * @param {object | undefined} params - Параметры запроса.
     * @param {object | undefined} headers - Заголовки.
     * @param {object | undefined} options - Опции запроса.
     * @returns {Promise<IRestApiResponse<TResult>>} Запрашиваемый ресурс.
     */
    get: <TResult>(
        url: string,
        headers?: object,
        params?: object,
        options?: object
    ) => Promise<IRestApiResponse<TResult>>;

    /**
     * Выполняет команду.
     * @template TResult - Тип результата.
     * @param url - Относительный путь.
     * @param data - Данные для команды.
     * @param params - Параметры.
     * @param options - Опции (headers).
     * @returns Результат выполнения команды.
     */
    post: <TResult>(
        url: string,
        data?: object,
        params?: object,
        options?: object
    ) => Promise<IRestApiResponse<TResult>>;

    /**
     * Выполняет обновление ресурса.
     * @template TResult - Тип результата.
     * @param url - Относительный путь.
     * @param data - Обновляемые данные.
     * @param params - Параметры.
     * @param options - Опции (headers).
     * @returns {Promise<IRestApiResponse<TResult>>} - Обновленные данные.
     */
    put: <TResult>(url: string, data: object, params?: object, options?: object) => Promise<IRestApiResponse<TResult>>;

    /**
     * Выполняет обновление и изменение ресурса.
     * @template TResult - Тип результата.
     * @param {string} url - Адрес.
     * @param {object | undefined} data - Обновляемые данные.
     * @param {object | undefined} params - Параметры.
     * @param {object | undefined} options - Опции (headers).
     * @returns {Promise<IRestApiResponse<TResult>>} Обновленные данные.
     */
    patch: <TResult>(
        url: string,
        data?: object,
        params?: object,
        options?: object
    ) => Promise<IRestApiResponse<TResult>>;

    /**
     * Выполняет запрос для удаления ресурса.
     * @template TResult - Тип результата.
     * @param {string} url - Относительный путь удаляемого ресурса.
     * @param {object | undefined} data - Данные для передачи на сервер.
     * @param {object | undefined} params - Параметры.
     * @returns {Promise<IRestApiResponse<TResult>>} - Данные удаленного ресурса либо null.
     */
    delete: <TResult>(url: string, data?: object, params?: object) => Promise<IRestApiResponse<TResult>>;
}
