import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../baseDto';
import { SearchingResultByLlmSourcesDto } from './searching-by-llm-result-sources.dto';

/**
 * DTO Результаты поиска LLm.
 * @prop {SearchingResultByLlmSourcesDto | null} sources - Источники результатов.
 */
export class SearchingByLlmResultDto extends BaseDto {
    @jsonProperty(SearchingResultByLlmSourcesDto, null)
    public sources: SearchingResultByLlmSourcesDto | null = null;
}
