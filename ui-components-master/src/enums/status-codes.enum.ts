/**
 * Статусы кодов запросов.
 * @enum {number}
 * @member {number} StatusCodes.success - Запрос выполнен успешно.
 * @member {number} StatusCodes.created - Успешное создание ресурса.
 * @member {number} StatusCodes.processed - Сервер успешно обработал запрос, но нет содержимого для возврата клиенту.
 * @member {number} StatusCodes.badRequest - Отправка некорректного запроса к серверу.
 * @member {number} StatusCodes.unauthorized - Проблемы с аутентификацией или авторизацией.
 * @member {number} StatusCodes.forbidden - Доступ к запрашиваемой странице запрещен или у пользователя нет прав на просмотр контента.
 * @member {number} StatusCodes.notFound - Сервер не может найти данные согласно запросу.
 * @member {number} StatusCodes.unprocessableEntity - Сервер понимает тип содержимого в теле запроса и синтаксис запроса является правильным, но серверу не удалось обработать инструкции содержимого.
 * @member {number} StatusCodes.toManyRequests - Отправлено слишком много запросов за последнее время.
 * @member {number} StatusCodes.internalServerError - Внутренняя серверная проблема.
 * @member {number} StatusCodes.badGateway - Сервер, действуя как шлюз или прокси, получил неверный ответ от восходящего сервера.
 * @member {number} StatusCodes.serviceUnavailable - Сервер не готов обработать данный запрос.
 */
export enum StatusCodes {
    success = 200,
    created = 201,
    processed = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    unprocessableEntity = 422,
    toManyRequests = 429,
    internalServerError = 500,
    badGateway = 502,
    serviceUnavailable = 503,
}
