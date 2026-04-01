import { useEffect } from 'react';

import { OverflowStyles } from '../enums/overflow-styles.enum';

/**
 * Блокирует скролл страницы.
 * @param {boolean} isBlockScroll - Прокрутка заблокирована?
 * @returns {void}
 */
export function useBlockScroll(isBlockScroll: boolean): void {
    /**
     * Эффектим блокирование скролла страницы.
     */
    useEffect(() => {
        const bodyHTMLElement = document.body;
        const htmlElement = document.documentElement;

        const hasPageVerticalScroll = htmlElement.scrollHeight > htmlElement.clientHeight;
        const scrollbarWidth = hasPageVerticalScroll ? window.innerWidth - htmlElement.clientWidth : 0;

        const initialBodyPadding = parseInt(window.getComputedStyle(bodyHTMLElement).paddingRight, 10);

        /**
         * Устанавливает свойство переполнения для body.
         * @param {OverflowStyles} style - Стиль перекрытия.
         * @returns {void} Void.
         */
        const setOverflow = (style: OverflowStyles): void => {
            bodyHTMLElement.style.overflow = style;
            htmlElement.style.overflow = style;
        };

        /**
         * Устанавливает свойство переполнения для body видимым.
         * @returns {void} Void.
         */
        const setOverflowVisible = (): void => {
            if (hasPageVerticalScroll) {
                bodyHTMLElement.style.paddingRight = '0px';
            }

            setOverflow(OverflowStyles.visible);
        };

        if (isBlockScroll) {
            if (hasPageVerticalScroll) {
                bodyHTMLElement.style.paddingRight = `${initialBodyPadding + scrollbarWidth}px`;
            }

            setOverflow(OverflowStyles.hidden);
        } else {
            setOverflowVisible();
        }

        return () => setOverflowVisible();
    }, [isBlockScroll]);
}
