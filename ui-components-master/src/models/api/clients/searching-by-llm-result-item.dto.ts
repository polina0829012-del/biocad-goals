import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../baseDto';

/**
 * DTO Элемент результатов поиска LLm.
 * @prop {string | null} title - Название.
 * @prop {string | null} url - Ссылка.
 * @prop {number | null} relevanceScore - Очки релевантности.
 * @prop {number | null} publishingDate - Дата публикации.
 * @prop {number | null} summary - Краткое описание.
 */
export class SearchingResultByLlmItemDto extends BaseDto {
    @jsonProperty(String, null)
    public title: string | null = null;

    @jsonProperty(String, null)
    public url: string | null = null;

    @jsonProperty(Number, null)
    public relevanceScore: number | null = null;

    @jsonProperty(String, null)
    public publishingDate: string | null = null;

    @jsonProperty(String, null)
    public summary: string | null = null;
}
