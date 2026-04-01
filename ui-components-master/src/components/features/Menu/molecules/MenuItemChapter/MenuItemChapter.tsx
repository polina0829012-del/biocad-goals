import { FC, FunctionComponent, SVGProps, useMemo } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Heading } from '../../../../common/atoms/Heading/Heading';
import { ReactComponent as ItemArrowIcon } from '../../../../../assets/icons/menu/menu-arrow.svg';

import { HeadingTags } from '../../../../../enums/heading-tags.enum';

import { cutUrlForOpenBlankOrSelf } from '../../../../../utils/cut-url-for-open-blank-or-self';
import { checkIsMenuStroke, checkIsMenuStrokeLess } from '../../../../../helpers/menu-sidebar.helper';

import styles from './MenuItemChapter.module.css';

/**
 * Интерфейс пропсов раздела меню.
 * @prop {string} label - Название пункта меню.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement> | undefined} icon - Иконка пункта меню.
 * @prop {boolean} isMinimized - Состояние минимизированного меню.
 * @prop {boolean} isActive - Активная ссылка?
 * @prop {boolean | undefined} isOpenChapter - Раздел открыт?
 * @prop {string  | null | undefined} link - Ссылка пункта меню.
 * @prop {string | undefined} className - Название класса для стилизации элемента.
 * @prop {boolean} isShowSidebarArrow - Показывать стрелку для сайдбара?
 */
export interface MenuItemChapterPropsInterface {
    label: string;
    isMinimized: boolean;
    isActive: boolean;
    isShowSidebarArrow: boolean;
    className?: string;
    isOpenChapter?: boolean;
    link?: string | null;
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
}

/**
 * Компонент раздела меню.
 * @param {MenuItemLinkPropsInterface} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const MenuItemChapter: FC<MenuItemChapterPropsInterface> = ({
    icon,
    label,
    isMinimized,
    isActive,
    className,
    isOpenChapter,
    link,
    isShowSidebarArrow,
}) => {
    const MenuItemIcon = icon;

    const linkInfo = link && cutUrlForOpenBlankOrSelf(link);

    /** Возвращает класснейм иконки в зависимости от лейбла, так как иконки разные. */
    const iconClassName = useMemo(() => {
        return classNames(
            styles.menuIcon,
            checkIsMenuStroke(label) && styles.menuStrokeIcon,
            checkIsMenuStrokeLess(label) && styles.menuStrokeLessIcon
        );
    }, [label]);

    const labelWithIcon = useMemo(
        () => (
            <>
                <div className={iconClassName}>
                    {MenuItemIcon ? <MenuItemIcon className={isActive ? styles.menuIconActive : ''} /> : null}
                </div>
                {!isMinimized && (
                    <div className={styles.labelWithArrowContainer}>
                        <Heading
                            tag={HeadingTags.h6}
                            text={label}
                            className={classNames(
                                styles.menuItemLabel,
                                className,
                                isActive && styles.menuItemLabelActive
                            )}
                        />
                        {isShowSidebarArrow ? <ItemArrowIcon className={styles.menuArrow} /> : null}
                    </div>
                )}
            </>
        ),
        [MenuItemIcon, className, iconClassName, isActive, isMinimized, label]
    );

    return (
        <>
            {linkInfo ? (
                <NavLink
                    end
                    to={linkInfo.url}
                    className={({ isActive }) =>
                        classNames(
                            styles.menuItemChapter,
                            styles.linkItem,
                            isOpenChapter && styles.isOpenChapter,
                            isMinimized && styles.menuItemChapterMinimized,
                            isActive && styles.linkActive
                        )
                    }
                    target={linkInfo.target}
                >
                    {labelWithIcon}
                </NavLink>
            ) : (
                <div
                    className={classNames(
                        styles.menuItemChapter,
                        isOpenChapter && styles.isOpenChapter,
                        isMinimized && styles.menuItemChapterMinimized
                    )}
                >
                    {labelWithIcon}
                </div>
            )}
        </>
    );
};
