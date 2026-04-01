import { FC, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { Heading } from '../../atoms/Heading/Heading';

import { HeadingTags } from '../../../../enums/heading-tags.enum';
import { ProfileAvatarSizes } from '../../../../enums/profile-avatar-sizes.enum';
import { ProfileAvatarFrames } from '../../../../enums/profile-avatar-frames.enum';

import { getRandomColors } from '../../../../utils/get-random-colors';
import { USER_AVATAR_PLUG_COLORS } from '../../../../global/constants/user';

import styles from './ProfileAvatar.module.css';

/**
 * Интерфейс пропсов компонента аватара профиля.
 * @prop {string} initials - Инициалы.
 * @prop {ProfileAvatarSizes} size - Размер изображения.
 * @prop {string | null} userPhoto - Фото пользователя в его профиле.
 * @prop {ProfileAvatarFrames | undefined} frame - Форма изображения.
 * @prop {string | undefined} link - Ссылка для перехода на профиль.
 */
export interface IProfileAvatarProps {
    initials: string;
    size: ProfileAvatarSizes;
    userPhoto: string | null;
    frame?: ProfileAvatarFrames;
    link?: string;
}

/**
 * Компонент аватара профиля.
 * @param {IProfileAvatarProps} params - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const ProfileAvatar: FC<IProfileAvatarProps> = ({
    initials,
    link,
    userPhoto,
    size = ProfileAvatarSizes.extraSmall,
    frame = ProfileAvatarFrames.circle,
}) => {
    const colorRef = useRef(getRandomColors(USER_AVATAR_PLUG_COLORS));

    /**
     * Размер Аватара.
     * @returns {string} Стиль размера изображения аватара (styles).
     */
    const avatarSizeStyle = useMemo(() => {
        switch (size) {
            case ProfileAvatarSizes.extraSmall:
                return styles.profileAvatarImageExtraSmall;
            case ProfileAvatarSizes.small:
                return styles.profileAvatarImageSmall;
            case ProfileAvatarSizes.middle:
                return styles.profileAvatarImageMedium;
            case ProfileAvatarSizes.large:
                return styles.profileAvatarImageLarge;
        }
    }, [size]);

    /**
     * Тэг заголовка с инициалами.
     * @returns {HeadingTags | undefined} Тэг заголовка.
     */
    const avatarFontSizeStyle = useMemo((): HeadingTags | undefined => {
        switch (size) {
            case ProfileAvatarSizes.extraSmall:
                return HeadingTags.h6;
            case ProfileAvatarSizes.small:
                return HeadingTags.h4;
            case ProfileAvatarSizes.middle:
                return HeadingTags.h1;
            case ProfileAvatarSizes.large:
                return HeadingTags.h1;
        }
    }, [size]);

    /**
     * Стиль с размером Аватара.
     * @returns {string} - Стиль рамки изображения аватара (styles).
     */
    const avatarFrameStyle = useMemo(() => {
        switch (frame) {
            case ProfileAvatarFrames.circle:
                return styles.profileAvatarCircle;
            case ProfileAvatarFrames.square:
                return styles.profileAvatarSquare;
        }
    }, [frame]);

    /**
     * Аватар с инициалами.
     * @returns {ReactElement} - Верстка для отображения аватара с инициалами.
     */
    const initialsCircle = useMemo(
        () => (
            <div style={colorRef.current} className={classnames(styles.colorCircle, avatarSizeStyle, avatarFrameStyle)}>
                <Heading tag={avatarFontSizeStyle} text={initials} />
            </div>
        ),
        [avatarFontSizeStyle, avatarFrameStyle, avatarSizeStyle, colorRef, initials]
    );

    /**
     * Аватар.
     * @returns {ReactElement} - Верстка для отображения аватара.
     */
    const displayedAvatar = useMemo(() => {
        return userPhoto ? (
            <img src={userPhoto} alt="avatar" className={classnames(avatarSizeStyle, avatarFrameStyle)} />
        ) : (
            initialsCircle
        );
    }, [initialsCircle, avatarFrameStyle, avatarSizeStyle, userPhoto]);

    return (
        <div className={styles.profileAvatar}>{link ? <Link to={link}>{displayedAvatar}</Link> : displayedAvatar}</div>
    );
};
