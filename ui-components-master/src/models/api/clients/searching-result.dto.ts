import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../baseDto';
import { FoundSubdivisionDto } from './found-subdivision.dto';
import { FoundUserDto } from './found-user.dto';

/**
 * DTO Результатов поиска.
 * @prop {FoundUserDto[]} users - Пользователи.
 * @prop {FoundSubdivisionDto[]} subdivisions - Подразделения.
 */
export class SearchingResultDto extends BaseDto {
    @jsonProperty([FoundUserDto], null)
    public users: FoundUserDto[] | null = null;

    @jsonProperty([FoundSubdivisionDto], null)
    public subdivisions: FoundSubdivisionDto[] | null = null;
}
