import { FC, useState } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

import { TextComponent } from '../../../../../common/atoms/TextComponent/TextComponent';
import { TextLink } from '../../../../../common/atoms/TextLink/TextLink';
import { ReactComponent as WelcomePageIcon } from '../../../../../../assets/icons/welcome-page-hand-icon.svg';

import { LinkTargetTypes } from '../../../../../../enums/links-target-types.enum';
import { FontWeights } from '../../../../../../enums/text/font-weights.enum';
import { TextVariations } from '../../../../../../enums/text/text-variations.enum';
import { StoreNames } from '../../../../../../enums/store-names.enum';

import { WorkdeskbioStore } from '../../../../../../state/store/workdeskbio.store';
import { ROUTE_LINKS } from '../../../../../../global/constants/route-links';
import WELCOME_PAGE_TEXT from '../../../../../../localization/ru/page-content/welcome-page.json';

import styles from './WelcomePageHeaderIcon.module.css';

/**
 * Интерфейс компонента иконки welcome страницы в шапке.
 * @prop {boolean | undefined} addAnimation - Добавлять ли анимацию?
 */
interface IWelcomePageHeaderIcon {
    workdeskbioStore?: WorkdeskbioStore;
    addAnimation?: boolean;
}

/**
 * Компонент иконки welcome страницы в шапке.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const WelcomePageHeaderIcon: FC<IWelcomePageHeaderIcon> = inject(StoreNames.workdeskbioStore)(
    observer(({ workdeskbioStore, addAnimation }) => {
        const [isHoverTooltip, setIsHoverTooltip] = useState<boolean>(false);

        const linkToWelcomePage = `${workdeskbioStore?.workdeskbioMainPageLink || ''}${ROUTE_LINKS.STATIC_PAGES}/${ROUTE_LINKS.WELCOME_PAGE}`;

        return (
            <div className={styles.welcomePageHeaderIcon}>
                <TextLink to={linkToWelcomePage} target={LinkTargetTypes.blank}>
                    <div
                        className={styles.welcomePageIconButton}
                        onMouseEnter={() => setIsHoverTooltip(true)}
                        onMouseLeave={() => setIsHoverTooltip(false)}
                    >
                        <WelcomePageIcon className={classNames(!addAnimation && styles.welcomePageIcon)} />
                    </div>
                </TextLink>
                {isHoverTooltip && (
                    <div className={styles.tooltip}>
                        <TextComponent
                            text={WELCOME_PAGE_TEXT.welcomePageToolTip}
                            className={classNames(FontWeights.medium, TextVariations.caption)}
                        />
                    </div>
                )}
            </div>
        );
    })
);
