import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../../baseDto';

/**
 *  DTO сведений о балансе тимбилдингов.
 *  @prop {Number} balance - Баланс пользователя.
 */
export class TeambuildingUserBalanceDto extends BaseDto {
    @jsonProperty(Number)
    public balance: number = 0;
}
