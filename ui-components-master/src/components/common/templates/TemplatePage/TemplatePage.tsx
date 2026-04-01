import { FC, ReactElement, useEffect, useMemo, useState } from 'react';

import { Menu } from '../../../features/Menu/organisms/Menu/Menu';

import {
    MINIMIZED_MENU_WIDTH_PX,
    EXPANDED_MENU_WIDTH_PX,
    EXPANDED_MENU_WIDTH_PX_FULL_SCREEN,
    MINIMIZED_MENU_WIDTH_PX_FULL_SCREEN,
} from '../../../../global/constants/menu/sidebar-menu';

import styles from './TemplatePage.module.css';

/**
 * Интерфейс пропсов компонента-сетки страницы.
 * @prop {React.ReactNode | undefined} header - Компонент шапки.
 * @prop {React.ReactNode | undefined} menu - Компонент меню.
 * @prop {React.ReactNode | undefined} content - Компонент основного контента.
 * @prop {React.ReactNode | undefined} footer - Компонент подвала.
 * @prop {string | undefined} menuLogoLink - Ссылка для логотипа в меню.
 */
export interface TemplatePagePropsInterface {
    header?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    menu?: ReactElement;
    menuLogoLink?: string;
}

/**
 * Компонент-сетки страницы.
 * @param {TemplatePagePropsInterface} params - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const TemplatePage: FC<TemplatePagePropsInterface> = ({
    menu,
    menuLogoLink,
    header = <></>,
    content = <></>,
    footer = <></>,
}) => {
    // Состояние свернутого или развернутого меню в моменте.
    const [isMinimizedMenu, setIsMinimizedMenu] = useState<boolean>(false);

    // Состояние пользовательского выбора вида меню.
    const [isMinimizedMenuTheme, setMinimizedMenuTheme] = useState<boolean>(false);

    // Ширина пользовательского окна браузера.
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    // Масштаб пользовательского окна браузера.
    const [browserScale, setBrowserScale] = useState<number>(
        Math.round(parseFloat(String(window.devicePixelRatio)) * 100) / 100
    );

    /* Эффектит изменение ширины браузера. */
    useEffect(() => {
        const handleResize = (): void => {
            setWindowWidth(window.innerWidth);
        };

        document.addEventListener('onresize', handleResize);

        return () => {
            document.removeEventListener('onresize', handleResize);
        };
    }, [window.innerWidth]);

    /* Эффектит изменение масштаба браузера. */
    useEffect(() => {
        const handleResize = (): void => {
            const scale = Math.round(parseFloat(String(window.devicePixelRatio)) * 100) / 100;

            if (!scale) return;

            setBrowserScale(scale);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.devicePixelRatio]);

    /**
     * Стиль свернутого или развернутого меню (его ширина).
     */
    const menuMinimizedStyle = useMemo(() => {
        if (windowWidth < 1800 || browserScale > 1.1) {
            return isMinimizedMenu
                ? { width: `${MINIMIZED_MENU_WIDTH_PX}px` }
                : { width: `${EXPANDED_MENU_WIDTH_PX}px` };
        }

        return isMinimizedMenu
            ? { width: `${MINIMIZED_MENU_WIDTH_PX_FULL_SCREEN}px` }
            : { width: `${EXPANDED_MENU_WIDTH_PX_FULL_SCREEN}px` };
    }, [isMinimizedMenu, browserScale, windowWidth]);

    return (
        <div className={styles.templateLayout}>
            <header className={styles.templateLayoutHeader}>{header}</header>
            <div className={styles.templateLayoutMenu} style={menuMinimizedStyle}>
                {menu != null ? (
                    menu
                ) : (
                    <Menu
                        isMinimized={isMinimizedMenu}
                        setIsMinimized={setIsMinimizedMenu}
                        isMinimizedTheme={isMinimizedMenuTheme}
                        setIsMinimizedTheme={setMinimizedMenuTheme}
                        menuWidth={menuMinimizedStyle.width}
                        logoLink={menuLogoLink}
                    />
                )}
            </div>
            <main className={styles.templateLayoutContent}>{content}</main>
            {footer !== null ? <footer className={styles.templateLayoutFooter}>{footer}</footer> : footer}
        </div>
    );
};
