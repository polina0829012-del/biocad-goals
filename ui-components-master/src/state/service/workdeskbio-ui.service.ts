import { action, makeAutoObservable } from 'mobx';

import { WorkdeskbioUiStore } from '../store/workdeskbio-ui.store';

/**
 * Сервис для работы с пользовательским интерфейсом.
 */
export class WorkdeskbioUiService {
    private readonly workdeskbioUiStore: WorkdeskbioUiStore;

    /**
     * Конструктор сервиса для работы с пользовательским интерфейсом.
     * @param {WorkdeskbioUiStore} UiStore - Хранилище пользовательского интерфейса.
     */
    constructor(PortalUiStore: WorkdeskbioUiStore) {
        makeAutoObservable(this, {}, { autoBind: true });

        this.workdeskbioUiStore = PortalUiStore;
    }

    /**
     * Записывает в хранилище координату прокрутки статичной страницы, чтоб возвращаться к тому же месту.
     * @param {number} scrollY - Координата.
     * @returns {void} - Void.
     */
    @action.bound
    public setScrollContentToStore(scrollY: number): void {
        this.workdeskbioUiStore.staticContentScroll = scrollY;
    }

    /**
     * Записывает минимизированное или нет значение у окна.
     * @param {boolean} isMinimized - Минимизировано ли меню.
     * @returns {void} - Void.
     */
    @action.bound
    public setResizeWindowToStore(isMinimized: boolean): void {
        this.workdeskbioUiStore.isMinimizedContent = isMinimized;
    }

    /**
     * Записывает размер меню.
     * @param {string} size - Размер меню.
     * @returns {void} - Void.
     */
    @action.bound
    public setMenuSizeToStore(size: string): void {
        this.workdeskbioUiStore.menuSize = size;
    }

    /**
     * Устанавливает открытие/закрытие поиска.
     * @param {boolean} isOpen - Открыто?
     * @returns {void} - Void.
     */
    @action.bound
    public setAdvancedSearchVisible(isOpen: boolean): void {
        this.workdeskbioUiStore.isAdvancedSearchVisible = isOpen;
    }

    /**
     * Устанавливает открытие/закрытие модального окна.
     * @param {boolean} isOpen - Открыто?
     * @returns {void} - Void.
     */
    @action.bound
    public setModalVisible(isOpen: boolean): void {
        this.workdeskbioUiStore.isModalVisible = isOpen;
    }

    /**
     * Устанавливает состояние меню (минимизированное/развернутое).
     * @param {boolean} isMinimized - Меню минимизировать?
     * @returns {void} - Void.
     */
    @action.bound
    public setIsMinimizedMenu(isMinimized: boolean): void {
        this.workdeskbioUiStore.isMinimizedMenu = isMinimized;
    }
}
