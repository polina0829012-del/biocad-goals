import { FC, useEffect, useMemo, useState } from 'react';
import { inject } from 'mobx-react';
import classNames from 'classnames';

import { ProfileAvatar } from '../../../../common/molecules/ProfileAvatar/ProfileAvatar';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';
import { Heading } from '../../../../common/atoms/Heading/Heading';
import { TextLink } from '../../../../common/atoms/TextLink/TextLink';
import { ReactComponent as NoBirthdaysIcon } from '../../../../../assets/icons/no-birthday.svg';

import { UserWithPersonnelPositionsDto } from '../../../../../models/api/clients/users/user-with-personnel-positions.dto';
import { TextSmallComponentModel } from '../../../../../models/components/text-component.models';
import { FoundUserDto } from '../../../../../models/api/clients/found-user.dto';
import { IBaseComponentProps } from '../../../../../interfaces/components/common/base-component-props.interface';
import { FontWeights } from '../../../../../enums/text/font-weights.enum';
import { ProfileAvatarSizes } from '../../../../../enums/profile-avatar-sizes.enum';
import { HeadingTags } from '../../../../../enums/text/heading-tags.enum';
import { FontFamilies } from '../../../../../enums/text/font-families.enum';
import { TextVariations } from '../../../../../enums/text/text-variations.enum';
import { UsersScrollListVariations } from '../../../../../enums/users-scroll-list-variations.enum';
import { ManagementStructureQueryParams } from '../../../../../enums/management-structure-query-params.enum';
import { ServiceNames } from '../../../../../enums/service-names.enum';

import { WorkdeskbioService } from '../../../../../state/service/workdeskbio.service';
import { getInitials, getFullName } from '../../../../../helpers/users.helper';
import BIRTHDAYS_LOCALIZATION from '../../../../../localization/ru/birthdays/birthday.translation.json';
import { createTextProps } from '../../../../../helpers/text/create-text-props.helper';
import { createFileBlob } from '../../../../../helpers/create-file-blob.helper';
import { ROUTE_LINKS } from '../../../../../global/constants/route-links';

import styles from './UsersScrollList.module.css';

/**
 * Интерфейс пропсов компонента списка сотрудников со скроллом.
 * @prop {(adLogin: string | null) => void} onClickNavigate - Функция перехода к профилю сотрудника.
 * @prop {UsersScrollListVariations | undefined} variation - Тип списка сотрудников..
 * @prop {UserWithPersonnelPositionsDto[] | undefined} users - Именинники.
 * @prop {string | undefined} hcmWorkdeskbioLink - Ссылка на HCM-workdeskbio.
 * @prop {WorkdeskbioService | undefined} workdeskbioService - Сервис для работы с данными workdeskbio.
 */
interface IUsersScrollListProps extends IBaseComponentProps {
    onClickNavigate: (adLogin: string | null) => void;
    variation?: UsersScrollListVariations;
    users?: UserWithPersonnelPositionsDto[] | FoundUserDto[];
    hcmWorkdeskbioLink?: string;
    workdeskbioService?: WorkdeskbioService;
}

/**
 * Компонент списка сотрудников со скроллом.
 * @param {IUsersScrollListProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const UsersScrollList: FC<IUsersScrollListProps> = inject(ServiceNames.workdeskbioService)(
    ({ users, onClickNavigate, variation, className, hcmWorkdeskbioLink, workdeskbioService }) => {
        const [userPhotos, setUserPhotos] = useState<Record<string, string>>({});

        const usersTyped = useMemo(
            () =>
                variation === UsersScrollListVariations.search
                    ? (users as FoundUserDto[])
                    : (users as UserWithPersonnelPositionsDto[]),
            [users, variation]
        );

        /** Эффектит получение фотографий пользователей */
        useEffect(() => {
            if (!workdeskbioService || !usersTyped) return;

            const fetchUserPhoto = async (adLogin: string): Promise<void> => {
                if (!adLogin || userPhotos[adLogin]) return;

                try {
                    const photo = await workdeskbioService?.getUserPhoto(adLogin);

                    if (!photo) return;

                    const photoBlob = createFileBlob(photo, (photo as Blob).type);
                    const photoUrl = URL.createObjectURL(photoBlob);

                    setUserPhotos((prev) => ({
                        ...prev,
                        [adLogin]: photoUrl,
                    }));
                } catch (error) {
                    console.error(error);
                }
            };

            usersTyped.forEach(async (person) => {
                if (person.adLogin) {
                    await fetchUserPhoto(person.adLogin);
                }
            });

            return () => {
                Object.values(userPhotos).forEach((url) => {
                    URL.revokeObjectURL(url);
                });
            };
        }, [usersTyped, workdeskbioService, userPhotos]);

        /**
         * Модель пропсов текстового компонента для кадровой позиции.
         * @param {string} value - Текст.
         * @returns {TextSmallComponentModel} Модель данных пропсов текстового компонента для кадровой позиции.
         */
        const personPositionPropsModel = (value: string): TextSmallComponentModel =>
            new TextSmallComponentModel({
                text: value,
                className: styles.personPosition,
            });

        /** Возвращает разметку, если нет именинников. */
        if ((users?.length === 0 || users === undefined) && variation === UsersScrollListVariations.birthdays) {
            return (
                <div className={styles.noBirthdaysList}>
                    <Heading
                        tag={HeadingTags.h4}
                        weight={FontWeights.bold}
                        fontFamily={FontFamilies.fontBiocadDisplay}
                        text={BIRTHDAYS_LOCALIZATION.noBirthdays}
                        className={styles.noBirthdaysText}
                    />
                    <NoBirthdaysIcon />
                </div>
            );
        }

        /**
         * Создает ссылку на подразделение и позицию.
         * @param {number} subdivisionId - Идентификатор подразделения.
         * @param {number | null} organizationStructurePositionId - Идентификатор позиции.
         * @param {number} userId - Идентификатор пользователя.
         * @returns {string} - Ссылка.
         */
        const createSubdivisionLink = (
            subdivisionId: number,
            organizationStructurePositionId: number | null,
            userId: number
        ): string => {
            const searchParams = new URLSearchParams();

            searchParams.set(ManagementStructureQueryParams.subdivisionId, String(subdivisionId));

            if (organizationStructurePositionId)
                searchParams.set(
                    ManagementStructureQueryParams.organizationStructurePositionId,
                    String(organizationStructurePositionId)
                );

            searchParams.set(ManagementStructureQueryParams.userId, String(userId));

            return `${hcmWorkdeskbioLink ?? ''}${ROUTE_LINKS.MANAGEMENT_STRUCTURE_HCM}?${String(searchParams)}`;
        };

        return (
            <div className={classNames(styles.usersList, className)}>
                {usersTyped?.map((person, index) => {
                    const foundedUser = person as FoundUserDto;

                    return (
                        <div
                            key={`${person.id}${index}`}
                            className={styles.personItem}
                            onClick={() => onClickNavigate(person.adLogin)}
                        >
                            <ProfileAvatar
                                userPhoto={person.adLogin ? userPhotos[person.adLogin] : null}
                                initials={getInitials(person.lastName, person.firstName)}
                                size={ProfileAvatarSizes.small}
                            />
                            <div className={styles.personInfo}>
                                <div>
                                    <Heading text={getFullName(person.lastName, person.firstName)} />
                                    <TextComponent {...personPositionPropsModel(person.positionName ?? '')} />
                                    {variation === UsersScrollListVariations.search && foundedUser.subdivisionId && (
                                        <TextLink
                                            to={createSubdivisionLink(
                                                foundedUser.subdivisionId,
                                                foundedUser.organisationStructurePositionId,
                                                foundedUser.id
                                            )}
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            <TextComponent
                                                {...createTextProps({
                                                    text: String(foundedUser.subdivisionName),
                                                    textVariation: TextVariations.textSmall,
                                                })}
                                            />
                                        </TextLink>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
);
