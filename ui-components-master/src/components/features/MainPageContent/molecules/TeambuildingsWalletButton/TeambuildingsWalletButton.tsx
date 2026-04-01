import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { TeambuildingsWalletPopupMenu } from '../../molecules/TeambuildingsWalletPopupMenu/TeambuildingsWalletPopupMenu';
import { ReactComponent as WorkdeskbioWalletIcon } from '../../../../../assets/icons/workdeskbio-wallet.svg';

import { LinkTargetTypes } from '../../../../../enums/links-target-types.enum';

import { WALLET_MENU_ITEMS } from '../../../../../global/constants/main-page';

import styles from './TeambuildingsWalletButton.module.css';

/**
 * Компонент кнопки кошелька workdeskbio.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const TeambuildingsWalletButton: FC = () => {
    const navigate = useNavigate();

    /**
     * Обрабатывает клик на пункт меню.
     * @param {string} value - Значение пункта меню.
     * @returns {void} - Void.
     */
    const onMenuItemClick = useCallback(
        (value: string): void => {
            const supportLink = WALLET_MENU_ITEMS.find((menuLabel) => menuLabel.label === value);

            if (!supportLink) return;

            if (supportLink.target === LinkTargetTypes.self) {
                navigate(supportLink.value);

                return;
            }

            window.open(supportLink.value, LinkTargetTypes.blank);
        },
        [navigate]
    );

    return (
        <TeambuildingsWalletPopupMenu
            buttonIcon={WorkdeskbioWalletIcon}
            buttonClassName={styles.teambuildingsWalletIconButton}
            walletMenuClassName={styles.walletMenu}
            onMenuItemClick={onMenuItemClick}
        />
    );
};
