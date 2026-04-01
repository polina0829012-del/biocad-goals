import { FC, useCallback, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';
import { DropdownMenu } from '../../../../common/molecules/DropdownMenu/DropdownMenu';
import { Modal } from '../../../../common/molecules/Modal/Modal';
import { DemandToDirectorForm } from '../../../DirectorReception/organisms/DemandToDirectorForm/DemandToDirectorForm';
import { ReactComponent as BVoiceIcon } from '../../../../../assets/icons/b-voice-notification.svg';

import { CaptionTextComponentModel } from '../../../../../models/components/text-component.models';
import { FontWeights } from '../../../../../enums/text/font-weights.enum';
import { LinkTargetTypes } from '../../../../../enums/links-target-types.enum';
import { StoreNames } from '../../../../../enums/store-names.enum';

import { WorkdeskbioStore } from '../../../../../state/store/workdeskbio.store';
import { FEEDBACK_MENU_ITEMS } from '../../../../../global/constants/main-page';
import HOME_PAGE from '../../../../../localization/ru/home-page/home-page.json';
import B_VOICE_LOCALIZATION from '../../../../../localization/ru/b-voice/b-voice.json';
import DEMAND_TO_DIRECTOR_TEXT from '../../../../../localization/ru/demand-to-director/demand-to-director.json';

import styles from './FeedbackButton.module.css';

/**
 * Интерфейс кнопки обратной связи.
 * @prop {WorkdeskbioStore | undefined} workdeskbioStore - Хранилище данных workdeskbio.
 */
export interface IFeedbackButtonProps {
    workdeskbioStore?: WorkdeskbioStore;
}

/**
 * Компонент кнопки обратной связи.
 * @param {IFeedbackButtonProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const FeedbackButton: FC<IFeedbackButtonProps> = inject(StoreNames.workdeskbioStore)(
    observer(({ workdeskbioStore }) => {
        const [isHoverBVoiceTooltip, setIsHoverBVoiceTooltip] = useState<boolean>(false);

        const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

        const [isAnimation, setIsAnimation] = useState<boolean>(true);

        const navigate = useNavigate();

        /** Элементы меню обратной связи. */
        const supportMenuLabels = FEEDBACK_MENU_ITEMS.map((menuItem) => menuItem.label);

        /** Были ли посты сегодня? */
        const hasPostForToday = true;

        /** Эффектит установку анимации для иконки уведомления. */
        useEffect(() => {
            if (hasPostForToday) return;

            /** Продолжительность одного цикла анимации. */
            const ANIMATION_CYCLE_DURATION = 3200;

            /** Продолжительность паузы между анимацией. */
            const PAUSE_DURATION = 63000;

            /**
             * Устанавливает цикл анимации.
             * @returns {void} - Void.
             */
            const setCycleAnimation = (): void => {
                setIsAnimation(true);

                setTimeout(() => setIsAnimation(false), ANIMATION_CYCLE_DURATION);
            };

            setCycleAnimation();

            const interval = setInterval(() => setCycleAnimation(), PAUSE_DURATION);

            return () => clearInterval(interval);
        }, [hasPostForToday]);

        const bVoiceTooltipTextProps = new CaptionTextComponentModel({
            weight: FontWeights.medium,
            text: B_VOICE_LOCALIZATION.bVoiceTooltip,
        });

        /**
         * Обрабатывает клик на пункт меню.
         * @param {string} value - Значение пункта меню.
         * @returns {void} - Void.
         */
        const onMenuItemClick = useCallback(
            (value: string): void => {
                let host = '';

                setIsHoverBVoiceTooltip(false);

                const supportLink = FEEDBACK_MENU_ITEMS.find((menuLabel) => menuLabel.label === value);

                const hasModal = FEEDBACK_MENU_ITEMS.find(
                    (menuLabel) => menuLabel.label === value && !!menuLabel.onClickOpenModal
                );

                if (hasModal) {
                    setIsOpenModal(true);

                    return;
                }

                if (!supportLink) return;

                if (supportLink.target === LinkTargetTypes.self) {
                    navigate(supportLink.value);

                    return;
                }

                if(supportLink.label === HOME_PAGE.bVoice) {
                    host = `${workdeskbioStore?.workdeskbioMainPageLink || ''}`;
                }

                window.open(host + (supportLink.value || ''), LinkTargetTypes.blank);
            },
            [navigate]
        );

        /**
         * Закрывает модальное окно.
         * @returns {void} - Void.
         */
        const onCloseModal = (): void => setIsOpenModal(false);

        return (
            <>
                <div
                    className={styles.bVoiceNotificationButton}
                    onMouseEnter={() => setIsHoverBVoiceTooltip(true)}
                    onMouseLeave={() => setIsHoverBVoiceTooltip(false)}
                >
                    <DropdownMenu
                        buttonIcon={BVoiceIcon}
                        buttonContainerClassname={classNames(
                            styles.feedbackButton,
                            isAnimation && !hasPostForToday && styles.feedbackAnimationIconButton
                        )}
                        hasPayAttentionPoint={!hasPostForToday}
                        buttonClassName={styles.feedbackIcon}
                        dropdownMenuClassName={styles.dropdownMenu}
                        dropdownMenuItems={supportMenuLabels}
                        onMenuItemClick={onMenuItemClick}
                    />
                    {isHoverBVoiceTooltip && (
                        <div className={styles.tooltip}>
                            <TextComponent {...bVoiceTooltipTextProps} />
                        </div>
                    )}
                </div>
                <Modal
                    subtitle={DEMAND_TO_DIRECTOR_TEXT.textAreaDescription}
                    className={styles.appealModal}
                    visible={isOpenModal}
                    title={DEMAND_TO_DIRECTOR_TEXT.directorReception}
                    content={<DemandToDirectorForm onClose={onCloseModal} />}
                    footer={null}
                    onClose={onCloseModal}
                />
            </>
        );
    })
);
