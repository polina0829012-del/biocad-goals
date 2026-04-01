import { FunctionComponent, SVGProps, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { SidebarMenuItem } from '../../organisms/SidebarMenuItem/SidebarMenuItem';
import { MenuItemChapter } from '../../molecules/MenuItemChapter/MenuItemChapter';
import { MenuItemLink } from '../../molecules/MenuItemLink/MenuItemLink';

import { MenuItemDto } from '../../../../../models/menu/menu-item.dto';
import { FontWeights } from '../../../../../enums/font-weights.enum';

import styles from './MenuItem.module.css';

/**
 * Интерфейс пропсов элементов меню.
 * @prop {string} label - Название пункта меню.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>} icon - Иконка пункта меню.
 * @prop {boolean} isMinimized - Состояние минимизированного меню.
 * @prop {() => void} minimizedMenuAfterChoice - Функция минимизации меню после выбора пункта.
 * @prop {boolean} isSubmenuOpen - Состояние подменю.
 * @prop {(label: string) => void} openMenu - Функция клика на выбранный пункт меню.
 * @prop {boolean} isExpandFromMinimized - Состояние открытого подменю из минимизированного состояния.
 * @prop {() => void} handleCloseMenu - Меняет состояние открытого/закрытого меню.
 * @prop {string | null} domainOpenLabel - Значение открытой секции.
 * @prop {MenuItemDto[] | undefined} subMenuList - Массив названий и ссылок элементов submenu.
 * @prop {string | undefined} link - Ссылка на домен.
 * @prop {string | undefined} menuWidth - Ширина меню.
 */
export interface MenuItemPropsInterface {
    label: string;
    isMinimized: boolean;
    minimizedMenuAfterChoice: () => void;
    isSubmenuOpen: boolean;
    openMenu: (label: string) => void;
    isExpandFromMinimized: boolean;
    handleCloseMenu: () => void;
    domainOpenLabel: string | null;
    icon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
    subMenuList?: MenuItemDto[];
    link?: string | null;
    menuWidth?: string;
}

/**
 * Компонент пункта меню.
 * @param {MenuItemPropsInterface} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const MenuItem: React.FC<MenuItemPropsInterface> = ({
    link,
    icon,
    label,
    subMenuList,
    isMinimized,
    minimizedMenuAfterChoice,
    isSubmenuOpen,
    domainOpenLabel,
    openMenu,
    isExpandFromMinimized,
    handleCloseMenu,
    menuWidth,
}: MenuItemPropsInterface) => {
    const location = useLocation();

    /** Состояние совпадения ссылки и раздела под-меню. */
    const [isMatchLocationChapter, setIsMatchLocationChapter] = useState<boolean>(false);

    /** Состояние открытого раздела. */
    const [isDomainOpen, setIsDomainOpen] = useState<boolean>(false);

    /** Определяет, находится ли активная ссылка в разделе под-меню или нет. */
    useEffect(() => {
        const isMatchPath = link === location.pathname;

        setIsMatchLocationChapter(isMatchPath);
    }, [location, subMenuList, isMinimized, link]);

    /** Определяет, открыт ли раздел домена. */
    useEffect(() => {
        const isDomainLabelOpen = domainOpenLabel === label;

        setIsDomainOpen(isDomainLabelOpen);
    }, [domainOpenLabel, label]);

    const hasSideBar = Boolean(subMenuList && subMenuList.length > 0);

    /**
     * Компонент раздела меню.
     */
    const menuChapterComponent = useMemo(
        () => (
            <div
                className={classnames(styles.menuMainItem, isDomainOpen && styles.menuItemOpenChapter)}
                onMouseMove={() => openMenu(label)}
            >
                <MenuItemChapter
                    link={link}
                    icon={icon}
                    label={label}
                    isMinimized={isMinimized}
                    isActive={isMatchLocationChapter}
                    className={classnames(isDomainOpen && (styles.menuOpenChapterItem, FontWeights.bold))}
                    isOpenChapter={isDomainOpen}
                    isShowSidebarArrow={hasSideBar}
                />
            </div>
        ),
        [icon, isDomainOpen, isMatchLocationChapter, isMinimized, label, openMenu]
    );

    if (link != null && link.length > 0 && !hasSideBar) {
        return (
            <MenuItemLink
                link={link}
                label={label}
                icon={icon}
                isMinimized={isMinimized}
                minimizedMenuAfterChoice={minimizedMenuAfterChoice}
                handleCloseMenu={handleCloseMenu}
            />
        );
    }

    return (
        <>
            {menuChapterComponent}
            {hasSideBar && subMenuList && (
                <SidebarMenuItem
                    subMenuItems={subMenuList}
                    title={label}
                    icon={icon}
                    isExpandFromMinimized={isExpandFromMinimized}
                    isOpen={isSubmenuOpen}
                    isDomainOpen={isDomainOpen}
                    handleCloseMenu={handleCloseMenu}
                    menuWidth={menuWidth}
                />
            )}
        </>
    );
};
