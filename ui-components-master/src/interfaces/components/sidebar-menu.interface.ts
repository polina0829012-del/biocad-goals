import { LinkTargetTypes } from '../../enums/links-target-types.enum';

/**
 * Интерфейс ссылок подсекции.
 * @prop {string} label - Название ссылки.
 * @prop {string} link - Ссылка.
 * @prop {LinkTargetTypes} target - Атрибут таргет для ссылки.
 * @prop {boolean | undefined} isBlue - Голубая ссылка или нет.
 */
export interface IPart {
    label: string,
    link: string,
    target: LinkTargetTypes;
    isBlue?: boolean,
}

/**
 * Интерфейс подсекции раздела.
 * @prop {FunctionComponent} partName - Заголовок подсекции.
 * @prop {IPart[]} parts - Ссылки подсекции.
 * @prop {string | undefined} buttonLabel - Лейбл кнопки перехода на страницу.
 * @prop {string | undefined} buttonLink - Ссылка перехода на страницу.
 */
export interface ISubsectionParts {
    partName: string, 
    parts: IPart[],
    buttonLabel?: string,
    buttonLink?: string,
}

/**
 * Интерфейс раздела элемента меню.
 * @prop {string} sectionTitle - Заголовок раздела.
 * @prop {React.FunctionComponent<React.SVGProps<SVGSVGElement>>} sectionIcon - Иконка раздела.
 * @prop {ISubsectionParts[] | undefined} subsectionParts - Подсекции раздела.
 * @prop {string | undefined} landingPage - Посадочная страница.
 * @prop {LinkTargetTypes | undefined} target - Атрибут таргет для ссылки.
 */
export interface ISubMenuItems {
    sectionTitle: string, 
    sectionIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    subsectionParts?: ISubsectionParts[],
    landingPage?: string;
    target?: LinkTargetTypes;
}

/**
 * Интерфейс навигационной панели.
 * @prop {React.FunctionComponent<React.SVGProps<SVGSVGElement>>} icon - Иконка элемента меню.
 * @prop {string} label - Название элемента меню.
 * @prop {ISubMenuItems[]} subMenuItems - Разделы элемента меню.
 * @prop {React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined} titleIcon - Иконка заголовка меню.
 * @prop {string | undefined} landingPage - Посадочная страница.
 * @prop {LinkTargetTypes | undefined} target - Атрибут таргет для ссылки.
 * @prop {string | undefined} link - Ссылка на раздел.
 */
export interface ISidebarMenu {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    label: string, 
    subMenuItems: ISubMenuItems[],
    titleIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    landingPage?: string;
    target?: LinkTargetTypes;
    link?: string,
}