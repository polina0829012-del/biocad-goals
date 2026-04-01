import { TextTags } from '../../enums/text-tags.enum';
import { FontWeights} from '../../enums/font-weights.enum';

/**
 * Интерфейс модели базового текстового компонента.
 * @prop {string} text - Текст компонента.
 * @prop {string | undefined} className - Название класса компонента.
 * @prop {TextTags | undefined} tag - Тэг используемый в компоненте для оборачивания текста.
 * @prop {FontWeights | undefined} weight - Жирность текста.
 */
export interface ITextComponentBaseModel {
    text: string;
    className?: string;
    tag?: TextTags;
    weight?: FontWeights;
}
