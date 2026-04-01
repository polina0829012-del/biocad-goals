import { FC, FunctionComponent, SVGProps, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import { NavSidebarTitle } from '../../molecules/NavSidebarTitle/NavSidebarTitle';
import { ChapterItem } from '../../molecules/ChapterItem/ChapterItem';
import { ChapterPart } from '../../molecules/ChapterPart/ChapterPart';
import { Divider } from '../../../../common/atoms/Divider/Divider';

import { MenuItemDto } from '../../../../../models/menu/menu-item.dto';

import { cutUrlForOpenBlankOrSelf } from '../../../../../utils/cut-url-for-open-blank-or-self';
import { MENU_ICONS } from '../../../../../global/constants/menu/menu-icons';
import { MAX_IT_SECTIONS } from '../../../../../global/constants/menu/sidebar-menu';
import MenuLocalization from '../../../../../localization/ru/navigation-menu/navigation-menu.json';

import styles from './SidebarMenuItem.module.css';

/**
 * Интерфейс пропсов компонента открывающейся навигационной панели.
 * @prop {MenuItemDto[]} subMenuItems - Разделы, входящие в домен.
 * @prop {string} title - Заголовок пункта меню.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement>> | undefined} icon - Иконка пункта меню.
 * @prop {boolean} isExpandFromMinimized - Открывается ли меню из минимизированного состояния.
 * @prop {boolean} isOpen - Открыта ли боковая панель меню.
 * @prop {boolean} isDomainOpen - Выбран ли нужный домен.
 * @prop {() => void} handleCloseMenu - Меняет состояние открытого/закрытого меню.
 * @prop {string | undefined} menuWidth - Ширина меню.
 */
export interface ISidebarMenuItemProps {
    subMenuItems: MenuItemDto[];
    title: string;
    isExpandFromMinimized: boolean;
    isOpen: boolean;
    isDomainOpen: boolean;
    handleCloseMenu: () => void;
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    menuWidth?: string;
}

/**
 * Компонент открывающейся навигационной панели.
 * @param {ISidebarMenuItemProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const SidebarMenuItem: FC<ISidebarMenuItemProps> = ({
    subMenuItems,
    title,
    icon,
    isOpen,
    isExpandFromMinimized,
    isDomainOpen,
    menuWidth,
    handleCloseMenu,
}) => {
    const [itemIndex, setItemIndex] = useState<number>(0);

    /**
     * Обработчик события мышки при наведении на определенный раздел меню.
     * @param {number} index Индекс выбранного раздела.
     * @returns {void} Исполняет функцию установки значения индекса выбранного раздела.
     */
    const handleMouseMotion = useCallback(
        (index: number) => {
            setItemIndex(index);
        },
        [setItemIndex]
    );

    /** Массив подразделов входящих в выбранный раздел. */
    const chapterParts = useMemo(() => subMenuItems[itemIndex]?.childItems ?? [], [subMenuItems, itemIndex]);

    /** Класс для блока сайдбара. */
    const sidebarClassName = classNames(
        styles.container,
        isOpen && styles.openContainer,
        isDomainOpen && styles.openDomainContainer,
        isExpandFromMinimized && styles.containerFromMinimized
    );

    /** Блок IT и HR или нет. */
    const menuCategoriesItAndHrLinks = useMemo(
        () => (title === MenuLocalization.it || title === MenuLocalization.hr) && chapterParts.length > MAX_IT_SECTIONS,
        [title, chapterParts]
    );

    /** Левый отступ меню. */
    const sidebarMenuLeftPosition = useMemo(() => {
        return { left: menuWidth };
    }, [menuWidth]);

    return (
        <div className={sidebarClassName} style={sidebarMenuLeftPosition}>
            {isDomainOpen && (
                <>
                    <NavSidebarTitle title={title} icon={icon} />
                    <div className={styles.itemsContainer}>
                        <div className={styles.menuCategorySection}>
                            {subMenuItems.map((item, index) => {
                                const icon = MENU_ICONS.find((icon) => icon.iconId === item.iconId)?.component;

                                return (
                                    <ChapterItem
                                        key={index}
                                        sectionTitle={item.title ?? ''}
                                        icon={icon}
                                        isActive={itemIndex === index}
                                        handleMouseMotion={() => handleMouseMotion(index)}
                                        handleCloseMenu={handleCloseMenu}
                                        chapterLandingPageRoute={
                                            item.url ? cutUrlForOpenBlankOrSelf(item.url).url : undefined
                                        }
                                        target={item.url ? cutUrlForOpenBlankOrSelf(item.url).target : undefined}
                                    />
                                );
                            })}
                        </div>
                        {chapterParts.length !== 0 && (
                            <>
                                <Divider className={styles.menuItemDivider} />
                                <div
                                    className={classNames(
                                        styles.menuCategoriesLinks,
                                        menuCategoriesItAndHrLinks && styles.menuCategoriesItLinks
                                    )}
                                >
                                    {chapterParts.map((chapterPart, index) => (
                                        <ChapterPart
                                            key={index}
                                            chapterPart={chapterPart}
                                            handleCloseMenu={handleCloseMenu}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
