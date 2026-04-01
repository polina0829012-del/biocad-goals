import { FC, useMemo } from 'react';
import classnames from 'classnames';

import { TextLink } from '../../../../common/molecules/TextLink/TextLink';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';

import { TextTags } from '../../../../../enums/text-tags.enum';
import { TextVariations } from '../../../../../enums/text-variations.enum';
import { LinkTargetTypes } from '../../../../../enums/links-target-types.enum';

import styles from './ChapterItem.module.css';

/**
 * Интерфейс пропсов компонента раздела меню.
 * @prop {string} sectionTitle - Заголовок раздела.
 * @prop {FC<React.SVGProps<SVGSVGElement>> | undefined} icon - Иконка раздела.
 * @prop {boolean} isActive - Показывает выбран ли раздел.
 * @prop {() => void} handleMouseMotion - По наведению на раздел открывает его.
 * @prop {() => void} handleCloseMenu - Закрывает меню.
 * @prop {string | undefined} chapterLandingPageRoute - Посадочная страница раздела.
 * @prop {LinkTargetTypes | undefined} target - Атрибут таргет для ссылки.
 */
export interface IChapterItemProps {
    sectionTitle: string;
    isActive: boolean;
    handleMouseMotion: () => void;
    handleCloseMenu: () => void;
    icon?: FC<React.SVGProps<SVGSVGElement>>;
    chapterLandingPageRoute?: string;
    target?: LinkTargetTypes;
}

/**
 * Компонент раздела меню.
 * @param {IChapterItemProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const ChapterItem: FC<IChapterItemProps> = ({
    sectionTitle,
    icon,
    isActive,
    handleMouseMotion,
    chapterLandingPageRoute,
    handleCloseMenu,
    target = LinkTargetTypes.blank,
}) => {
    const CategoryIcon = icon;

    /** Задизейбленный блок? */
    const isDisableBlock = useMemo(
        () => chapterLandingPageRoute !== undefined && chapterLandingPageRoute.length === 0,
        [chapterLandingPageRoute]
    );

    /** Раздел меню. */
    const chapterItem = useMemo(
        () => (
            <div
                className={classnames(
                    styles.menuItemCategory,
                    isActive && !isDisableBlock && styles.menuItemCategoryActive,
                    isDisableBlock && styles.menuItemDisabled
                )}
                onMouseLeave={handleMouseMotion}
                onMouseMove={handleMouseMotion}
                onClick={handleCloseMenu}
            >
                <div
                    className={classnames(
                        styles.menuItemCategoryIcon,
                        isActive && !isDisableBlock && styles.menuItemCategoryIconActive
                    )}
                >
                    {CategoryIcon ? (
                        <CategoryIcon
                            className={classnames(styles.icon, isActive && !isDisableBlock && styles.activeIcon)}
                        />
                    ) : null}
                </div>
                <TextComponent
                    tag={TextTags.span}
                    text={sectionTitle}
                    className={classnames(
                        styles.menuItemTitle,
                        TextVariations.textSmall,
                        isDisableBlock && styles.menuItemTitleDisabled
                    )}
                />
            </div>
        ),
        [CategoryIcon, handleMouseMotion, isActive, sectionTitle, isDisableBlock, handleCloseMenu]
    );

    return (
        <>
            {chapterLandingPageRoute ? (
                <TextLink className={styles.link} to={chapterLandingPageRoute} target={target}>
                    {chapterItem}
                </TextLink>
            ) : (
                chapterItem
            )}
        </>
    );
};
