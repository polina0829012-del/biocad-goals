import { UserWithPersonnelPositionsDto } from '../../../models/api/clients/users/user-with-personnel-positions.dto';
import { TeambuildingUserBalanceDto } from '../../../models/api/clients/users/teambuilding-user-balance.dto';
import { MenuItemDto } from '../../../models/menu/menu-item.dto';
import { UserDemandShortDto } from '../../../models/api/clients/users/user-demand.dto';
import { SearchingResultDto } from '../../../models/api/clients/searching-result.dto';
import { SearchingByLlmResultDto } from '../../../models/api/clients/searching-by-llm-result.dto';

/**
 * Контракт клиента для работы с данными workdeskbio.
 */
export interface IWorkdeskbioClient {
    /**
     * Возвращает данные текущего пользователя.
     * @returns {Promise<UserWithPersonnelPositionsDto | null>} - DTO пользователя.
     */
    getCurrentUser: () => Promise<UserWithPersonnelPositionsDto | null>;

    /**
     * Возвращает фото пользователя.
     * @param {string} adLogin - Логин пользователя.
     * @returns {Promise<BlobPart | null>} - Файл фото пользователя в формате Blob.
     */
    getUsersPhoto: (adLogin: string) => Promise<BlobPart | null>;

    /**
     * Возвращает баланс пользователя для тимбилдинга.
     * @returns {Promise<TeambuildingUserBalanceDto | null>} - Баланс пользователя.
     */
    getCurrentUserTmbBalance: () => Promise<TeambuildingUserBalanceDto | null>;

    /**
     * Возвращает элементы меню для пользователя.
     * @returns {Promise<MenuItemDto[] | null>} - Массив с элементами меню.
     */
    getUserMenuItems: () => Promise<MenuItemDto[] | null>;

    /**
     * Создает обращение пользователя.
     * @param {number} userId - Идентификатор пользователя.
     * @param {UserDemandShortDto} userDemand - Форма данных с обращением.
     * @returns {Promise<UserDemandShortDto | null>} - Данные сохраненные в обращениях.
     */
    createUserDemand: (userId: number, userDemand: UserDemandShortDto) => Promise<UserDemandShortDto | null>;

    /**
     * Возвращает данные поиска по сотрудникам.
     * @param {string} searchWords - Слово для поиска.
     * @param {number} take - Количество записей.
     * @returns {Promise<SearchingResultDto | null>} - DTO сотрудников.
     */
    search: (searchWords: string, take: number) => Promise<SearchingResultDto | null>;

    /**
     * Возвращает результаты поиска Llm.
     * @param {string} searchWords - Поисковый запрос.
     * @returns {Promise<SearchingByLlmResultDto | null>} - Результаты поиска.
     */
    searchByLlm: (searchWords: string) => Promise<SearchingByLlmResultDto | null>;

    /**
     * Возвращает результат быстрого поиска по Llm.
     * @param {string} request - Поисковый запрос.
     * @returns {Promise<string | null>} - Результаты поиска.
     */
    getLlmAnswer: (request: string) => Promise<string | null>;
}
