import { FunctionComponent, ReactElement, SVGProps } from 'react';

import { ButtonStyles } from '../../../enums/button-styles.enum';

/**
 * Интерфейс пропсов компонента кнопки.
 * @prop {string | undefined} title - Текст кнопки.
 * @prop {ReactElement | undefined} titleComponent - Компонент текста кнопки.
 * @prop {string | undefined} externalLink - Ссылка для перехода.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }> | undefined} iconFirst - Иконка в начале.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }> | null | undefined} iconLast - Иконка в конце.
 * @prop {ButtonStyles | undefined} buttonStyle - Стиль кнопки.
 * @prop {boolean | undefined} isActive - Активность кнопки.
 * @prop {string | undefined} subtitle - Подзаголовок кнопки.
 * @prop {boolean} isLoading - Загрузка?
 * @prop {string | undefined} iconClassName - Стили CSS для иконки.
 */
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    titleComponent?: ReactElement;
    externalLink?: string;
    iconFirst?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
    iconLast?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }> | null;
    buttonStyle?: ButtonStyles;
    isActive?: boolean;
    subtitle?: string;
    isLoading?: boolean;
    iconClassName?: string;
}
