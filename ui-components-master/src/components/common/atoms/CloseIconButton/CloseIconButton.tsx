import { FC, useMemo } from 'react';
import classNames from 'classnames';

import { SquareIconButton } from '../../atoms/SquareIconButton/SquareIconButton';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/cross-cancel.svg';
import { ReactComponent as SmallCloseRedIcon } from '../../../../assets/icons/small-cross-red-icon.svg';

import { ISquareIconButtonProps } from '../../../../interfaces/components/common/square-icon-button-props.interface';
import { ButtonStyles } from '../../../../enums/button-styles.enum';

import styles from './CloseIconButton.module.css';

/**
 * Компонент иконочной кнопки отмены.
 * @param {IButtonProps} props - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const CloseIconButton: FC<Omit<ISquareIconButtonProps, 'icon'>> = (props) => {
    /* Стиль кнопки. */
    const buttonStyle = useMemo(() => {
        switch (props.buttonStyle) {
            case ButtonStyles.primary:
                return {
                    icon: SmallCloseRedIcon,
                    className: styles.red,
                };
            case ButtonStyles.secondary:
                return {
                    icon: CloseIcon,
                    className: '',
                };
            default:
                return {
                    icon: CloseIcon,
                    className: '',
                };
        }
    }, [props.buttonStyle]);

    return (
        <SquareIconButton
            icon={buttonStyle?.icon}
            {...props}
            className={classNames(buttonStyle?.className, props.className)}
        />
    );
};
