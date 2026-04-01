import { FC, useEffect, useMemo, useState } from 'react';
import { inject } from 'mobx-react';

import { ProfileAvatar } from '../../../../common/molecules/ProfileAvatar/ProfileAvatar';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';
import { Heading } from '../../../../common/atoms/Heading/Heading';

import { TextSmallComponentModel } from '../../../../../models/components/text-component.models';
import { ProfileAvatarSizes } from '../../../../../enums/profile-avatar-sizes.enum';
import { StoreNames } from '../../../../../enums/store-names.enum';
import { ServiceNames } from '../../../../../enums/service-names.enum';
import { HeadingTags } from '../../../../../enums/heading-tags.enum';

import { WorkdeskbioService } from '../../../../../state/service/workdeskbio.service';
import { getInitials, getFullName } from '../../../../../helpers/users.helper';
import { getProfilePhoto } from '../../../../../utils/get-profile-photo';

import styles from './ShortUserInfo.module.css';

/**
 * Интерфейс пропсов с краткой информацией о пользователе.
 * @prop {string} firstName - Имя.
 * @prop {string} adLogin - Логин пользователя.
 * @prop {boolean} isScrolled - Скроллится ли страница.
 * @prop {string | null} lastName - Фамилия.
 * @prop {string | null} email - Адрес электронной почты.
 */
interface IShortUserInfoProps {
    firstName: string;
    adLogin: string;
    isScrolled: boolean;
    lastName: string | null;
    email: string | null;
    workdeskbioService?: WorkdeskbioService;
}

/**
 * Компонент с краткой информацией о пользователе.
 * @returns {ReactElement} React-элемент.
 */
export const ShortUserInfo: FC<IShortUserInfoProps> = inject(
    StoreNames.workdeskbioStore,
    ServiceNames.workdeskbioService
)(({ firstName, lastName, email, adLogin, isScrolled, workdeskbioService }) => {
    const emailTextModel = new TextSmallComponentModel({ text: email ?? '', className: styles.userEmail });

    const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

    const memoizedUserPhoto = useMemo(() => userPhotoUrl, [userPhotoUrl]);

    /** Эффектит получение фотографии пользователя. */
    useEffect(() => {
        if (!workdeskbioService || !adLogin) return;

        getProfilePhoto(adLogin, workdeskbioService, setUserPhotoUrl);

        return () => {
            if (userPhotoUrl) URL.revokeObjectURL(userPhotoUrl);
        };
    }, [adLogin, workdeskbioService]);

    return (
        <div className={styles.shortUserInfo}>
            <ProfileAvatar
                userPhoto={memoizedUserPhoto}
                initials={getInitials(lastName, firstName)}
                size={isScrolled ? ProfileAvatarSizes.extraSmall : ProfileAvatarSizes.small}
            />
            <div className={styles.userInfo}>
                <Heading className={styles.userName} tag={HeadingTags.h6} text={getFullName(lastName, firstName)} />
                {isScrolled ? null : <TextComponent {...emailTextModel} />}
            </div>
        </div>
    );
});
