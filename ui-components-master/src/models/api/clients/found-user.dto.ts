import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../baseDto';

/**
 *  DTO информации о пользователе в поиске.
 *  @prop {number} id - Идентификатор пользователя.
 *  @prop {string | null} adLogin - Логин Active Directory.
 *  @prop {string | null} lastName - Фамилия.
 *  @prop {string} firstName - Имя.
 *  @prop {string | null} patronym - Отчество.
 *  @prop {number | null} subdivisionId - Идентификатор совмещенного подразделения.
 *  @prop {string} positionName - Наименование совмещенной должности.
 *  @prop {string} subdivisionName - Наименование совмещенного подразделения.
 *  @prop {number | null} organizationStructurePositionId - Идентификатор позиции.
 */
export class FoundUserDto extends BaseDto {
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

    @jsonProperty(Number, null)
    public subdivisionId: number | null = null;

    @jsonProperty(String, null)
    public positionName: string | null = null;

    @jsonProperty(String)
    public subdivisionName: string | null = '';

    @jsonProperty(Number, null)
    public organisationStructurePositionId: number | null = null;
}
