import { FC, FunctionComponent, SVGProps } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Heading } from '../../../../common/atoms/Heading/Heading';

import { HeadingTags } from '../../../../../enums/heading-tags.enum';
import { cutUrlForOpenBlankOrSelf } from '../../../../../utils/cut-url-for-open-blank-or-self';

import styles from './MenuItemLink.module.css';

/**
 * Интерфейс пропсов ссылки меню.
 * @prop {string} label - Название пункта меню.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>} icon - Иконка пункта меню.
 * @prop {string} link - Ссылка пункта меню.
 * @prop {boolean} isMinimized - Состояние минимизированного меню.
 * @prop {() => void} minimizedMenuAfterChoice - Функция минимизации меню после выбора пункта.
 * @prop {() => void} handleCloseMenu - Меняет состояние открытого/закрытого меню.
 */
export interface MenuItemLinkPropsInterface {
    label: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }> | undefined;
    link: string;
    isMinimized: boolean;
    minimizedMenuAfterChoice: () => void;
    handleCloseMenu: () => void;
}

/**
 * Компонент ссылки пункта меню.
 * @param {MenuItemLinkPropsInterface} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const MenuItemLink: FC<MenuItemLinkPropsInterface> = ({
    icon,
    link,
    label,
    isMinimized,
    minimizedMenuAfterChoice,
    handleCloseMenu,
}) => {
    const MenuItemIcon = icon;

    const linkInfo = cutUrlForOpenBlankOrSelf(link);

    return (
        <div className={styles.menuItem} onClick={minimizedMenuAfterChoice} onMouseMove={handleCloseMenu}>
            <NavLink
                end
                to={linkInfo.url}
                className={({ isActive }) =>
                    classNames(styles.link, isMinimized && styles.linkMinimized, isActive && styles.linkActive)
                }
                target={linkInfo.target}
            >
                <div className={styles.menuIcon}>{MenuItemIcon ? <MenuItemIcon /> : null}</div>
                {!isMinimized && <Heading tag={HeadingTags.h6} text={label} className={styles.linkLabel} />}
            </NavLink>
        </div>
    );
};
