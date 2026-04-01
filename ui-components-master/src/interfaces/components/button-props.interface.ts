import { FunctionComponent, SVGProps } from 'react';

import { ButtonStyles } from '../../enums/button-styles.enum';

/**
 * Интерфейс пропсов компонента кнопки.
 * @prop {string | undefined} title - Текст кнопки.
 * @prop {string | undefined} externalLink - Ссылка для перехода.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }> | undefined} iconFirst - Иконка в начале.
 * @prop {FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }> | undefined} iconLast - Иконка в конце.
 * @prop {ButtonStyles | undefined} buttonStyle - Стиль кнопки.
 * @prop {boolean | undefined} isActive - Активность кнопки.
 * @prop {string | undefined} subtitle - Подзаголовок кнопки.
 */
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    externalLink?: string;
    iconFirst?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
    iconLast?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
    buttonStyle?: ButtonStyles;
    isActive?: boolean;
    subtitle?: string;
}
