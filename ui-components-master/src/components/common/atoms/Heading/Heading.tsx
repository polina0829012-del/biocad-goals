import { FC } from 'react';
import classNames from 'classnames';

import { IBaseComponentProps } from '../../../../interfaces/components/common/base-component-props.interface';
import { HeadingTags } from '../../../../enums/text/heading-tags.enum';
import { FontWeights } from '../../../../enums/text/font-weights.enum';
import { FontFamilies } from '../../../../enums/text/font-families.enum';
import { HeadingTypes } from '../../../../enums/text/heading-types.enum';

/**
 * Интерфейс пропсов заголовка.
 * @prop {string} text - Текст пробрасываемый в компонент.
 * @prop {HeadingTypes | undefined} isHeadingFontBiocad - Это заголовок шрифта Biocad?
 * @prop {HeadingTags} tag - Тэги для заголовка (h1, h2, h3, h4, h5, h6) (@default 'HeadingTags.h6').
 * @prop {FontWeights} weight - Жирный шрифт для заголовка (@default 'FontWeights.medium').
 * @prop {FontFamilies} fontFamily - Шрифт для заголовка (@default 'FontFamilies.fontInter').
 */
export interface IHeadingProps extends IBaseComponentProps {
    text: string;
    headingType?: HeadingTypes;
    tag?: HeadingTags;
    weight?: FontWeights;
    fontFamily?: FontFamilies;
}

/**
 * Компонент для отображения заголовка.
 * @param {IHeadingProps} params - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const Heading: FC<IHeadingProps> = ({
    text,
    className,
    headingType = HeadingTypes.heading,
    tag = HeadingTags.h6,
    weight = FontWeights.medium,
    fontFamily = FontFamilies.fontInter,
}) => {
    const HeadingTag = tag;

    return <HeadingTag className={classNames(headingType, className, weight, fontFamily)}>{text}</HeadingTag>;
};
