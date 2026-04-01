import { FC } from 'react';

import { ErrorContent } from '../../atoms/ErrorContent/ErrorContent';
import { TextComponent } from '../../atoms/TextComponent/TextComponent';
import { Heading } from '../../atoms/Heading/Heading';

import { FontWeights } from '../../../../enums/font-weights.enum';
import { TextVariations } from '../../../../enums/text-variations.enum';
import { HeadingTags } from '../../../../enums/heading-tags.enum';

import { createTextProps } from '../../../../helpers/create-text-props';

/**
 * Интерфейс компонента ошибки.
 * @prop {number} status - Статус.
 * @prop {string} title - Заголовок.
 * @prop {string} description - Описание.
 * @prop {JSX.Element | null} image - Картинка.
 * @prop {string} link - Ссылка.
 */
export interface IErrorComponentProps {
    status: number;
    title: string;
    description: string;
    buttonText: string;
    image: JSX.Element | null;
    link: string;
}

/**
 * Компонент ошибки.
 * @param {IErrorComponentProps} props - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const ErrorComponent: FC<IErrorComponentProps> = ({ status, title, description, buttonText, image, link }) => {
    const statusTextProps = createTextProps({
        text: status.toString(),
        textVariation: TextVariations.textTitle,
        weight: FontWeights.bold,
    });

    const errorDescriptionTextProps = createTextProps({
        text: description,
        textVariation: TextVariations.text,
        weight: FontWeights.regular,
    });

    return (
        <ErrorContent
            image={image}
            errorStatus={<TextComponent {...statusTextProps} />}
            errorText={<Heading text={title} weight={FontWeights.bold} tag={HeadingTags.h2} />}
            errorDescriptionText={<TextComponent {...errorDescriptionTextProps} />}
            errorButtonText={buttonText}
            link={link}
        />
    );
};
