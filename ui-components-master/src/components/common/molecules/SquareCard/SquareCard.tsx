import { FC, ReactElement } from 'react';
import classNames from 'classnames';

import { IBaseComponentProps } from '../../../../interfaces/components/common/base-component-props.interface';

import styles from './SquareCard.module.css';

/**
 * Интерфейс пропсов компонент квадратной карточки.
 * @prop {ReactElement | undefined} head - Шапка.
 * @prop {ReactElement | undefined} body - Основной контент.
 * @prop {ReactElement | undefined} footer - Подвал.
 * @prop {boolean | undefined} isScrolled - Есть скролл?
 */
interface ISquareCardProps extends IBaseComponentProps {
    head?: ReactElement;
    body?: ReactElement;
    footer?: ReactElement;
    isScrolled?: boolean;
}

/**
 * Компонент квадратной карточки.
 * @param {ISquareCardProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const SquareCard: FC<ISquareCardProps> = ({ head, body, footer, className, isScrolled, style }) => {
    return (
        <div className={classNames(isScrolled ? styles.scroll : styles.container, className)} style={style}>
            {head}
            {body}
            {footer}
        </div>
    );
};
