import { DetailedHTMLProps, HTMLAttributes } from 'react';

/**
 * Интерфейс пропсов базового компонента.
 * @prop {string | undefined} className - Название класса для стилизации элемента.
 * @prop {string | undefined} containerClassName - Название класса для стилизации контейнера.
 * @prop {React.ReactNode | undefined} children - Дочерние компоненты.
 * @prop {React.LegacyRef<HTMLDivElement> | undefined} ref - Реф компонента.
 */
export interface IBaseComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string;
    containerClassName?: string;
    children?: React.ReactNode;
    ref?: React.LegacyRef<HTMLDivElement>;
}
