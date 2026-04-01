import { useEffect } from 'react';

import { KeyboardKeys } from '../enums/keyboard-keys.enum';

/**
 * Добавляет разворачивание или закрытие элемента нажатием кнопки.
 * @param {string} keyName - Название кнопки на латинице.
 * @param {(value: any) => void} toggleOpenHandler - Обработчик переключения открытия/закрытия.
 * @param {boolean} isOpen - Состояния открытия/закрытия элемента.
 * @param {React.RefObject<any> | undefined} ref - Ссылка на элемент.
 */
export function useToggleByKeyboardKey(
    keyName: string,
    toggleOpenHandler: (value: any) => void,
    isOpen: boolean,
    ref?: React.RefObject<any>
): void {
    useEffect(() => {
        // Если нет ref вешается глобальный обработчик на document.
        const item = ref?.current ?? document;

        const handleEnterKeyDown = (event: KeyboardEvent): void => {
            if (event.key === keyName) {
                toggleOpenHandler(!isOpen);
            }
        };

        item?.addEventListener(KeyboardKeys.keydown, handleEnterKeyDown);

        return () => {
            item?.removeEventListener(KeyboardKeys.keydown, handleEnterKeyDown);
        };
    }, [toggleOpenHandler, isOpen, ref, keyName]);
}
