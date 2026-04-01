import { FC, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { DropdownMenu } from '../../../../common/molecules/DropdownMenu/DropdownMenu';
import { ReactComponent as WorkdeskbioSupportIcon } from '../../../../../assets/icons/workdeskbio-support.svg';

import { LinkTargetTypes } from '../../../../../enums/links-target-types.enum';
import { StoreNames } from '../../../../../enums/store-names.enum';

import { WorkdeskbioStore } from '../../../../../state/store/workdeskbio.store';
import { SUPPORT_MENU_ITEMS } from '../../../../../global/constants/main-page';
import HOME_PAGE from '../../../../../localization/ru/home-page/home-page.json';

import styles from './PortalSupportButton.module.css';

/**
 * Интерфейс кнопки поддержки workdeskbio.
 * @prop {WorkdeskbioStore | undefined} workdeskbioStore - Хранилище данных workdeskbio.
 */
export interface IPortalSupportButtonProps {
    workdeskbioStore?: WorkdeskbioStore;
}

/**
 * Компонент кнопки поддержки workdeskbio.
 * @param {IPortalSupportButtonProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const PortalSupportButton: FC<IPortalSupportButtonProps> = inject(StoreNames.workdeskbioStore)(
    observer(({ workdeskbioStore }) => {
        const navigate = useNavigate();

        /** Элементы меню поддержки портала. */
        const supportMenuLabels = SUPPORT_MENU_ITEMS.map((menuItem) => menuItem.label);

        /**
         * Обрабатывает клик на пункт меню.
         * @param {string} value - Значение пункта меню.
         * @returns {void} - Void.
         */
        const onMenuItemClick = useCallback(
            (value: string): void => {
                let host = '';

                const supportLink = SUPPORT_MENU_ITEMS.find((menuLabel) => menuLabel.label === value);

                if (!supportLink) return;

                if (supportLink.target === LinkTargetTypes.self) {
                    navigate(supportLink.value);

                    return;
                }

                if (supportLink.label === HOME_PAGE.workdeskbioArticlesAndFeatures) {
                    host = `${workdeskbioStore?.workdeskbioMainPageLink || ''}`;
                }

                window.open(host + supportLink.value, LinkTargetTypes.blank);
            },
            [navigate]
        );

        return (
            <DropdownMenu
                buttonIcon={WorkdeskbioSupportIcon}
                buttonClassName={styles.workdeskbioSupportIconButton}
                dropdownMenuClassName={styles.dropdownMenu}
                dropdownMenuItems={supportMenuLabels}
                onMenuItemClick={onMenuItemClick}
            />
        );
    })
);
