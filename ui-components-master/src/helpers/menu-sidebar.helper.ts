import MenuLocalization from '../localization/ru/navigation-menu/navigation-menu.json';

/**
 * Проверяет заголовок для определения стиля обводки.
 * @param {string} title - Заголовок.
 * @returns {boolean} - Есть ли обводка?
 */
export const checkIsMenuStroke = (title: string): boolean => {
    const isMenuStroke = title === MenuLocalization.production || title === MenuLocalization.pharmaceuticalDevelopment;

    return isMenuStroke;
};

/**
 * Проверяет заголовок для определения стиля обводки.
 * @param {string} title - Заголовок.
 * @returns {boolean} - Есть ли тонкая обводка?
 */
export const checkIsMenuStrokeLess = (title: string): boolean => {
    const isMenuStrokeLess = title === MenuLocalization.clinicalStudies;

    return isMenuStrokeLess;
};
