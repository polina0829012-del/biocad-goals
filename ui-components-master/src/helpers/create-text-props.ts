import { TextVariations } from '../enums/text-variations.enum';
import { ITextComponentBaseModel } from '../interfaces/components/text-component-base-model.interface';
import {
    CaptionTextComponentModel,
    MediumTextComponentModel,
    TextComponentModel,
    TextSmallComponentModel,
    TextTitleComponentModel,
} from '../models/components/text-component.models';

/**
 * Интерфейс аргументов для пропсов текста.
 * @prop {TextVariations} textVariation - Вариации текста.
 */
interface ICreateTextPropsArgs extends ITextComponentBaseModel {
    textVariation: TextVariations;
}

/**
 * Тип, обобщающий модели текстового компонента.
 */
export type TTextComponentModels =
    | TextComponentModel
    | TextSmallComponentModel
    | CaptionTextComponentModel
    | MediumTextComponentModel
    | TextTitleComponentModel;

/**
 * Создает пропсы для текста.
 * @param {TextVariations} textVariation - Вариация текста.
 * @param {string | undefined} className - Стиль.
 * @param {FontWeightEnum} weight - Толщина начертания.
 * @param {TextTagEnum} tag - Тэг.
 * @param {string} text - Текст.
 * @returns {TTextComponentModels} Пропсы компонента текста.
 */
export function createTextProps({
    textVariation,
    className,
    weight,
    tag,
    text,
}: ICreateTextPropsArgs): TTextComponentModels {
    switch (textVariation) {
        case TextVariations.text:
            return new TextComponentModel({
                text,
                className,
                weight,
                tag,
            });
        case TextVariations.textSmall:
            return new TextSmallComponentModel({
                text,
                className,
                weight,
                tag,
            });
        case TextVariations.caption:
            return new CaptionTextComponentModel({
                text,
                className,
                weight,
                tag,
            });
        case TextVariations.textMedium:
            return new MediumTextComponentModel({
                text,
                className,
                weight,
                tag,
            });
        case TextVariations.textTitle:
            return new TextTitleComponentModel({
                text,
                className,
                weight,
                tag,
            });
        default:
            return new TextComponentModel({
                text,
                className,
                weight,
                tag,
            });
    }
}
