import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../../baseDto';

/**
 *  DTO краткой информации о пользователе.
 *  @prop {number} id - Идентификатор пользователя.
 *  @prop {string | null} adLogin - Логин Active Directory.
 *  @prop {string | null} lastName - Фамилия.
 *  @prop {string} firstName - Имя.
 *  @prop {string | null} patronym - Отчество.
 */
export class UserShortInfoDto extends BaseDto {
    @jsonProperty(Number)
    public id: number = 0;

    @jsonProperty(String, null)
    public adLogin: string | null = '';

    @jsonProperty(String, null)
    public lastName: string | null = '';

    @jsonProperty(String)
    public firstName: string = '';

    @jsonProperty(String, null)
    public patronym: string | null = null;
}
