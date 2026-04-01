import { TextVariations } from '../../enums/text/text-variations.enum';
import { ITextComponentBaseModel } from '../../interfaces/components/common/text-component-base-model.interface';
import {
    CaptionTextComponentModel,
    MediumTextComponentModel,
    TextAccentSubTitleComponentModel,
    TextComponentModel,
    TextSmallComponentModel,
    TextTitleComponentModel,
} from '../../models/components/text-component.models';

/**
 * Интерфейс аргументов для пропсов текста.
 * @prop {TextVariations} textVariation - Вариации текста.
 */
export interface ICreateTextPropsArgs extends ITextComponentBaseModel {
    textVariation?: TextVariations;
}

/**
 * Создает пропсы для текста.
 * @param {ICreateTextPropsArgs} textPropsArguments - Вариация текста.
 * @returns {TextComponentModel | TextSmallComponentModel | CaptionTextComponentModel | MediumTextComponentModel | TextTitleComponentModel} Пропсы компонента текста.
 */
export function createTextProps(
    textPropsArguments: ICreateTextPropsArgs
):
    | TextComponentModel
    | TextSmallComponentModel
    | CaptionTextComponentModel
    | MediumTextComponentModel
    | TextTitleComponentModel
    | TextAccentSubTitleComponentModel {
    switch (textPropsArguments.textVariation) {
        case TextVariations.text:
            return new TextComponentModel(textPropsArguments);
        case TextVariations.textSmall:
            return new TextSmallComponentModel(textPropsArguments);
        case TextVariations.caption:
            return new CaptionTextComponentModel(textPropsArguments);
        case TextVariations.textMedium:
            return new MediumTextComponentModel(textPropsArguments);
        case TextVariations.textTitle:
            return new TextTitleComponentModel(textPropsArguments);
        case TextVariations.textAccentSubtitle:
            return new TextAccentSubTitleComponentModel(textPropsArguments);
        default:
            return new TextComponentModel(textPropsArguments);
    }
}
