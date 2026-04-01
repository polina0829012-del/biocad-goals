import { ClassType } from 'react';

/** Преобразовывает данные в модель ДТО.
 * @param {ClassType<ModelType, any, any>} Model - Модель DTO.
 * @param {ObjectType} object - Объект данных.
 * @returns { ClassType<ModelType, any, any>l} - Преобразованная модель данных.
 */
export const convertFromJson = <ModelType, ObjectType>(
    Model: ClassType<ModelType, any, any>,
    object: ObjectType
): ClassType<ModelType, any, any> => new Model().fromJSON(object);