import { FC, FunctionComponent, SVGProps, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

import { Button } from '../../molecules/Button/Button';
import { TextComponent } from '../../atoms/TextComponent/TextComponent';
import { ReactComponent as EllipsesIcon } from '../../../../assets/icons/ellipses.svg';
import { ReactComponent as PointIcon } from '../../../../assets/icons/point.svg';

import { ButtonStyles } from '../../../../enums/button-styles.enum';
import { TextVariations } from '../../../../enums/text/text-variations.enum';

import { useCloseItemByOutsideClick } from '../../../../hooks/useCloseItemByOutsideClick';

import styles from './DropdownMenu.module.css';

/**
 * Интерфейс пропсов компонента выпадающего меню.
 * @prop {string[]} dropdownMenuItems - Элементы выпадающего меню.
 * @prop {(menuItem: string) => void} onMenuItemClick - Обработчик клика по элементу меню.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement>> | undefined} buttonIcon - Иконка кнопки открытия меню.
 * @prop {string | undefined} buttonClassName - Класс для стилизации кнопки открытия меню.
 * @prop {string | undefined} dropdownMenuClassName - Класс для стилизации выпадающего меню.
 * @prop {string | undefined} buttonContainerClassname - Класс для контейнера кнопки.
 * @prop {boolean | undefined} hasPayAttentionPoint - Есть точка "обрати внимание"?
 */
interface IDropdownMenuProps {
    dropdownMenuItems: string[];
    onMenuItemClick: (menuItem: string) => void;
    buttonIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    buttonClassName?: string;
    dropdownMenuClassName?: string;
    buttonContainerClassname?: string;
    hasPayAttentionPoint?: boolean;
}

/**
 * Компонент выпадающего меню.
 * @param {IDropdownMenuProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const DropdownMenu: FC<IDropdownMenuProps> = ({
    dropdownMenuItems,
    onMenuItemClick,
    buttonIcon,
    buttonClassName,
    dropdownMenuClassName,
    buttonContainerClassname,
    hasPayAttentionPoint = false,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    /**
     * Закрывает меню.
     * @returns {void}.
     */
    const onMenuClose = (): void => setIsMenuOpen(false);

    /**
     * Добавляет обработчик закрытия меню.
     */
    useCloseItemByOutsideClick([menuRef], onMenuClose);

    /**
     * Меняет состояние открытого или закрытого меню.
     * @returns {void}.
     */
    const toggleMenuOpen = useCallback((): void => setIsMenuOpen((prev) => !prev), []);

    /**
     * Обрабатывает клик по элементу выпадающего меню.
     * @param {string} menuItem - Элемент меню.
     * @returns {void}.
     */
    const onDropdownMenuItemClick = (menuItem: string): void => {
        onMenuClose();

        onMenuItemClick(menuItem);
    };

    return (
        <div ref={menuRef} className={styles.menuContainer}>
            <div className={buttonContainerClassname}>
                {hasPayAttentionPoint && <PointIcon className={styles.pointIcon} />}
                <Button
                    iconFirst={buttonIcon ?? EllipsesIcon}
                    className={classNames(styles.iconButton, buttonClassName)}
                    buttonStyle={ButtonStyles.secondaryText}
                    onClick={toggleMenuOpen}
                />
            </div>
            {isMenuOpen && (
                <div className={classNames(styles.dropdownMenu, dropdownMenuClassName)}>
                    {dropdownMenuItems.map((menuItem, index) => (
                        <div
                            key={index}
                            className={styles.dropdownMenuItem}
                            onClick={() => onDropdownMenuItemClick(menuItem)}
                        >
                            <TextComponent
                                text={menuItem}
                                className={classNames(styles.menuItemName, TextVariations.textSmall)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
