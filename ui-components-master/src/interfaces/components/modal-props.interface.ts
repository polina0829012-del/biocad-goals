import { ReactElement } from 'react';

import { IBaseComponentProps } from './common/base-component-props.interface';
import { FontWeights } from '../../enums/text/font-weights.enum';
import { ModalSizes } from '../../enums/modal-sizes.enum';
import { HeadingTags } from '../../enums/text/heading-tags.enum';

import { WorkdeskbioUiService } from '../../state/service/workdeskbio-ui.service';

/**
 * Интерфейс пропсов компонента модального окна.
 * @prop {boolean} visible - Видимость модального окна.
 * @prop {ReactElement} content - Основной контент модального окна.
 * @prop {() => void} onClose - Событие закрытия окна.
 * @prop {ReactElement | null | undefined} footer - Футер модального окна.
 * @prop {string | undefined} title - Заголовок модального окна.
 * @prop {ReactElement | null | undefined} titleContent - Контент заголовка модального окна.
 * @prop {string | undefined} subtitle - Подзаголовок.
 * @prop {ReactElement | null | undefined} content - Основной контент модального окна.
 * @prop {boolean | undefined} isCloseIcon - Есть ли иконка закрытия.
 * @prop {HeadingTags | undefined} titleTag - Тег заголовка.
 * @prop {FontWeights | undefined} titleWeight - Жирность шрифта заголовка.
 * @prop {string | undefined} headerClassName - Название класса для стилей заголовка.
 * @prop {string | undefined} iconClassName - Название класса для стилизации иконки.
 * @prop {string | undefined} contentClassName - Название класса для стилизации контента.
 * @prop {string | undefined} subtitleClassName - Название класса для стилизации подзаголовка.
 * @prop {boolean | undefined} isClosingByClickOutside - Закрывать модальное окно по клику вне?
 * @prop {ModalSizes | undefined} modalSize - Размер модального окна.
 * @prop {boolean | undefined} isBlockScroll - Блокировать прокрутку?
 * @prop {WorkdeskbioUiService | undefined} workdeskbioUiService - Сервис для работы с UI.
 */
export interface IModalProps extends Omit<IBaseComponentProps, 'content'> {
    visible: boolean;
    onClose: () => void;
    footer?: ReactElement | null;
    title?: string;
    titleContent?: ReactElement | null;
    subtitle?: string;
    content?: ReactElement | null;
    isCloseIcon?: boolean;
    titleTag?: HeadingTags;
    titleWeight?: FontWeights;
    headerClassName?: string;
    iconClassName?: string;
    contentClassName?: string;
    subtitleClassName?: string;
    isClosingByClickOutside?: boolean;
    modalSize?: ModalSizes;
    isBlockScroll?: boolean;
    workdeskbioUiService?: WorkdeskbioUiService;
}
