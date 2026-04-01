import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';

import { SquareCard } from '../../../../common/molecules/SquareCard/SquareCard';
import { Modal } from '../../../../common/molecules/Modal/Modal';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';
import { TextLink } from '../../../../common/atoms/TextLink/TextLink';
import { AdvancedSearchResultsLinks } from '../../molecules/AdvancedSearchResultsLinks/AdvancedSearchResultsLinks';
import { AdvancedSearchLlmAnswer } from '../../molecules/AdvancedSearchLlmAnswer/AdvancedSearchLlmAnswer';
import { UsersScrollList } from '../../../MainPageContent/molecules/UsersScrollList/UsersScrollList';

import { FullSearchingResultDto } from '../../../../../models/api/clients/full-searching-result.dto';
import { IAdvancedSearchResultsLink } from '../../../../../interfaces/components/advanced-search-results-link.interface';
import { IBaseComponentProps } from '../../../../../interfaces/components/common/base-component-props.interface';
import { KeyboardKeys } from '../../../../../enums/keyboard-keys.enum';
import { FontWeights } from '../../../../../enums/text/font-weights.enum';
import { ServiceNames } from '../../../../../enums/service-names.enum';
import { StoreNames } from '../../../../../enums/store-names.enum';
import { LinkTargetTypes } from '../../../../../enums/links-target-types.enum';
import { TextVariations } from '../../../../../enums/text/text-variations.enum';
import { UsersScrollListVariations } from '../../../../../enums/users-scroll-list-variations.enum';
import { ManagementStructureQueryParams } from '../../../../../enums/management-structure-query-params.enum';

import { useToggleByKeyboardKey } from '../../../../../hooks/useToggleByKeyboardKey';
import { useCloseItemByOutsideClick } from '../../../../../hooks/useCloseItemByOutsideClick';
import { useOpenItemByInputClick } from '../../../../../hooks/useOpenItemByInputClick';

import { WorkdeskbioUiService } from '../../../../../state/service/workdeskbio-ui.service';
import { WorkdeskbioUiStore } from '../../../../../state/store/workdeskbio-ui.store';
import { hasItemsInArray } from '../../../../../utils/has-items-in-array';
import { createTextProps } from '../../../../../helpers/text/create-text-props.helper';
import { ROUTE_LINKS } from '../../../../../global/constants/route-links';
import { CONSULTATOR_LINK } from '../../../../../global/constants/quick-search';
import SearchLocalization from '../../../../../localization/ru/quick-search/quick-search.json';

import styles from './AdvancedSearchResults.module.css';

/**
 * Интерфейс пропсов компонента результатов поиска.
 * @prop {React.RefObject<HTMLInputElement>} inputRef - Ссылка на dom элемент инпута.
 * @prop {FullSearchingResultDto | null} searchResults - Список результатов поиска.
 * @prop {string | null} noResultMessage - Сообщение о том что нет результатов.
 * @prop {boolean} isLoadingLlmAnswer - Ответ Llm загружается?
 * @prop {string | undefined} hcmWorkdeskbioLink - Ссылка на HCM-workdeskbio.
 * @prop {WorkdeskbioUiStore | undefined} workdeskbioUiStore - Хранилище для работы с UI.
 * @prop {WorkdeskbioUiService | undefined} workdeskbioUiService - Сервис для работы с UI.
 */
interface IAdvancedSearchResultsProps extends IBaseComponentProps {
    inputRef: React.RefObject<HTMLInputElement>;
    noResultMessage: string | null;
    searchResults: FullSearchingResultDto | null;
    isLoadingLlmAnswer: boolean;
    hcmWorkdeskbioLink?: string;
    workdeskbioUiStore?: WorkdeskbioUiStore;
    workdeskbioUiService?: WorkdeskbioUiService;
}

/**
 * Компонент результатов поиска.
 * @param {ISearchResultsProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const AdvancedSearchResults: FC<IAdvancedSearchResultsProps> = inject(
    ServiceNames.workdeskbioUiService,
    StoreNames.workdeskbioUiStore
)(
    observer(
        ({
            inputRef,
            searchResults,
            noResultMessage,
            isLoadingLlmAnswer,
            hcmWorkdeskbioLink,
            workdeskbioUiStore,
            workdeskbioUiService,
            containerClassName,
        }) => {
            const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

            const resultsRef = useRef<HTMLDivElement>(null);

            const navigate = useNavigate();

            const users = searchResults?.usersAndSubdivisions?.users;

            const subdivisions = searchResults?.usersAndSubdivisions?.subdivisions;

            const resultsByLlm = searchResults?.resultsByLlm?.sources;

            /** Открывает поиск если есть сообщение о пустом результате. */
            useEffect(() => {
                noResultMessage && workdeskbioUiService?.setAdvancedSearchVisible(true);
            }, [noResultMessage, searchResults]);

            /**
             * Открывает результаты поиска.
             * @param {boolean} isOpen - Открыть?
             * @returns {void} - Void.
             */
            const onOpenResults = (isOpen: boolean): void => {
                return workdeskbioUiService?.setAdvancedSearchVisible(isOpen);
            };

            /** Открывает плашку списка при клике на инпут. */
            useOpenItemByInputClick(
                inputRef,
                () => onOpenResults(true),
                Boolean(workdeskbioUiStore?.isAdvancedSearchVisible || noResultMessage)
            );

            /** Добавляет обработчик закрытия результатов поиска при клике во вне. */
            useCloseItemByOutsideClick([inputRef, resultsRef], () => onOpenResults(false));

            /** Вешаем обработчик события для закрытия по нажатию клавиши 'Escape'. */
            useToggleByKeyboardKey(KeyboardKeys.escape, onOpenResults, Boolean(workdeskbioUiStore?.isAdvancedSearchVisible));

            /**
             * По клику на пользователя переходит на его профиль.
             * @param {string | null} adLogin - Логин пользователя.
             * @returns {void} Void.
             */
            const onClickNavigate = (adLogin: string | null): void => {
                if (!adLogin) return;

                navigate(`${ROUTE_LINKS.PROFILE}/${adLogin}`);
            };

            /**
             * Создает ссылку на подразделение.
             * @param {number} id - Идентификатор
             * @returns {string} - Ссылка.
             */
            const createSubdivisionLink = (id: number): string => {
                const searchParams = new URLSearchParams();

                searchParams.set(ManagementStructureQueryParams.subdivisionId, String(id));

                return `${hcmWorkdeskbioLink ?? ''}${ROUTE_LINKS.MANAGEMENT_STRUCTURE_HCM}?${String(searchParams)}`;
            };

            const isNotResult = !searchResults || (searchResults && !(users || subdivisions));

            /** Разметка шапки карточки. */
            const cardHead = (
                <TextComponent
                    {...createTextProps({
                        text: SearchLocalization.quickAnswer,
                        weight: FontWeights.bold,
                    })}
                />
            );

            /** Создает объект элемента ссылок результатов поиска.
             * @param {string | null} title - Заголовок.
             * @param {string | null} url - Ссылка.
             * @param {string | null | undefined} description - Описание.
             * @param {string | null | undefined} publishingDate - Дата публикации.
             * @returns {IAdvancedSearchResultsLink} - Объект данных ссылки.
             */
            const createResultsLinksItem = (
                title: string | null,
                url: string | null,
                description?: string | null,
                publishingDate?: string | null
            ): IAdvancedSearchResultsLink =>
                ({
                    title: title ?? '',
                    url: url ?? '',
                    description: description ?? undefined,
                    publishingDate: publishingDate ?? undefined,
                } satisfies IAdvancedSearchResultsLink);

            /** Массив результатов для секции ссылок. */
            const linkSectionResults = useMemo(
                () => [
                    hasItemsInArray(subdivisions)
                        ? {
                              title: SearchLocalization.subdivisions,
                              items: subdivisions.map((item) =>
                                  createResultsLinksItem(item.name, createSubdivisionLink(item.id), item.parentName)
                              ),
                          }
                        : null,
                    hasItemsInArray(resultsByLlm?.processInstructions)
                        ? {
                              title: SearchLocalization.processInstruction,
                              items: resultsByLlm?.processInstructions.map((item) =>
                                  createResultsLinksItem(item.title, item.url)
                              ),
                          }
                        : null,
                    hasItemsInArray(resultsByLlm?.FAQ)
                        ? {
                              title: SearchLocalization.faq,
                              items: resultsByLlm?.FAQ.map((item) => createResultsLinksItem(item.title, item.url)),
                          }
                        : null,
                    hasItemsInArray(resultsByLlm?.selfServicePortal)
                        ? {
                              title: SearchLocalization.selfServicePortal,
                              items: resultsByLlm?.selfServicePortal.map((item) =>
                                  createResultsLinksItem(item.title, item.url)
                              ),
                          }
                        : null,
                    hasItemsInArray(resultsByLlm?.news)
                        ? {
                              title: SearchLocalization.news,
                              items: resultsByLlm?.news.map((item) =>
                                  createResultsLinksItem(item.title, item.url, item.summary, item.publishingDate)
                              ),
                          }
                        : null,
                    hasItemsInArray(resultsByLlm?.drugs)
                        ? {
                              title: SearchLocalization.drugs,
                              items: resultsByLlm?.drugs.map((item) => createResultsLinksItem(item.title, item.url)),
                          }
                        : null,
                ],
                [
                    resultsByLlm?.FAQ,
                    resultsByLlm?.processInstructions,
                    resultsByLlm?.selfServicePortal,
                    resultsByLlm?.news,
                    resultsByLlm?.drugs,
                    subdivisions,
                    hcmWorkdeskbioLink
                ]
            );

            const modalFooter = (
                <div className={classNames(styles.modalFooter, styles.inlineText)}>
                    <TextComponent
                        {...createTextProps({
                            text: SearchLocalization.answerBy,
                            textVariation: TextVariations.text,
                            className: styles.inlineText,
                        })}
                    />
                    <TextLink to={CONSULTATOR_LINK}>
                        <TextComponent
                            {...createTextProps({
                                text: SearchLocalization.consultator,
                                textVariation: TextVariations.text,
                                className: styles.inlineText,
                                weight: FontWeights.medium,
                            })}
                        />
                    </TextLink>
                </div>
            );

            /** Отображать секцию ссылок? */
            const isShowLinkSection = linkSectionResults.some((result) => result !== null);

            if (!workdeskbioUiStore?.isAdvancedSearchVisible) return null;

            return (
                <div ref={resultsRef} className={classNames(styles.results, containerClassName)} tabIndex={0}>
                    {isNotResult && noResultMessage ? (
                        <TextComponent text={noResultMessage} className={styles.noResultMessage} />
                    ) : (
                        <>
                            <div className={styles.usersAndAnswer}>
                                {users && users?.length > 0 && (
                                    <div className={styles.users}>
                                        <TextComponent
                                            {...createTextProps({
                                                text: SearchLocalization.users,
                                                weight: FontWeights.bold,
                                            })}
                                        />
                                        <UsersScrollList
                                            users={users}
                                            onClickNavigate={onClickNavigate}
                                            className={styles.usersList}
                                            variation={UsersScrollListVariations.search}
                                            hcmWorkdeskbioLink={hcmWorkdeskbioLink}
                                        />
                                    </div>
                                )}
                                <SquareCard
                                    className={styles.mlResults}
                                    head={cardHead}
                                    body={
                                        <AdvancedSearchLlmAnswer
                                            answerByLlm={searchResults?.answerByLlm}
                                            isLoadingLlmAnswer={isLoadingLlmAnswer}
                                            setIsModalOpen={setIsModalOpen}
                                        />
                                    }
                                />
                            </div>
                            {isShowLinkSection && (
                                <div className={styles.linksSection}>
                                    {linkSectionResults.map((element, index) => {
                                        if (!element) return null;

                                        return (
                                            <AdvancedSearchResultsLinks
                                                key={index}
                                                title={element?.title ?? ''}
                                                items={element?.items}
                                                isOpenInNewTab={element.title === SearchLocalization.selfServicePortal}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                    <Modal
                        title={SearchLocalization.quickAnswer}
                        className={styles.searchModal}
                        containerClassName={styles.searchModalContainer}
                        isCloseIcon
                        visible={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        content={
                            <>
                                <ReactMarkdown
                                    className={styles.markdownText}
                                    components={{
                                        a: ({ node, ...props }) => (
                                            <TextLink
                                                {...props}
                                                // eslint-disable-next-line react/prop-types -- Ошибка eslint.
                                                to={String(props.href)}
                                                target={LinkTargetTypes.blank}
                                            />
                                        ),
                                    }}
                                >
                                    {searchResults?.answerByLlm}
                                </ReactMarkdown>
                                {modalFooter}
                            </>
                        }
                    />
                </div>
            );
        }
    )
);
