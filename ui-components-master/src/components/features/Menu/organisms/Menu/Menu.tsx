import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';

import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';
import { MenuItem } from '../../organisms/MenuItem/MenuItem';
import { ReactComponent as LogoIcon } from '../../../../../assets/icons/menu/company-logo.svg';
import { ReactComponent as MinimizedLogoIcon } from '../../../../../assets/icons/menu/minimized-logo.svg';
import { ReactComponent as DoubleArrowIcon } from '../../../../../assets/icons/menu/chevron-double-right.svg';

import { MenuItemDto } from '../../../../../models/menu/menu-item.dto';
import { MouseKeys } from '../../../../../enums/mouse-keys.enum';
import { TextVariations } from '../../../../../enums/text-variations.enum';
import { ServiceNames } from '../../../../../enums/service-names.enum';

import { WorkdeskbioService } from '../../../../../state/service/workdeskbio.service';
import { createTextProps, TTextComponentModels } from '../../../../../helpers/create-text-props';
import { MENU_ICONS } from '../../../../../global/constants/menu/menu-icons';

import styles from './Menu.module.css';

/**
 * Интерфейс пропсов меню.
 * @prop {boolean} isMinimized - Состояние минимизированного меню.
 * @prop {Dispatch<SetStateAction<boolean>>} setIsMinimized - Колл-бэк для установки состояния минимизированного или развернутого меню.
 * @prop {boolean} isMinimizedTheme - Состояние пользовательского выбора вида меню.
 * @prop {Dispatch<SetStateAction<boolean>>} setIsMinimizedTheme - Колл-бэк для установки состояния пользовательского выбора вида меню.
 * @prop {string | undefined} menuWidth - Ширина меню.
 * @prop {string | undefined} logoLink - Ссылка для логотипа в меню.
 * @prop {WorkdeskbioService | undefined} workdeskbioService - Сервис для работы с данными workdeskbio.
 */
export interface MenuPropsInterface {
    isMinimized: boolean;
    setIsMinimized: Dispatch<SetStateAction<boolean>>;
    isMinimizedTheme: boolean;
    setIsMinimizedTheme: Dispatch<SetStateAction<boolean>>;
    menuWidth?: string;
    logoLink?: string;
    workdeskbioService?: WorkdeskbioService;
}

/**
 * Компонент меню.
 * @param {MenuPropsInterface} params - Входные параметры компонента.
 * @returns {FC} Функциональный react-компонент.
 */
export const Menu: FC<MenuPropsInterface> = inject(ServiceNames.workdeskbioService)(
    ({ isMinimized, setIsMinimized, isMinimizedTheme, setIsMinimizedTheme, menuWidth, logoLink, workdeskbioService }) => {
        /** Лейбл открытого подменю. */
        const [menuItems, setMenuItems] = useState<MenuItemDto[] | null>(null);

        /** Лейбл открытого подменю. */
        const [domainOpenLabel, setDomainOpenLabel] = useState<string | null>(null);

        /** Состояние открытого подменю. */
        const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);

        /** Реф навигационной панели. */
        const menuRef = useRef<HTMLLIElement>(null);

        /** Состояние развернутого подменю из минимизированного состояния. */
        const [isExpandFromMinimized, setIsExpandFromMinimized] = useState<boolean>(false);

        /** Эффектит загрузку данных пользователя. */
        useEffect(() => {
            if (menuItems) return;

            void workdeskbioService?.getUserMenuItems().then((result) => {
                if (!result) return;

                setMenuItems(result);
            });
        }, [workdeskbioService, menuItems]);

        /** Сворачивает подменю если состояние переключилось в минимизированное. */
        useEffect(() => {
            if (isMinimized) {
                setIsExpandFromMinimized(false);
            }
        }, [isMinimized]);

        /**
         * Закрывает меню.
         * @returns {void} - Void.
         */
        const closeMenu = useCallback((): void => {
            setIsSubmenuOpen(false);
            setDomainOpenLabel(null);
        }, []);

        /**
         * Сворачивает подменю если клик вне меню.
         * @param {MouseEvent} event - Событие мышки.
         * @returns {void} - Void.
         * */
        const handleClickOutsideMenuList = (event: MouseEvent): void => {
            const target = event.target as Node;
            if (menuRef.current && !menuRef.current?.contains(target)) {
                closeMenu();
            }
        };

        /** Эффектит добавление и удаление обработчика события клика документ и вызывает функцию сворачивания подменю при каждом клике. */
        useEffect(() => {
            /** Добавляет обработчик события клика при монтировании компонента пункта меню. */
            document.addEventListener(MouseKeys.click, handleClickOutsideMenuList);

            /** Убирает обработчик события клика при размонтировании компонента пункта меню. */
            return () => {
                document.removeEventListener(MouseKeys.click, handleClickOutsideMenuList);
            };
        }, []);

        /**
         * Открытие раздела меню.
         * @param {string} label - Наименование раздела меню.
         * @returns {void} - Void.
         */
        const openMenu = useCallback(
            (label: string): void => {
                setIsSubmenuOpen(true);

                setDomainOpenLabel(label);

                /** Открываем меню, если оно было минимизировано. */
                setIsMinimized(false);

                /** Устанавливаем состояние,что меню было минимизировано или нет, тем самым инициируя корректную анимацию. */
                setIsExpandFromMinimized(isMinimized);
            },
            [isMinimized, setIsMinimized]
        );

        /** Устанавливает логотип компании в зависимости от вида меню. */
        const companyLogo = useMemo(() => (isMinimized ? <MinimizedLogoIcon /> : <LogoIcon />), [isMinimized]);

        /** Изменяет 'тему' меню (минимизированное/развернутое). */
        const changeMinimizingMenuTheme = (): void => {
            setIsMinimizedTheme(!isMinimized);
            setIsMinimized(!isMinimized);
        };

        /** Сворачивает меню если мышка покинула зону компонента. */
        const minimizingMenu = useCallback((): void => {
            if (!isSubmenuOpen && isMinimizedTheme) {
                setIsMinimized(true);
            }
        }, [isMinimizedTheme, setIsMinimized, isSubmenuOpen]);

        /** Автоматически минимизирует меню обратно, если пользователь использует минимизированную 'тему'. */
        const minimizedMenuAfterChoice = useCallback((): void => {
            /** Закрываем боковую панель. */
            closeMenu();

            /** Проверяем состояние минимизации и 'тему'. */
            if (!isMinimized && isMinimizedTheme) {
                setIsMinimized(true);
            }
        }, [isMinimized, isMinimizedTheme, setIsMinimized, closeMenu]);

        /**
         * Создает пропсы текстового компонента.
         * @param {string} text - Текст.
         * @returns {TTextComponentModels} - Пропсы.
         */
        const createThemeTextComponentProps = (text: string): TTextComponentModels =>
            createTextProps({
                text: text.toUpperCase(),
                textVariation: TextVariations.textSmall,
                className: styles.theme,
            });

        return (
            <div className={styles.container} onMouseLeave={closeMenu} data-sidebar-menu>
                <div className={styles.menu} onMouseLeave={minimizingMenu}>
                    <div className={styles.menuLogo}>
                        {logoLink ? <Link to={logoLink}>{companyLogo}</Link> : <>{companyLogo}</>}
                    </div>
                    {!isSubmenuOpen && (
                        <div className={styles.expandArrow} onClick={changeMinimizingMenuTheme}>
                            <DoubleArrowIcon className={isMinimized ? styles.arrowRotate : undefined} />
                        </div>
                    )}
                    <nav ref={menuRef}>
                        <div className={styles.navBarBlock}>
                            <ul>
                                {menuItems?.map((item, index) => (
                                    <div key={index + item.id}>
                                        {item.isTitleShown && (
                                            <div key={index + item.id}>
                                                <TextComponent {...createThemeTextComponentProps(item.title ?? '')} />
                                            </div>
                                        )}
                                        {item.childItems?.map((item, index) => {
                                            const icon = MENU_ICONS.find(
                                                (icon) => icon.iconId === item.iconId
                                            )?.component;

                                            return (
                                                <li key={`${index}${item.id}`}>
                                                    <MenuItem
                                                        link={item.url}
                                                        icon={icon}
                                                        label={item.title ?? ''}
                                                        subMenuList={item.childItems ?? undefined}
                                                        isMinimized={isMinimized}
                                                        minimizedMenuAfterChoice={minimizedMenuAfterChoice}
                                                        isSubmenuOpen={isSubmenuOpen}
                                                        domainOpenLabel={domainOpenLabel}
                                                        openMenu={openMenu}
                                                        isExpandFromMinimized={isExpandFromMinimized}
                                                        handleCloseMenu={closeMenu}
                                                        menuWidth={menuWidth}
                                                    />
                                                </li>
                                            );
                                        })}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
);
