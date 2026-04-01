import { useEffect } from 'react';

import { MouseKeys } from '../enums/mouse-keys.enum';

/**
 * Добавляет обработчик закрытие элемента по клику во вне.
 * @param {Array<React.RefObject<any>>} refs - Массив ссылок элементов клик по которым не закрывает.
 * @param {() => void} handler - Обработчик закрытия.
 */
export function useCloseItemByOutsideClick(refs: Array<React.RefObject<any>>, handler: () => void): void {
    useEffect(() => {
        const handleClick = (event: MouseEvent): void => {
            const { target } = event;

            const targetProps = { ...target };

            /** Обработка кейса когда компонент уже размонтировался. (Модальные окна) */
            const isEmptyTarget = Object.keys(targetProps).length === 0;

            const noClickedElements = refs.every((ref) => !ref.current?.contains(target));

            /** Если в рефах есть не кликнутые элементы и таргет не пустой. */
            if (target instanceof Node && noClickedElements && !isEmptyTarget) {
                handler();
            }
        };

        window.addEventListener(MouseKeys.click, handleClick);

        return () => {
            window.removeEventListener(MouseKeys.click, handleClick);
        };
    }, [handler, refs]);
}
