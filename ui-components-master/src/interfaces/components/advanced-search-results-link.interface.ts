/**
 * Интерфейс блока ссылок из поиска.
 * @prop {string} title - Заголовок.
 * @prop {string} description - Описание.
 * @prop {string | undefined} url - Ссылка.
 * @prop {string | undefined} date - Дата публикации.
 * @prop {string | undefined} summary - Краткое описание.
 */
export interface IAdvancedSearchResultsLink {
    title: string;
    description?: string;
    url?: string;
    publishingDate?: string;
    summary?: string;
}
