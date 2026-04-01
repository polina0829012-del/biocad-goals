import { useState, useEffect } from 'react';

import { DEFAULT_DELAY_FOR_DEBOUNCE } from '../global/constants/delay';

/**
 * Дебаунсит введенное значение.
 * @param {valueType} value - Значение.
 * @param {number | undefined} delay - Задержка в миллисекундах.
 * @returns {valueType} Дебаунсенное значение.
 */
export function useDebounce<valueType>(value: valueType, delay: number = DEFAULT_DELAY_FOR_DEBOUNCE): valueType {
    const [debouncedValue, setDebouncedValue] = useState(value);

    /**
     * Устанавливает хэндлер таймера задержки.
     */
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
