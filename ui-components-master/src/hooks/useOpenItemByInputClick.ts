import { useEffect } from 'react';

import { MouseKeys } from '../enums/mouse-keys.enum';

/**
 * Добавляет обработчик открытия элемента по клику на инпут.
 * @param {React.RefObject<HTMLInputElement>} ref - Ссылка на инпут.
 * @param {() => void} handler - Обработчик.
 * @param {boolean} isExecuteHandler - Выполнять обработчик?
 * @returns {void}
 */
export function useOpenItemByInputClick(
    ref: React.RefObject<HTMLInputElement>,
    handler: () => void,
    isExecuteHandler: boolean
): void {
    useEffect(() => {
        let isContainsTarget: boolean | undefined;

        const handleClick = (event: MouseEvent): void => {
            const { target } = event;

            isContainsTarget = target instanceof Node && ref.current?.contains(target);

            if (isContainsTarget) {
                if (!isExecuteHandler) return;

                handler();
            }
        };

        window.addEventListener(MouseKeys.click, handleClick);

        return () => {
            isExecuteHandler && isContainsTarget && window.removeEventListener(MouseKeys.click, handleClick);
        };
    }, [handler, ref, isExecuteHandler]);
}
