import { action } from 'mobx';

import { UserDemandShortDto } from '../../models/api/clients/users/user-demand.dto';
import { MenuItemDto } from '../../models/menu/menu-item.dto';
import { SearchingResultDto } from '../../models/api/clients/searching-result.dto';
import { SearchingByLlmResultDto } from '../../models/api/clients/searching-by-llm-result.dto';
import { IWorkdeskbioClient } from '../../interfaces/api/client/workdeskbio-client.interface';

import { handleRestApiRequest } from '../../utils/error-handler';
import { WorkdeskbioStore } from '../store/workdeskbio.store';

/**
 * Сервис для работы с пользователями.
 */
export class WorkdeskbioService {
    private readonly _workdeskbioClient: IWorkdeskbioClient;
    private readonly _workdeskbioStore: WorkdeskbioStore;

    /**
     * Конструктор сервиса для работы с пользователями.
     * @param {IWorkdeskbioClient} usersClient - Клиент для работы с пользователями.
     * @param {WorkdeskbioStore} usersStore - Хранилище пользователей.
     */
    constructor(usersClient: IWorkdeskbioClient, usersStore: WorkdeskbioStore) {
        this._workdeskbioClient = usersClient;
        this._workdeskbioStore = usersStore;
    }

    /**
     * Загружает в хранилище данные о текущем пользователя.
     * @returns {Promise<void>} - Void.
     */
    @action.bound
    public async loadCurrentUser(): Promise<void> {
        this._workdeskbioStore.currentUser = await handleRestApiRequest(this._workdeskbioClient.getCurrentUser());
    }

    /**
     * Возвращает фото пользователя.
     * @param {string} adLogin - Логин пользователя.
     * @returns {Promise<BlobPart | null>} - Файл фото пользователя в формате Blob.
     */
    @action.bound
    public async getUserPhoto(adLogin: string): Promise<BlobPart | null> {
        return await handleRestApiRequest(this._workdeskbioClient.getUsersPhoto(adLogin));
    }

    /**
     * Загружает в хранилище баланс пользователя для тимбилдинга.
     * @returns {Promise<void>} - Promise Void.
     */
    @action.bound
    public async loadBalance(): Promise<void> {
        this._workdeskbioStore.userTmbBalance = await handleRestApiRequest(this._workdeskbioClient.getCurrentUserTmbBalance());
    }

    /**
     * Возвращает элементы меню.
     * @returns {Promise<MenuItemDto[] | null>} - Массив с элементами меню.
     */
    @action.bound
    public async getUserMenuItems(): Promise<MenuItemDto[] | null> {
        const menuItems = await this._workdeskbioClient.getUserMenuItems();

        return menuItems;
    }

    /**
     * Создает обращение к директору.
     * @param {number} userId - Идентификатор пользователя.
     * @param {UserDemandShortDto} userDemand - Форма данных с обращением.
     * @returns {Promise<void>} - Promise Void.
     */
    @action.bound
    public async createUserDemand(userId: number, userDemand: UserDemandShortDto): Promise<UserDemandShortDto | null> {
        return await handleRestApiRequest(this._workdeskbioClient.createUserDemand(userId, userDemand));
    }

        /**
     * Возвращает результаты поиска.
     * @param {string} searchWords - Поисковый запрос.
     * @param {number} take - Количество записей.
     * @returns {Promise<SearchingResultDto | null>} - Найденный пользователь.
     */
    @action.bound
    public async search(searchWords: string, take: number): Promise<SearchingResultDto | null> {
        return await handleRestApiRequest(this._workdeskbioClient.search(searchWords, take));
    }

    /**
     * Возвращает результаты поиска Llm.
     * @param {string} searchWords - Поисковый запрос.
     * @returns {Promise<SearchingResultByLlmDto | null>} - Результаты поиска.
     */
    @action.bound
    public async searchByLlm(searchWords: string): Promise<SearchingByLlmResultDto | null> {
        return await handleRestApiRequest(this._workdeskbioClient.searchByLlm(searchWords));
    }

    /**
     * Возвращает результат быстрого поиска по Llm.
     * @param {string} request - Поисковый запрос.
     * @returns {Promise<string | null>} - Результаты поиска.
     */
    @action.bound
    public async getLlmAnswer(request: string): Promise<string | null> {
        return await handleRestApiRequest(this._workdeskbioClient.getLlmAnswer(request));
    }
}
