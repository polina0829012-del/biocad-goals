import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../baseDto';
import { SearchingResultByLlmItemDto } from './searching-by-llm-result-item.dto';

/**
 * DTO Результатов поиска.
 * @prop {SearchingResultByLlmItemDto[] | null} FAQ - Ответы и вопросы.
 * @prop {SearchingResultByLlmItemDto[] | null} processInstructions - Процессы и инструкции.
 * @prop {SearchingResultByLlmItemDto[] | null} selfServicePortal - Воркдеск самообслуживания.
 * @prop {SearchingResultByLlmItemDto[] | null} news - Новости.
 * @prop {SearchingResultByLlmItemDto[] | null} drugs - Препараты.
 */
export class SearchingResultByLlmSourcesDto extends BaseDto {
    @jsonProperty([SearchingResultByLlmItemDto], null)
    public FAQ: SearchingResultByLlmItemDto[] | null = null;

    @jsonProperty([SearchingResultByLlmItemDto], null)
    public processInstructions: SearchingResultByLlmItemDto[] | null = null;

    @jsonProperty([SearchingResultByLlmItemDto], null)
    public selfServicePortal: SearchingResultByLlmItemDto[] | null = null;

    @jsonProperty([SearchingResultByLlmItemDto], null)
    public news: SearchingResultByLlmItemDto[] | null = null;

    @jsonProperty([SearchingResultByLlmItemDto], null)
    public drugs: SearchingResultByLlmItemDto[] | null = null;
}
