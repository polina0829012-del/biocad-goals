import { FC, ReactElement, useMemo } from 'react';
import classNames from 'classnames';

import { Spinner } from '../../atoms/Spinner/Spinner';

import { IButtonProps } from '../../../../interfaces/components/common/button-props.interface';
import { ButtonStyles } from '../../../../enums/button-styles.enum';
import { ButtonTypes } from '../../../../enums/button-types.enum';

import styles from './Button.module.css';

/**
 * Компонент кнопки.
 * @param {IButtonProps} props - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const Button: FC<IButtonProps> = ({
    title,
    titleComponent,
    onClick,
    className,
    externalLink,
    iconFirst,
    iconLast,
    isActive,
    subtitle,
    iconClassName,
    buttonStyle = ButtonStyles.primary,
    type = ButtonTypes.button,
    isLoading = false,
    ...buttonProps
}) => {
    /**
     * Рендерит иконку.
     * @param {IButtonProps['iconFirst']} icon - Иконка.
     * @returns {ReactElement | undefined} Изображение иконки.
     */
    const renderIcon = (icon: IButtonProps['iconFirst']): ReactElement | undefined => {
        if (icon) {
            const Icon = icon;
            return <Icon className={classNames(styles.icon, iconClassName)} />;
        }
    };

    /**
     * Добавляет к событию onClick открытие ссылки если она есть.
     * @param {React.MouseEvent<HTMLButtonElement>} event - Событие.
     * @returns {React.MouseEventHandler<HTMLButtonElement> | undefined} Событие onClick.
     */
    const buttonOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        externalLink && parent.open(externalLink);
        return onClick?.(event);
    };

    /**
     * Определяет вариацию стиля кнопки.
     *  @returns {string} Стиль кнопки.
     */
    const setButtonStyle = useMemo(() => {
        switch (buttonStyle) {
            case ButtonStyles.primary:
                return styles.primary;

            case ButtonStyles.primaryText:
                return styles.primaryText;

            case ButtonStyles.primaryWhite:
                return styles.primaryWhite;

            case ButtonStyles.secondary:
                return classNames(styles.secondary, isActive && styles.secondaryActive);

            case ButtonStyles.secondaryText:
                return styles.secondaryText;

            case ButtonStyles.secondaryRounded:
                return styles.secondaryRounded;

            case ButtonStyles.secondaryFill:
                return styles.secondaryFill;

            case ButtonStyles.transparentFill:
                return styles.transparentFill;

            case ButtonStyles.transparentOutline:
                return styles.transparentOutline;

            case ButtonStyles.linkText:
                return classNames(styles.linkText, isActive && styles.linkTextActive);

            case ButtonStyles.primaryLight:
                return styles.primaryLight;
        }
    }, [buttonStyle, isActive]);

    return (
        <button
            className={classNames(styles.button, setButtonStyle, className)}
            type={type}
            onClick={(event) => buttonOnClick(event)}
            {...buttonProps}
        >
            {iconFirst && renderIcon(iconFirst)}
            {title}
            {titleComponent}
            {subtitle && <span>{subtitle}</span>}
            {iconLast && renderIcon(iconLast)}
            {isLoading && <Spinner />}
        </button>
    );
};
