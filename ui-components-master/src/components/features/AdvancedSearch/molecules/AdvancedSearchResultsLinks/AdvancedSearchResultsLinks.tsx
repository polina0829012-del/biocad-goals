import { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';

import { IAdvancedSearchResultsLink } from '../../../../../interfaces/components/advanced-search-results-link.interface';
import { TextVariations } from '../../../../../enums/text/text-variations.enum';
import { FontWeights } from '../../../../../enums/text/font-weights.enum';
import { LinkTargetTypes } from '../../../../../enums/links-target-types.enum';
import { WindowEvents } from '../../../../../enums/window-events.enum';

import { createTextProps } from '../../../../../helpers/text/create-text-props.helper';
import { getFullDateWithStringMonth } from '../../../../../helpers/dates.helper';

import styles from './AdvancedSearchResultsLinks.module.css';

/**
 * Интерфейс пропсов результатов поиска с ссылками.
 * @prop {string} title - Название.
 * @prop {IAdvancedSearchResultsLink[] | undefined} items - Элементы ссылок.
 * @prop {boolean | undefined} isOpenInNewTab - Открывать ссылки в новом окне?
 */
interface IAdvancedSearchResultsLinksProps {
    title: string;
    items?: IAdvancedSearchResultsLink[];
    isOpenInNewTab?: boolean;
}

/**
 * Компонент результатов поиска с ссылками.
 * @param {IAdvancedSearchResultsLinksProps} params - Входные параметры компонента поиска с ссылками.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const AdvancedSearchResultsLinks: FC<IAdvancedSearchResultsLinksProps> = ({
    title,
    isOpenInNewTab,
    items = [],
}) => {
    const navigate = useNavigate();

    const [visibleCount, setVisibleCount] = useState<number>(items.length);

    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    const cardRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

    const containerRef = useRef<HTMLDivElement>(null);

    /** Инициализируем рефы для каждой карточки. */
    cardRefs.current = items.map((_, i) => cardRefs.current[i] || React.createRef<HTMLDivElement>());

    /**
     * Вычисляет, сколько карточек помещается в контейнер по высоте.
     * @returns {void}
     */
    const calculateVisibleCards = useCallback(() => {
        if (!containerRef.current) return;

        const containerMaxHeight = 340;

        const cards = cardRefs.current.map((ref) => ref.current).filter((card) => card !== null) as HTMLDivElement[];

        let totalHeight = 0;

        let count = 0;

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];

            const cardStyle = getComputedStyle(card);

            const marginBottom = parseFloat(cardStyle.marginBottom) || 0;

            const cardHeight = card.offsetHeight + marginBottom;

            if (totalHeight + cardHeight <= containerMaxHeight) {
                totalHeight += cardHeight;
                count += 1;
            } else {
                break;
            }
        }

        // Устанавливает состояние isOverflow, если контента больше, чем контейнер.
        if (count < items.length) {
            setVisibleCount(count);

            setIsOverflow(true);
        } else {
            setVisibleCount(items.length);

            setIsOverflow(false);
        }
    }, [items.length]);

    /** Вычисляет количество видимых карточек после первого рендера и при изменении размера окна. */
    useLayoutEffect(() => {
        calculateVisibleCards();
    }, [calculateVisibleCards]);

    /**
     * Дебаунс для функции calculateVisibleCards
     * @param {Function} method - Функция.
     * @param {number} milliseconds - Сколько ждем в мс.
     * @returns {(...args: any[]) => void} - Функция установленная в таймаут.
     */
    const debounce = (method: Function, milliseconds: number): ((...args: any[]) => void) => {
        let timeout: NodeJS.Timeout;

        return (...args: any[]) => {
            clearTimeout(timeout);

            timeout = setTimeout(() => method(...args), milliseconds);
        };
    };

    /** Устанавливается задержка в 100мс для дебаунса и корректной отрисовки. */
    const debouncedCalculate = useCallback(() => debounce(calculateVisibleCards, 100), [calculateVisibleCards]);

    /** Вычисляет количество видимых карточек после первого рендера и при изменении размера окна. */
    useEffect(() => {
        window.addEventListener(WindowEvents.resize, debouncedCalculate);

        return () => {
            window.removeEventListener(WindowEvents.resize, debouncedCalculate);
        };
    }, [debouncedCalculate]);

    /** Открывает ссылку по клику.
     * @params {string} url - Путь.
     * @returns {void} - Void.
     */
    const onClickOpenLink = (url: string): void => {
        if (!url) return;

        if (isOpenInNewTab) {
            window.open(url, LinkTargetTypes.blank);
        } else {
            const domainWithProtocol = `${window.location.protocol}//${window.location.host}`;

            const isDomain = url.startsWith(domainWithProtocol);

            if (isDomain) {
                const path = url.split(domainWithProtocol)[1];

                // Открываем ссылку в приложении без перезагрузки страницы.
                navigate(path);
            } else {
                // Открываем ссылку в текущей вкладке, если не установлен флаг открытия в новой вкладке.
                window.open(url, LinkTargetTypes.self);
            }
        }
    };

    return (
        <div className={styles.container}>
            <TextComponent
                {...createTextProps({
                    text: title,
                    weight: FontWeights.bold,
                    className: styles.sectionTitle,
                })}
            />
            <div ref={containerRef}>
                {items.slice(0, visibleCount).map((item, index) => (
                    <div
                        ref={cardRefs.current[index]}
                        className={styles.item}
                        key={index}
                        onClick={() => item.url && onClickOpenLink(item.url)}
                    >
                        <TextComponent
                            {...createTextProps({
                                text: item.title,
                            })}
                        />
                        {item.description && (
                            <TextComponent
                                {...createTextProps({
                                    text: item.description,
                                    textVariation: TextVariations.textSmall,
                                    className: styles.itemDescription,
                                })}
                            />
                        )}
                        {item.summary && (
                            <TextComponent
                                {...createTextProps({
                                    text: item.summary,
                                    textVariation: TextVariations.textSmall,
                                    className: styles.itemDescription,
                                })}
                            />
                        )}
                        {item.publishingDate && (
                            <TextComponent
                                {...createTextProps({
                                    text: getFullDateWithStringMonth(item.publishingDate),
                                    textVariation: TextVariations.textSmall,
                                    className: styles.itemDate,
                                })}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
