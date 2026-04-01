import React, { FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

import { AdvancedSearchResults } from '../../../features/AdvancedSearch/organisms/AdvancedSearchResults/AdvancedSearchResults';

import { FullSearchingResultDto } from '../../../../models/api/clients/full-searching-result.dto';
import { TextVariations } from '../../../../enums/text/text-variations.enum';
import { InputTypes } from '../../../../enums/input-types.enum';
import { ServiceNames } from '../../../../enums/service-names.enum';
import { StoreNames } from '../../../../enums/store-names.enum';

import { WorkdeskbioService } from '../../../../state/service/workdeskbio.service';
import { WorkdeskbioUiService } from '../../../../state/service/workdeskbio-ui.service';
import { WorkdeskbioUiStore } from '../../../../state/store/workdeskbio-ui.store';
import { useDebounce } from '../../../../hooks/useDebounce';
import { convertFromJson } from '../../../../helpers/convert-from-json.helper';
import { LETTER_MIN_COUNT, TAKE_RESULTS } from '../../../../global/constants/quick-search';
import localization from '../../../../localization/ru/translation.json';

import styles from './QuickSearch.module.css';

/**
 * Интерфейс пропсов быстрого глобального поиска.
 * @prop {React.ReactNode | undefined} icon - Иконка поиска.
 * @prop {string | undefined} containerClassName - Стиль контейнера.
 * @prop {ReactElement | undefined} categorySelector - Селектор категории.
 * @prop {string | undefined} selectClassName - Стиль блока селекта (выбор категории).
 * @prop {TextVariations | undefined} textVariation - Стиль текста.
 * @prop {string | undefined} placeholder - Плейсхолдер.
 * @prop {string | undefined} hcmWorkdeskbioLink - Ссылка на HCM-workdeskbio.
 * @prop {WorkdeskbioService | undefined} workdeskbioService - Сервис для работы с данными workdeskbio.
 * @prop {WorkdeskbioUiStore | undefined} workdeskbioUiStore - Хранилище для работы с UI.
 * @prop {WorkdeskbioUiService | undefined} workdeskbioUiService - Сервис для работы с UI.
 */
export interface IQuickSearchProps extends React.HTMLAttributes<string | boolean | number | HTMLInputElement> {
    icon?: React.ReactNode;
    containerClassName?: string;
    categorySelector?: ReactElement;
    selectClassName?: string;
    textVariation?: TextVariations;
    placeholder?: string;
    hcmWorkdeskbioLink?: string;
    workdeskbioService?: WorkdeskbioService;
    workdeskbioUiStore?: WorkdeskbioUiStore;
    workdeskbioUiService?: WorkdeskbioUiService;
}

/**
 * Компонент быстрого глобального поиска.
 * @param {IQuickSearchProps} params - Входные параметры компонента HTMLAttributes для HTMLInputElement.
 * @returns {ReactElement} React-элемент.
 */
export const QuickSearch: FC<IQuickSearchProps> = inject(
    ServiceNames.workdeskbioService,
    ServiceNames.workdeskbioUiService,
    StoreNames.workdeskbioUiStore
)(
    observer(
        ({
            containerClassName,
            categorySelector,
            icon,
            selectClassName,
            hcmWorkdeskbioLink,
            workdeskbioService,
            workdeskbioUiStore,
            workdeskbioUiService,
            textVariation = TextVariations.textSmall,
            ...inputProps
        }) => {
            const [searchValue, setSearchValue] = useState<string>('');

            const [searchResults, setSearchResults] = useState<FullSearchingResultDto | null>(null);

            const [noResultMessage, setNoResultMessage] = useState<string | null>(null);

            const [isLoadingLlmAnswer, setIsLoadingLlmAnswer] = useState(true);

            const inputRef = useRef<HTMLInputElement>(null);

            const searchResultCacheRef = useRef<Map<string, FullSearchingResultDto>>(new Map());

            const debouncedSearchValue = useDebounce(searchValue);

            const location = useLocation();

            /** Эффектит очищение поля поиска при переходе на другую страницу. */
            useEffect(() => {
                setSearchValue('');
            }, [location]);

            /** Эффектит очищение списка поиска и устанавливает сообщение о результате. */
            useEffect(() => {
                if (debouncedSearchValue.length === 0) {
                    setSearchResults(null);
                    return setNoResultMessage(null);
                }

                if (debouncedSearchValue.length < LETTER_MIN_COUNT) {
                    setSearchResults(null);
                    return setNoResultMessage(localization.shortThanThreeSymbols);
                }
            }, [debouncedSearchValue]);

            /** Устанавливает значение поиска.
             * @param {FullSearchingResultDto | undefined | null} results - Результаты поиска.
             * @returns {void}
             */
            const setSearchResult = (results?: FullSearchingResultDto | null): void => {
                if (results) {
                    const searchResults = results.answerByLlm ? localization.noResultSearch : null;

                    setNoResultMessage(searchResults);

                    setSearchResults((prevState) =>
                        convertFromJson(FullSearchingResultDto, { ...prevState, ...results })
                    );
                } else {
                    setSearchResults(null);

                    setNoResultMessage(localization.noResultSearch);
                }
            };

            /**
             * Получает результаты поиска.
             * @returns {Promise<void>}
             */
            const getSearchResults = async (): Promise<void> => {
                const fullSearchResults = new FullSearchingResultDto();

                void workdeskbioService?.search(debouncedSearchValue, TAKE_RESULTS).then((results) => {
                    fullSearchResults.usersAndSubdivisions = results;

                    setSearchResult(fullSearchResults);
                });

                void workdeskbioService?.searchByLlm(debouncedSearchValue).then((results) => {
                    fullSearchResults.resultsByLlm = results;

                    setSearchResult(fullSearchResults);
                });

                setIsLoadingLlmAnswer(true);

                void workdeskbioService?.getLlmAnswer(debouncedSearchValue).then((results) => {
                    fullSearchResults.answerByLlm = results;

                    setSearchResult(fullSearchResults);

                    setIsLoadingLlmAnswer(false);
                });

                fullSearchResults && searchResultCacheRef.current.set(searchValue, fullSearchResults);
            };

            /**
             * Эффектит загрузку результатов поиска.
             */
            useEffect(() => {
                if (debouncedSearchValue.length < LETTER_MIN_COUNT) return;

                // Устанавливает то же значение если оно закэшированно или загружает данные.
                if (searchResultCacheRef.current.has(searchValue)) {
                    const cacheResult = searchResultCacheRef.current.get(searchValue);

                    cacheResult && setSearchResults(cacheResult);
                } else {
                    void getSearchResults();
                }
            }, [debouncedSearchValue]);

            /** Не открывает поисковую область, пока пользователь не начнет вводить. */
            useEffect(() => {
                workdeskbioUiService?.setAdvancedSearchVisible(Boolean(debouncedSearchValue));
            }, [debouncedSearchValue, workdeskbioUiService]);

            /**
             * Обрабатывает события инпута устанавливая значение поиска.
             * @param {React.ChangeEvent<HTMLInputElement>} event - Событие инпута.
             * @returns {void} - Исполняет функцию установки значения поиска.
             */
            const onInputHandler = useCallback(
                (event: React.ChangeEvent<HTMLInputElement>): void => {
                    setSearchValue?.((event.target as HTMLInputElement).value);
                },
                [setSearchValue]
            );

            return (
                <>
                    {workdeskbioUiStore?.isAdvancedSearchVisible && <div className={styles.overlay} />}
                    <div className={classNames(styles.container, containerClassName)}>
                        <div className={styles.quickSearchContainer}>
                            <div className={styles.search}>
                                <input
                                    type={InputTypes.text}
                                    ref={inputRef}
                                    className={styles.searchInput}
                                    onInput={onInputHandler}
                                    value={searchValue}
                                    {...inputProps}
                                />
                            </div>
                            {icon}
                        </div>
                        {workdeskbioUiStore?.isAdvancedSearchVisible && (
                            <AdvancedSearchResults
                                inputRef={inputRef}
                                searchResults={searchResults ?? null}
                                noResultMessage={noResultMessage}
                                isLoadingLlmAnswer={isLoadingLlmAnswer}
                                containerClassName={styles.advancedSearchResultsInHeader}
                                hcmWorkdeskbioLink={hcmWorkdeskbioLink}
                            />
                        )}
                    </div>
                </>
            );
        }
    )
);
