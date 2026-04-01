import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../../baseDto';

/**
 *  DTO статуса пользователя.
 *  @prop {string | null} systemName - Системное имя.
 *  @prop {string | null} displayName - Имя для отображения.
 *  @prop {string | null} durationEnd - Дата окончания действия статуса.
 */
export class UserDisplayStatusDto extends BaseDto {
    @jsonProperty(String, null)
    public systemName: string | null = null;

    @jsonProperty(String, null)
    public displayName: string | null = null;

    @jsonProperty(String, null)
    public durationEnd: string | null = null;
}
