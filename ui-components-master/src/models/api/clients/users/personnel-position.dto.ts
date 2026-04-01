import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../../baseDto';
import { UserShortInfoDto } from './user-short-info.dto';

/**
 * DTO кадровой позиции.
 * @prop {number | null} id - Идентификатор кадровой позиции.
 * @prop {number | null} subdivisionId - Идентификатор совмещенного подразделения.
 * @prop {string} positionName - Наименование совмещенной должности.
 * @prop {string} subdivisionName - Наименование совмещенного подразделения.
 * @prop {string | null} city - Город совмещенного подразделения.
 * @prop {string | null} office - Офис совмещенного подразделения.
 * @prop {string} state - Статус сотрудника по совмещенному подразделению.
 * @prop {boolean | null} isPrimaryEmployment - Основная должность?
 * @prop {string | null} employmentDate - Дата трудоустройства.
 * @prop {string | null} employeeGuid - Уникальный идентификатор сотрудника.
 * @prop {string | null} organizationName - Название организации.
 * @prop {UserShortInfoDto| null} head - Руководитель.
 */
export class PersonnelPositionDto extends BaseDto {
    @jsonProperty(Number, null)
    public id: number | null = null;

    @jsonProperty(Number, null)
    public subdivisionId: number | null = null;

    @jsonProperty(String)
    public positionName: string = '';

    @jsonProperty(String)
    public subdivisionName: string = '';

    @jsonProperty(String, null)
    public city: string | null = null;

    @jsonProperty(String, null)
    public office: string | null = null;

    @jsonProperty(String)
    public state: string = '';

    @jsonProperty(String, null)
    public employmentDate: string | null = null;

    @jsonProperty(Boolean, null)
    public isPrimaryEmployment: boolean | null = null;

    @jsonProperty(String, null)
    public employeeGuid: string | null = null;

    @jsonProperty(String, null)
    public organizationName: string | null = null;

    @jsonProperty(UserShortInfoDto, null)
    public head: UserShortInfoDto | null = null;
}
