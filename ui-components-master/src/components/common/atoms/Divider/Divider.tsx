import { FC, ReactElement } from 'react';
import classNames from 'classnames';

import { IBaseComponentProps } from '../../../../interfaces/components/base-component-props.interface';

import styles from './Divider.module.css';

/**
 * Интерфейс пропсов компонента разделителя.
 * @prop {ReactElement | undefined | null} rightSideButton - Кнопка на правой стороне разделителя.
 * @prop {string | undefined} className - Имя класса для стилизации.
 * @prop {boolean | undefined} isInfoSection - Разделитель находится внутри самой секции?
 */
export interface IDividerProps extends IBaseComponentProps {
    rightSideButton?: ReactElement | null;
    className?: string;
    isInfoSection?: boolean;
}

/**
 * Компонент разделителя.
 * @param {IDividerProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const Divider: FC<IDividerProps> = ({ rightSideButton, className, isInfoSection = false }) => {
    return (
        <div className={classNames(styles.container, isInfoSection && styles.dividerIntoSection, className)}>
            <div className={styles.divider} />
            {rightSideButton}
        </div>
    );
};
