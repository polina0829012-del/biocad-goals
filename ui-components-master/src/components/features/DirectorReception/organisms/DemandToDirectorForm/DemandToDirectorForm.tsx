import { FC, useMemo, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { ObjectSchema } from 'yup';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '../../../../common/molecules/Button/Button';
import { TextArea } from '../../../../common/molecules/TextArea/TextArea';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';

import { UserDemandShortDto } from '../../../../../models/api/clients/users/user-demand.dto';
import { ButtonStyles } from '../../../../../enums/button-styles.enum';
import { ButtonTypes } from '../../../../../enums/button-types.enum';
import { TextVariations } from '../../../../../enums/text/text-variations.enum';
import { FontWeights } from '../../../../../enums/text/font-weights.enum';
import { ServiceNames } from '../../../../../enums/service-names.enum';
import { StoreNames } from '../../../../../enums/store-names.enum';

import { WorkdeskbioStore } from '../../../../../state/store/workdeskbio.store';
import { WorkdeskbioService } from '../../../../../state/service/workdeskbio.service';
import { createTextProps } from '../../../../../helpers/text/create-text-props.helper';
import { convertFromJson } from '../../../../../helpers/convert-from-json.helper';
import DEMAND_TO_DIRECTOR_TEXT from '../../../../../localization/ru/demand-to-director/demand-to-director.json';

import styles from './DemandToDirectorForm.module.css';

/**
 * Интерфейс пропсов компонента формы обращения к директору.
 * @prop {() => void} onClose - Закрывает форму.
 * @prop {WorkdeskbioService | undefined} workdeskbioService - Сервис workdeskbio.
 * @prop {WorkdeskbioStore | undefined} workdeskbioStore - Хранилище workdeskbio.
 */
interface IDemandToDirectorForm {
    onClose: () => void;
    workdeskbioService?: WorkdeskbioService;
    workdeskbioStore?: WorkdeskbioStore;
}

/**
 * Интерфейс полей формы обращения.
 * @prop {string | undefined | null} demandText - Поле обращения.
 */
export interface IDemandFormValues {
    demandText?: string | null;
}

/**
 * Компонент формы обращения к директору.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const DemandToDirectorForm: FC<IDemandToDirectorForm> = inject(
    ServiceNames.workdeskbioService,
    StoreNames.workdeskbioStore
)(
    observer(({ onClose, workdeskbioService, workdeskbioStore }) => {
        const [sentStatusText, setSentStatusText] = useState<string | null>(null);

        const userId = workdeskbioStore?.currentUser?.id;

        const validationSchema: ObjectSchema<IDemandFormValues> = yup.object().shape({
            demandText: yup.string().required(),
        });

        const demandTextFieldName = 'demandText';

        /**
         * Методы хука UseForm из React Hook Forms.
         */
        const form = useForm<IDemandFormValues>({
            mode: 'onChange',
            resolver: yupResolver(validationSchema),
        });

        /**
         * Отправляет форму.
         * @param {IDemandFormValues} formValues - Поля формы.
         * @returns {void} - Void.
         */
        const onSubmit = (formValues: IDemandFormValues): void => {
            if (!userId) return;

            const demand = {
                userId,
                ...formValues,
            };

            const userDemand = convertFromJson(UserDemandShortDto, demand);

            workdeskbioService
                ?.createUserDemand(userId, userDemand)
                .then(() => {
                    // Устанавливает статус успешной отправки.
                    setSentStatusText(DEMAND_TO_DIRECTOR_TEXT.successStatusTitle);
                })
                .catch((error) => {
                    console.log(error);

                    // Устанавливает статус ошибки при отправке.
                    setSentStatusText(DEMAND_TO_DIRECTOR_TEXT.errorStatusTitle);
                });
        };

        /* Разметка статуса отправки. */
        const renderedSentStatus = useMemo(
            () =>
                sentStatusText && (
                    <div className={styles.sentStatus}>
                        <TextComponent
                            {...createTextProps({
                                textVariation: TextVariations.textSmall,
                                text: sentStatusText,
                                weight: FontWeights.medium,
                            })}
                        />
                    </div>
                ),
            [sentStatusText]
        );

        return (
            <div className={styles.container}>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={styles.textAreaWrapper}>
                            <TextArea
                                fieldName={demandTextFieldName}
                                placeholder={DEMAND_TO_DIRECTOR_TEXT.writeRequestPlaceholder}
                            />
                        </div>
                        {renderedSentStatus}
                        <div className={styles.buttonContainer}>
                            <Button
                                buttonStyle={ButtonStyles.secondaryText}
                                title={DEMAND_TO_DIRECTOR_TEXT.backButton}
                                onClick={onClose}
                            />
                            <Button title={DEMAND_TO_DIRECTOR_TEXT.sendButton} type={ButtonTypes.submit} />
                        </div>
                    </form>
                </FormProvider>
            </div>
        );
    })
);
