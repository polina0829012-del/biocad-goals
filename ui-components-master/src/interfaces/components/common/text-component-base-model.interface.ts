import { TextTags } from '../../../enums/text/text-tags.enum';
import { FontWeights } from '../../../enums/text/font-weights.enum';

/**
 * Интерфейс модели базового текстового компонента.
 * @prop {string} text - Текст компонента.
 * @prop {string | undefined} className - Название класса компонента.
 * @prop {TextTags | undefined} tag - Тэг используемый в компоненте для оборачивания текста.
 * @prop {TextTags | undefined} weight - Толщина начертания компоненте для оборачивания текста.
 */
export interface ITextComponentBaseModel {
    text: string;
    className?: string;
    tag?: TextTags;
    weight?: FontWeights;
}
