/**
 * Интерфейс цветовой палитры.
 * @prop {string} color - Изображение аватара (src).
 * @prop {string} backgroundColor - Инициалы.
 */
interface IColorPalette {
    color: string;
    backgroundColor: string;
}

/**
 * Возвращает случайную модель конфигурации цветов для автара из UI-kit.
 * @param { string[][]} colors - Цвета.
 * @returns {IColorPalette[]} - Модель данных с конфигурацией цветов.
 */

export const getRandomColors = (colors: string[][]): IColorPalette => {
    /**
     * Создает цветовую палитру из цвета подложки и цвета текста на ней.
     * @param {string} color - HEX-код цвета текста заглушки.
     * @param {string} backgroundColor - HEX-код цвета подложки заглушки.
     */
    const createColorPallete = (color: string, backgroundColor: string): IColorPalette => {
        return {
            color,
            backgroundColor,
        };
    };

    const allColorsPalette = colors.map((item) => createColorPallete(item[0], item[1]));

    const colorIndex = Math.floor(Math.random() * allColorsPalette.length);

    return allColorsPalette[colorIndex];
};
