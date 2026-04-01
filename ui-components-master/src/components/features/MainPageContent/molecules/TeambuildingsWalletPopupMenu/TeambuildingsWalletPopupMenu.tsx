import { FC, FunctionComponent, SVGProps, useCallback, useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

import { Button } from '../../../../common/molecules/Button/Button';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';
import { Heading } from '../../../../common/atoms/Heading/Heading';
import { ReactComponent as EllipsesIcon } from '../../../../../assets/icons/ellipses.svg';
import { ReactComponent as RoubleIcon } from '../../../../../assets/icons/rouble.svg';

import { ButtonStyles } from '../../../../../enums/button-styles.enum';
import { TextVariations } from '../../../../../enums/text/text-variations.enum';
import { FontWeights } from '../../../../../enums/text/font-weights.enum';
import { FontFamilies } from '../../../../../enums/text/font-families.enum';
import { HeadingTags } from '../../../../../enums/text/heading-tags.enum';
import { HeadingTypes } from '../../../../../enums/text/heading-types.enum';
import { ServiceNames } from '../../../../../enums/service-names.enum';
import { StoreNames } from '../../../../../enums/store-names.enum';

import { WorkdeskbioService } from '../../../../../state/service/workdeskbio.service';
import { WorkdeskbioStore } from '../../../../../state/store/workdeskbio.store';
import { useCloseItemByOutsideClick } from '../../../../../hooks/useCloseItemByOutsideClick';
import HOME_PAGE from '../../../../../localization/ru/home-page/home-page.json';

import styles from './TeambuildingsWalletPopupMenu.module.css';

/**
 * Интерфейс пропсов компонента выпадающего меню Кошелька пользователя.
 * @prop {(menuItem: string) => void} onMenuItemClick - Обработчик клика по элементу меню.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement>> | undefined} buttonIcon - Иконка кнопки открытия меню.
 * @prop {string | undefined} buttonClassName - Класс для стилизации кнопки открытия меню.
 * @prop {string | undefined} walletMenuClassName - Класс для стилизации выпадающего меню.
 * @prop {WorkdeskbioService | undefined} workdeskbioService - Сервис для работы с данными workdeskbio.
 * @prop {WorkdeskbioStore | undefined} workdeskbioStore - Хранилище данных workdeskbio.
 */
interface ITeambuildingsWalletPopupMenuProps {
    onMenuItemClick: (menuItem: string) => void;
    buttonIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    buttonClassName?: string;
    walletMenuClassName?: string;
    workdeskbioService?: WorkdeskbioService;
    workdeskbioStore?: WorkdeskbioStore;
}

/**
 * Компонент выпадающего меню Кошелька пользователя.
 * @param {ITeambuildingsWalletPopupMenuProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const TeambuildingsWalletPopupMenu: FC<ITeambuildingsWalletPopupMenuProps> = inject(
    ServiceNames.workdeskbioService,
    StoreNames.workdeskbioStore
)(
    observer(({ onMenuItemClick, buttonIcon, buttonClassName, walletMenuClassName, workdeskbioService, workdeskbioStore }) => {
        const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

        const menuRef = useRef<HTMLDivElement>(null);

        /**
         * Эффектит загрузку баланса пользователя для тимбилдинга.
         */
        useEffect(() => {
            void workdeskbioService?.loadBalance();
        }, [workdeskbioService]);

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
        const onWalletMenuItemClick = (menuItem: string): void => {
            onMenuClose();

            onMenuItemClick(menuItem);
        };

        return (
            <div ref={menuRef} className={styles.menuContainer}>
                <Button
                    iconFirst={buttonIcon ?? EllipsesIcon}
                    className={classNames(styles.iconButton, buttonClassName)}
                    buttonStyle={ButtonStyles.secondaryText}
                    onClick={toggleMenuOpen}
                />
                {isMenuOpen && (
                    <div className={classNames(styles.walletMenu, walletMenuClassName)}>
                        <ul className={styles.walletMenuContainer}>
                            <li className={styles.walletMenuItem}>
                                <TextComponent
                                    text={HOME_PAGE.teambuildings}
                                    className={classNames(styles.headingTitle, TextVariations.text, FontWeights.medium)}
                                />
                                <div className={styles.bodyContainer}>
                                    <div className={styles.scoreСontainer}>
                                        <Heading
                                            text={workdeskbioStore?.userTmbBalance?.balance.toString() ?? '0'}
                                            tag={HeadingTags.h4}
                                            headingType={HeadingTypes.headingBiocad}
                                            className={styles.score}
                                            fontFamily={FontFamilies.fontBiocadDisplay}
                                            weight={FontWeights.bold}
                                        />
                                        <RoubleIcon className={styles.scoreIcon} />
                                    </div>
                                    <TextComponent
                                        text={HOME_PAGE.compensate}
                                        className={classNames(
                                            styles.link,
                                            TextVariations.textSmall,
                                            FontWeights.medium
                                        )}
                                        onClick={() => onWalletMenuItemClick(HOME_PAGE.compensate)}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        );
    })
);
