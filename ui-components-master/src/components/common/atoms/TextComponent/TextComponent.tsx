import { FC } from 'react';

import { IBaseComponentProps } from '../../../../interfaces/components/common/base-component-props.interface';
import { TextTags } from '../../../../enums/text/text-tags.enum';

/**
 * Интерфейс пропсов текстового компонента.
 * @prop {string} text - Текст пробрасываемый в компонент.
 * @prop {TextTags | undefined} tag - Тэг пробрасываемый в компонент.
 */
export interface ITextComponentProps extends IBaseComponentProps {
    text: string;
    tag?: TextTags;
}

/**
 * Компонент для отображения текста.
 * @param {ITextComponentProps} params - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const TextComponent: FC<ITextComponentProps> = ({ text, className, onClick, tag = TextTags.div }) => {
    const TextTag = tag;

    return (
        <TextTag onClick={onClick} className={className}>
            {text}
        </TextTag>
    );
};
