import { ITextComponentBaseModel } from '../../interfaces/components/common/text-component-base-model.interface';
import { TextTags } from '../../enums/text/text-tags.enum';
import { FontWeights } from '../../enums/text/font-weights.enum';
import { TextVariations } from '../../enums/text/text-variations.enum';

/**
 * Абстрактный класс базовой модели для компонента текста.
 * @property @protected {String}  _additionalClassName - Дополнительный класс компонента.
 * @property {String} text - Текст передаваемый в компонент.
 * @property {className} className - Имя класса компонента.
 * @property {TextTags} tag - Тэг текстового элемента.
 */
export abstract class TextComponentBaseModel implements ITextComponentBaseModel {
    protected _additionalClassName: string = '';

    public text: string = '';
    public className: string = '';
    public tag: TextTags = TextTags.div;
    public weight: FontWeights = FontWeights.regular;

    /**
     * Создание модели текстового компонента.
     * @param {Partial<TextComponentBaseModel>} init - Инициализирующие значения модели текстового компонента.
     */
    protected constructor(init: Partial<TextComponentBaseModel>) {
        Object.assign(this, init);
        this.Init();
        this.buildClassName();
    }

    /**
     * Метод для инициализации дополнительного свойства.
     */
    protected abstract Init(): void;

    /**
     * Метод для создания имени класса.
     */
    protected buildClassName(): void {
        this.className = `${this.className ?? ''} ${this._additionalClassName ?? ''} ${this.weight ?? ''}`.trim();
    }
}

/**
 * Модель для компонента текста стиля Text.
 * @extends TextComponentBaseModel
 */
export class TextComponentModel extends TextComponentBaseModel {
    _additionalClassName = '';
    constructor(init: Partial<TextComponentBaseModel>) {
        super({ ...init, tag: init.tag ?? TextTags.p });
    }

    protected Init(): void {
        this._additionalClassName = TextVariations.text;
    }
}

/**
 * Модель для компонента текста стиля TextSmall.
 * @extends TextComponentBaseModel
 */
export class TextSmallComponentModel extends TextComponentBaseModel {
    _additionalClassName = '';
    constructor(init: Partial<TextComponentBaseModel>) {
        super({ ...init, tag: init.tag ?? TextTags.p });
    }

    protected Init(): void {
        this._additionalClassName = TextVariations.textSmall;
    }
}

/**
 * Модель для компонента текста стиля Caption.
 * @extends TextComponentBaseModel
 */
export class CaptionTextComponentModel extends TextComponentBaseModel {
    constructor(init: Partial<TextComponentBaseModel>) {
        super({ ...init, tag: init.tag ?? TextTags.div });
    }

    protected Init(): void {
        this._additionalClassName = TextVariations.caption;
    }
}

/**
 * Модель для компонента текста стиля Medium.
 * @extends MediumTextComponentModel
 */
export class MediumTextComponentModel extends TextComponentBaseModel {
    constructor(init: Partial<TextComponentBaseModel>) {
        super({ ...init, tag: init.tag ?? TextTags.div });
    }

    protected Init(): void {
        this._additionalClassName = TextVariations.textMedium;
    }
}

/**
 * Модель для компонента текста стиля TextTitle.
 * @extends TextComponentBaseModel
 */
export class TextTitleComponentModel extends TextComponentBaseModel {
    constructor(init: Partial<TextComponentBaseModel>) {
        super({ ...init, tag: init.tag ?? TextTags.div });
    }

    protected Init(): void {
        this._additionalClassName = TextVariations.textTitle;
    }
}

/**
 * Модель для компонента текста стиля TextTitle.
 * @extends TextComponentBaseModel
 */
export class TextAccentSubTitleComponentModel extends TextComponentBaseModel {
    constructor(init: Partial<TextComponentBaseModel>) {
        super({ ...init, tag: init.tag ?? TextTags.div });
    }

    protected Init(): void {
        this._additionalClassName = TextVariations.textAccentSubtitle;
    }
}
