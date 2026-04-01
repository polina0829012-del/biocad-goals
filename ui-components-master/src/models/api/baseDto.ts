import 'reflect-metadata';
import { Serializable, SnakeCaseNamingStrategy, jsonObject } from 'ts-serializable';

/**
 * Базовая модель для поддержки сериализаций из DTO.
 */
@jsonObject({ namingStrategy: new SnakeCaseNamingStrategy() })
export class BaseDto extends Serializable {}

/**
 * Пример конвертации ответа от сервера в модель.
 * Код из метода репозитория.
 *

 * const serverResponse = await server.get(....);
 * const responseModel = new SomeModel().fromJSON(serverResponse);
 *
 * const anyModel = new SomeModel().fromJSON({a:1, b: 'qwerty'});
 */