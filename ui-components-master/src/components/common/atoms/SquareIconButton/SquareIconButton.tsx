import { FC, ReactElement } from 'react';
import classNames from 'classnames';

import { ButtonTypes } from '../../../../enums/button-types.enum';
import { ISquareIconButtonProps } from '../../../../interfaces/components/common/square-icon-button-props.interface';

import styles from './SquareIconButton.module.css';

/**
 * Компонент иконочной квадратной кнопки.
 * @param {IButtonProps} props - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const SquareIconButton: FC<ISquareIconButtonProps> = ({ icon, onClick, className, ...props }) => {
    /**
     * Рендерит иконку.
     * @param {IButtonIconProps['icon']} icon - SVG иконка.
     * @returns {ReactElement | undefined} Отрисованную кнопку.
     */
    const renderIcon = (icon: ISquareIconButtonProps['icon']): ReactElement | undefined => {
        if (!icon) return;

        const Icon = icon;

        return <Icon />;
    };

    return (
        <button
            className={classNames(styles.buttonIcon, props.disabled && styles.disabledIconButton, className)}
            onClick={onClick}
            type={ButtonTypes.reset}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            disabled={props.disabled}
        >
            {renderIcon(icon)}
        </button>
    );
};
