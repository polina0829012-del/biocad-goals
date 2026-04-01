import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../baseDto';

/**
 * DTO направления в поиске.
 * @prop {number} id - Идентификатор направления.
 * @prop {string} name - Наименование направления.
 * @prop {number | null} parentId - Идентификатор родительского направления.
 * @prop {string | null} parentName - Наименование родительского направления.
 */
export class FoundSubdivisionDto extends BaseDto {
    @jsonProperty(Number)
    public id: number = 0;

    @jsonProperty(String)
    public name: string = '';

    @jsonProperty(Number, null)
    public parentId: number | null = null;

    @jsonProperty(String, null)
    public parentName: string | null = null;
}
