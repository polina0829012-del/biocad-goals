import { SerializationSettings } from 'ts-serializable';
import { plainToInstance } from 'class-transformer';

import { IRestApiResponse } from '../interfaces/api/rest-api-client.interface';
import { StatusCodes } from '../enums/status-codes.enum';

import { convertFromJson } from './convert-from-json.helper';

/** Проверяет статус-код ответа и в зависимости от него возвращает результат или null.
 * @param {IRestApiResponse<ResponseType>} response - Ответ от сервера.
 * @returns {ResponseType | null} - Ответ или null.
 */
export const checkResponseStatus = <ResponseType>(response: IRestApiResponse<ResponseType>): ResponseType | null => {
    if (response.statusCode === StatusCodes.success || response.statusCode === StatusCodes.created) {
        return response.result;
    } else {
        return null;
    }
};

/** Проверяет статус-код ответа и в зависимости от него возвращает модель результата или null.
 * @param {IRestApiResponse<ResponseType>} response - Ответ от сервера.
 * @param {new () => ModelType} Model - Модель DTO.
 * @param {string | undefined} propertyName - Имя свойства для результата.
 * @returns {ResponseType | null} - Ответ или null.
 */
export const convertRestResponseToModel = <
    ResponseType,
    ModelType extends {
        fromJSON: (json: object, settings?: Partial<SerializationSettings> | undefined) => ResponseType;
    }
>(
    response: IRestApiResponse<ResponseType>,
    Model: new () => ModelType,
    propertyName?: string
): ResponseType | null => {
    const suitableStatusCodes = [StatusCodes.success, StatusCodes.created];

    if (suitableStatusCodes.includes(response.statusCode) && response.result) {
        const json = propertyName ? { [propertyName]: response.result } : response.result;

        return convertFromJson(Model, json);
    }

    return null;
};

/** Конвертирует ответ от сервера, если пришел массив.
 * @template ResponseType - Обобщение типа ответа от сервера.
 * @template ModelType - Обобщение типа модели.
 * @param {IRestApiResponse<ResponseType>} response - Ответ от сервера.
 * @param {new () => ModelType} Model - Модель DTO.
 * @param {boolean | undefined} isRecursedArray - Рекурсивный массив?
 * @returns {ModelType[] | null } - Массив конвертированных моделей или null.
 */
export const convertRestResponseArrayToModel = <ResponseType, ModelType>(
    response: IRestApiResponse<ResponseType>,
    Model: new () => ModelType,
    isRecursedArray?: boolean
): ModelType[] | null => {
    const suitableStatusCodes = [StatusCodes.success, StatusCodes.created];

    if (!response || !Array.isArray(response.result)) {
        return null;
    }

    if (!suitableStatusCodes.includes(response.statusCode)) {
        return null;
    }

    return response.result.map((item) =>
        isRecursedArray ? plainToInstance(Model, item) : convertFromJson(Model, item)
    );
};
