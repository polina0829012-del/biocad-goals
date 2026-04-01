import { jsonProperty } from 'ts-serializable';

import { BaseDto } from '../baseDto';
import { SearchingByLlmResultDto } from './searching-by-llm-result.dto';
import { SearchingResultDto } from './searching-result.dto';

/**
 * DTO Результатов поиска.
 * @prop {SearchingResultDto} usersAndSubdivisions - Пользователи и подразделения.
 * @prop {SearchingByLlmResultDto} resultsByLlm - Результаты поиска Llm.
 * @prop {string} answerByLlm - Результаты поиска Llm.
 */
export class FullSearchingResultDto extends BaseDto {
    @jsonProperty(SearchingResultDto, null)
    public usersAndSubdivisions: SearchingResultDto | null = null;

    @jsonProperty(SearchingByLlmResultDto, null)
    public resultsByLlm: SearchingByLlmResultDto | null = null;

    @jsonProperty(String, null)
    public answerByLlm: string | null = null;
}
