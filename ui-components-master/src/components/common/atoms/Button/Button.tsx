import { FC, ReactElement, useMemo } from 'react';
import classNames from 'classnames';

import { IButtonProps } from '../../../../interfaces/components/button-props.interface';
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
    onClick,
    className,
    externalLink,
    iconFirst,
    iconLast,
    isActive,
    subtitle,
    buttonStyle = ButtonStyles.primary,
    type = ButtonTypes.button,
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
            return <Icon className={styles.icon} />;
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
            {subtitle && <span>{subtitle}</span>}
            {iconLast && renderIcon(iconLast)}
        </button>
    );
};
