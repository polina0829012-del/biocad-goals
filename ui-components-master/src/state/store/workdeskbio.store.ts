import { action, makeAutoObservable, observable } from 'mobx';

import { UserWithPersonnelPositionsDto } from '../../models/api/clients/users/user-with-personnel-positions.dto';
import { TeambuildingUserBalanceDto } from '../../models/api/clients/users/teambuilding-user-balance.dto';

import { UserRoles } from '../../enums/api/user-roles.enum';

/**
 * Хранилище данных workdeskbio.
 */
export class WorkdeskbioStore {
    /** Текущий пользователь. */
    @observable
    public currentUser: UserWithPersonnelPositionsDto | null = null;

    /** Баланс пользователя для тимбилдинга. */
    @observable
    public userTmbBalance: TeambuildingUserBalanceDto | null = null;

    /** Ссылка на главную страницу Воркдеска. */
    @observable
    public workdeskbioMainPageLink: string = '';

    /** Роли пользователя. */
    @observable
    public accountRoles: UserRoles[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    /**
     * Устанавливает ссылку на главную страницу Воркдеска.
     * @param {string} link - Ссылка.
     */
    @action
    public setMainPageLink(link: string): void {
        this.workdeskbioMainPageLink = link;
    }

    /**
     * Устанавливает роли пользователя.
     * @param {UserRoles[]} roles - Роли пользователя.
     */
    @action
    public setAccountRoles(roles: UserRoles[]): void {
        this.accountRoles = roles;
    }
}
