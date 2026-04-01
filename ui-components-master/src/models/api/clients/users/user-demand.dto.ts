import { jsonObject, jsonProperty, SnakeCaseNamingStrategy } from 'ts-serializable';
import { CamelCaseNamingStrategy } from 'ts-serializable/dist/naming-strategies/CamelCaseNamingStrategy';

import { BaseDto } from '../../baseDto';

/**
 * DTO текстового обращения к директору.
 * @prop {number} userId - Идентификатор пользователя.
 * @prop {string} demandText - Обращение.
 */
@jsonObject({ namingStrategy: new CamelCaseNamingStrategy() })
export class UserDemandShortDto extends BaseDto {
    @jsonProperty(Number)
    public userId: number = 0;

    @jsonProperty(String)
    public demandText: string = '';
}

/**
 * DTO обращения к директору.
 * @prop {number} id - Идентификатор обращения.
 * @prop {string} userFullName - Имя.
 * @prop {string} adLogin - AD логин.
 * @prop {string} positionName - Должность.
 * @prop {string} subdivisionName - Отдел.
 */
@jsonObject({ namingStrategy: new SnakeCaseNamingStrategy() })
export class UserDemandDto extends UserDemandShortDto {
    @jsonProperty(Number)
    public id: number = 0;

    @jsonProperty(String)
    public adLogin: string = '';

    @jsonProperty(String)
    public userFullName: string = '';

    @jsonProperty(String, null)
    public positionName: string | null = null;

    @jsonProperty(String, null)
    public subdivisionName: string | null = null;
}
