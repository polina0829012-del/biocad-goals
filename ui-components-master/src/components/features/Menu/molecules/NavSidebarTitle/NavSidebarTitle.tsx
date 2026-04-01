import { FC, useMemo } from 'react';
import classNames from 'classnames';

import { Heading } from '../../../../common/atoms/Heading/Heading';

import { FontWeights } from '../../../../../enums/font-weights.enum';
import { HeadingTags } from '../../../../../enums/heading-tags.enum';

import { checkIsMenuStroke, checkIsMenuStrokeLess } from '../../../../../helpers/menu-sidebar.helper';

import styles from './NavSidebarTitle.module.css';

/**
 * Интерфейс пропсов компонента заголовка секции навигации.
 * @prop {string} title - Заголовок секции.
 * @prop {FC<React.SVGProps<SVGSVGElement>> | undefined} icon - Иконка секции.
 */
export interface INavSidebarTitleProps {
    title: string;
    icon?: FC<React.SVGProps<SVGSVGElement>>;
}

/**
 * Компонент заголовка секции навигации.
 * @param {INavSidebarTitleProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const NavSidebarTitle: FC<INavSidebarTitleProps> = ({ title, icon }) => {
    const TitleIcon = icon;

    /** Возвращает класснейм иконки в зависимости от заголовка, так как иконки разные. */
    const iconClassName = useMemo(() => {
        return classNames(
            styles.containerHeaderIcon,
            checkIsMenuStroke(title) && styles.menuStrokeIcon,
            checkIsMenuStrokeLess(title) && styles.menuStrokeLessIcon
        );
    }, [title]);

    return (
        <div className={styles.containerHeader}>
            {TitleIcon ? <TitleIcon className={iconClassName} /> : null}
            <Heading className={styles.menuItemTitle} tag={HeadingTags.h4} text={title} weight={FontWeights.bold} />
        </div>
    );
};
