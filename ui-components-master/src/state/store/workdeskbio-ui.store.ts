import { makeAutoObservable, observable } from 'mobx';

/**
 * Хранилище пользовательского интерфейса.
 */
export class WorkdeskbioUiStore {
    /**
     * Значение минимизированного меню.
     */
    @observable
    public isMinimizedContent: boolean = true;

    /**
     * Размер меню.
     */
    @observable
    public menuSize: string = '';

    /**
     * Координата скролла на странице.
     */
    @observable
    public staticContentScroll: number | null = null;

    /**
     * Поиск открыт?
     */
    @observable
    public isAdvancedSearchVisible: boolean = false;

    /**
     * Модальное окно открыто?
     */
    @observable
    public isModalVisible: boolean = false;

    /**
     * Состояние меню (минимизированное/развернутое).
     */
    @observable
    public isMinimizedMenu: boolean = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
