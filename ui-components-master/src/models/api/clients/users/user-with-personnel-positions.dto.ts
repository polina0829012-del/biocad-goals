import { jsonProperty } from 'ts-serializable';

import { PersonnelPositionDto } from './personnel-position.dto';
import { UserShortInfoDto } from './user-short-info.dto';
import { UserDisplayStatusDto } from './user-display-status.dto';

/**
 * DTO пользователя.
 * @extends UserShortInfoDto
 * @prop {string} objectGuid - GUID пользователя из Active Directory.
 * @prop {string | null} email - Адрес электронной почты.
 * @prop {Date} birthDate - Дата рождения.
 * @prop {string | null} positionName - Наименование должности.
 * @prop {string | null} state - Статус пользователя.
 * @prop {number | null} subdivisionId - Идентификатор подразделения пользователя.
 * @prop {PersonnelPositionDto[]} personnelPositions - Совмещения пользователя.
 * @prop {boolean} isContractEmployee - Сотрудник по контракту?
 * @prop {boolean} isBVoiceModerator - Модератор стены обратной связи?
 * @prop {string[] | null} confirmations - Пользовательские подтверждения.
 * @prop {number | null} maxGrade - Максимальный грейд пользователя среди всех кадровых позиций.
 * @prop {UserDisplayStatusDto[] | null } statuses - Статусы пользователя.
 */
export class UserWithPersonnelPositionsDto extends UserShortInfoDto {
    @jsonProperty(String)
    public objectGuid: string = '';

    @jsonProperty(String, null)
    public email: string | null = null;

    @jsonProperty(String, null)
    public birthDate: string | null = null;

    @jsonProperty(String, null)
    public positionName: string | null = null;

    @jsonProperty(String, null)
    public state: string | null = null;

    @jsonProperty(Number, null)
    public subdivisionId: number | null = null;

    @jsonProperty([PersonnelPositionDto])
    public personnelPositions: PersonnelPositionDto[] = [];

    @jsonProperty(Boolean)
    public isContractEmployee: boolean = false;

    @jsonProperty(Boolean)
    public isBVoiceModerator: boolean = false;

    @jsonProperty([String], null)
    public confirmations: string[] | null = null;

    @jsonProperty(Number, null)
    public maxGrade: number | null = null;

    @jsonProperty([UserDisplayStatusDto], null)
    public statuses: UserDisplayStatusDto[] | null = null;
}
