import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { inject } from 'mobx-react';

import { CloseIconButton } from '../../atoms/CloseIconButton/CloseIconButton';
import { Heading } from '../../atoms/Heading/Heading';
import { TextComponent } from '../../atoms/TextComponent/TextComponent';

import { IModalProps } from '../../../../interfaces/components/modal-props.interface';
import { TextComponentModel } from '../../../../models/components/text-component.models';
import { HeadingTags } from '../../../../enums/text/heading-tags.enum';
import { FontWeights } from '../../../../enums/text/font-weights.enum';
import { KeyboardKeys } from '../../../../enums/keyboard-keys.enum';
import { ModalSizes } from '../../../../enums/modal-sizes.enum';
import { ServiceNames } from '../../../../enums/service-names.enum';

import { useBlockScroll } from '../../../../hooks/useBlockScroll';

import styles from './Modal.module.css';

/**
 * Компонент модального окна.
 * @param {IModalProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const Modal: FC<IModalProps> = inject(ServiceNames.workdeskbioUiService)(
    ({
        onClose,
        title,
        subtitle,
        className,
        headerClassName,
        iconClassName,
        contentClassName,
        titleContent,
        containerClassName,
        subtitleClassName,
        workdeskbioUiService,
        content = '',
        footer = '',
        visible = false,
        isCloseIcon = true,
        titleTag = HeadingTags.h4,
        titleWeight = FontWeights.bold,
        isClosingByClickOutside = true,
        modalSize = ModalSizes.large,
        isBlockScroll = true,
    }) => {
        /**
         *  Эффектит установку состояния видимости модального окна в хранилище UI.
         */
        useEffect(() => {
            workdeskbioUiService?.setModalVisible(visible);
        }, [workdeskbioUiService, visible]);

        /**
         * Вешаем обработчик события для закрытия по нажатию клавиши.
         */
        useEffect(() => {
            if (!isClosingByClickOutside) return;

            document.addEventListener(KeyboardKeys.keydown, onKeydownClose);

            return () => document.removeEventListener(KeyboardKeys.keydown, onKeydownClose);
        });

        /** Блокируем прокрутку страницы. */
        isBlockScroll && useBlockScroll(visible);

        /**
         * Создает обработчик события по нажатию клавиши Escape.
         * @param {{ key }: KeyboardEvent} key - Событие нажатия клавиши с клавиатуры.
         */
        const onKeydownClose = ({ key }: KeyboardEvent): void => {
            if (!isClosingByClickOutside) return;

            if (key === KeyboardKeys.escape) {
                return onClose();
            }
        };

        const subtitleTextProps = new TextComponentModel({
            text: subtitle,
            className: classNames(styles.modalSubtitle, subtitleClassName),
        });

        if (!visible) {
            return null;
        }

        return (
            <div
                className={classNames(styles.modal, containerClassName)}
                onClick={isClosingByClickOutside ? onClose : undefined}
            >
                <div
                    className={classNames(styles.modalDialog, styles[modalSize], className)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={classNames(styles.modalHeader, headerClassName)}>
                        <div>
                            {title && (
                                <Heading
                                    tag={titleTag}
                                    className={styles.modalTitle}
                                    text={title}
                                    weight={titleWeight}
                                />
                            )}
                            {subtitle && <TextComponent {...subtitleTextProps} />}
                            {titleContent && <div className={styles.modalTitle}>{titleContent}</div>}
                        </div>
                        {isCloseIcon && <CloseIconButton className={iconClassName} onClick={onClose} />}
                    </div>
                    {content && <div className={classNames(styles.modalContent, contentClassName)}>{content}</div>}
                    {footer && <div className={styles.modalFooter}>{footer}</div>}
                </div>
            </div>
        );
    }
);
