import { LinkTargetTypes } from '../enums/links-target-types.enum';

/**
 * Интерфейс ссылки для открытия в новой вкладке или в текущей.
 * @prop {string} url - Ссылка.
 * @prop {LinkTargetTypes} target - Тип открытия.
 */
interface ILinkForOpenBlankOrSelf {
    url: string;
    target: LinkTargetTypes;
}

/**
 * Обрезает ссылку для открытия в новой вкладке или в текущей.
 * @param {string} url - Ссылка.
 * @returns {string} - Обрезанная ссылка.
 */
export const cutUrlForOpenBlankOrSelf = (url: string): ILinkForOpenBlankOrSelf => {
    const domainWithProtocol = `${window.location.protocol}//${window.location.host}`;

    const isDomain = url.startsWith(domainWithProtocol);

    const link = new URL(url);

    const internalLink = link.pathname + link.search + link.hash;

    return {
        url: isDomain ? internalLink : url,
        target: isDomain ? LinkTargetTypes.self : LinkTargetTypes.blank,
    };
};
