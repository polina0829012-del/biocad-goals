import { FC, useMemo, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Button } from '../../../../common/molecules/Button/Button';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';
import { FeedbackButton } from '../../molecules/FeedbackButton/FeedbackButton';
import { PortalSupportButton } from '../../molecules/PortalSupportButton/PortalSupportButton';
import { TeambuildingsWalletButton } from '../../molecules/TeambuildingsWalletButton/TeambuildingsWalletButton';
import { WelcomePageHeaderIcon } from '../../../StaticPages/Welcome/atoms/WelcomePageHeaderIcon/WelcomePageHeaderIcon';
import { ReactComponent as AdminIcon } from '../../../../../assets/icons/admin.svg';

import { CaptionTextComponentModel } from '../../../../../models/components/text-component.models';
import { ButtonStyles } from '../../../../../enums/button-styles.enum';
import { StoreNames } from '../../../../../enums/store-names.enum';
import { UserConfirmations } from '../../../../../enums/user-confirmations.enum';
import { FontWeights } from '../../../../../enums/text/font-weights.enum';
import { UserRoles } from '../../../../../enums/api/user-roles.enum';
import { LinkTargetTypes } from '../../../../../enums/links-target-types.enum';

import { WorkdeskbioStore } from '../../../../../state/store/workdeskbio.store';
import { checkHasAdminRole, checkHasRole } from '../../../../../helpers/users-access';
import { ROUTE_LINKS } from '../../../../../global/constants/route-links';
import HOME_PAGE from '../../../../../localization/ru/home-page/home-page.json';

import styles from './HeaderQuickInfoButtons.module.css';

/**
 * Интерфейс пропсов компонента кнопок быстрой информации в шапке.
 * @prop {WorkdeskbioStore | undefined} workdeskbioStore - Хранилище данных workdeskbio.
 */
interface IHeaderQuickInfoButtonsProps {
    workdeskbioStore?: WorkdeskbioStore;
}

/**
 * Компонент кнопок быстрой информации в шапке.
 * @param {IHeaderQuickInfoButtonsProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const HeaderQuickInfoButtons: FC<IHeaderQuickInfoButtonsProps> = inject(StoreNames.workdeskbioStore)(
    observer(({ workdeskbioStore }) => {
        const [isHoverTooltip, setIsHoverTooltip] = useState<boolean>(false);

        const hasAccessToFeedback =
            !workdeskbioStore?.currentUser?.isContractEmployee || workdeskbioStore?.currentUser?.isBVoiceModerator;

        const hasAdminRoles = checkHasAdminRole(workdeskbioStore?.accountRoles);

        const isTmbUserRole = checkHasRole(UserRoles.tmbUser, workdeskbioStore?.accountRoles);

        /**
         * Переходит на админ панель.
         * @returns {void}.
         */
        const onClickNavigateToAdmin = (): void => {
            setIsHoverTooltip(false);

            window.open(`${workdeskbioStore?.workdeskbioMainPageLink ?? ''}${ROUTE_LINKS.ADMIN_PANEL}`, LinkTargetTypes.blank);
        };

        const tooltipTextProps = new CaptionTextComponentModel({
            weight: FontWeights.medium,
            text: HOME_PAGE.adminPanel,
        });

        const welcomePageIcon = useMemo(() => {
            return (
                <WelcomePageHeaderIcon
                    addAnimation={workdeskbioStore?.currentUser?.confirmations?.includes(UserConfirmations.MainPageVisited)}
                />
            );
        }, [workdeskbioStore?.currentUser?.confirmations]);

        return (
            <div className={styles.headerQuickInfoButtons}>
                {isTmbUserRole && <TeambuildingsWalletButton />}
                {hasAccessToFeedback && <FeedbackButton />}
                {welcomePageIcon}
                <PortalSupportButton />
                {hasAdminRoles && (
                    <div className={styles.adminIconButton}>
                        <Button
                            buttonStyle={ButtonStyles.secondaryFill}
                            className={styles.adminIcon}
                            onClick={onClickNavigateToAdmin}
                            iconFirst={AdminIcon}
                            onMouseEnter={() => setIsHoverTooltip(true)}
                            onMouseLeave={() => setIsHoverTooltip(false)}
                        />
                        {isHoverTooltip && (
                            <div className={styles.tooltip}>
                                <TextComponent {...tooltipTextProps} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    })
);
