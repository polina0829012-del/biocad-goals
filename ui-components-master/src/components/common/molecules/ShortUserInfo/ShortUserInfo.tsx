import { FC } from 'react';

import { ProfileAvatar } from '../../molecules/ProfileAvatar/ProfileAvatar';
import { TextComponent } from '../../atoms/TextComponent/TextComponent';
import { Heading } from '../../atoms/Heading/Heading';

import { TextSmallComponentModel } from '../../../../models/components/text-component.models';
import { ProfileAvatarSizes } from '../../../../enums/profile-avatar-sizes.enum';
import { HeadingTags } from '../../../../enums/heading-tags.enum';

import { getInitials, getFullName } from '../../../../helpers/users.helper';

import styles from './ShortUserInfo.module.css';

/**
 * Интерфейс пропсов с краткой информацией о пользователе.
 * @prop {string} firstName - Имя.
 * @prop {boolean} isScrolled -  Скроллится ли страница.
 * @prop {string | null} lastName - Фамилия.
 * @prop {string | null} email -  Адрес электронной почты.
 * @prop {string | undefined} userPhoto - Фото пользователя в его профиле.
 */
export interface IShortUserInfoProps {
    firstName: string;
    isScrolled: boolean;
    lastName: string | null;
    email: string | null;
    userPhoto: string | null;
}

/**
 * Компонент с краткой информацией о пользователе.
 * @param {IShortUserInfoProps} params - Входные параметры компонента.
 * @returns {ReactElement} - React-элемент.
 */
export const ShortUserInfo: FC<IShortUserInfoProps> = ({ firstName, lastName, email, isScrolled, userPhoto }) => {
    const emailTextModel = new TextSmallComponentModel({ text: email ?? '', className: styles.userEmail });

    return (
        <div className={styles.shortUserInfo}>
            <ProfileAvatar
                userPhoto={userPhoto}
                initials={getInitials(lastName, firstName)}
                size={isScrolled ? ProfileAvatarSizes.extraSmall : ProfileAvatarSizes.small}
            />
            <div className={styles.userInfo}>
                <Heading className={styles.userName} tag={HeadingTags.h6} text={getFullName(lastName, firstName)} />
                {isScrolled ? null : <TextComponent {...emailTextModel} />}
            </div>
        </div>
    );
};
