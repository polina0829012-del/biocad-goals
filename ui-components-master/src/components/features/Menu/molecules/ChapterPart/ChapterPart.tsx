import { FC } from 'react';
import classnames from 'classnames';

import { TextLink } from '../../../../common/molecules/TextLink/TextLink';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';

import { MenuItemDto } from '../../../../../models/menu/menu-item.dto';
import { TextTags } from '../../../../../enums/text-tags.enum';
import { TextVariations } from '../../../../../enums/text-variations.enum';
import { FontWeights } from '../../../../../enums/font-weights.enum';

import { cutUrlForOpenBlankOrSelf } from '../../../../../utils/cut-url-for-open-blank-or-self';

import styles from './ChapterPart.module.css';

/**
 * Интерфейс пропсов компонента части главы меню.
 * @prop {MenuItemDto} chapterPart - Подсекция раздела.
 * @prop {() => void} handleCloseMenu - Меняет состояние открытого/закрытого меню.
 */
export interface IChapterPartProps {
    chapterPart: MenuItemDto;
    handleCloseMenu: () => void;
}

/**
 * Компонент части главы меню.
 * @param {IChapterPartProps} params - Входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const ChapterPart: FC<IChapterPartProps> = ({ chapterPart, handleCloseMenu }) => {
    return (
        <div className={styles.chapterPartItem}>
            <div className={styles.partLinksSection}>
                {chapterPart.isTitleShown && (
                    <TextComponent
                        text={chapterPart.title?.toUpperCase() ?? ''}
                        tag={TextTags.span}
                        className={classnames(styles.partTitleHeader, TextVariations.textSmall, FontWeights.bold)}
                    />
                )}
                {chapterPart.childItems?.map((item, index) => {
                    const linkInfo = item.url ? cutUrlForOpenBlankOrSelf(item?.url) : null;

                    return linkInfo?.url && linkInfo.url?.length > 0 ? (
                        <TextLink
                            key={index}
                            onClick={handleCloseMenu}
                            to={linkInfo.url}
                            className={classnames(styles.partLinkWhite, TextVariations.textSmall, FontWeights.regular)}
                            target={linkInfo.target}
                        >
                            {item.title}
                        </TextLink>
                    ) : (
                        <TextComponent
                            key={index}
                            text={item.title ?? ''}
                            className={classnames(styles.partLinkWhite, TextVariations.textSmall, FontWeights.regular)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
