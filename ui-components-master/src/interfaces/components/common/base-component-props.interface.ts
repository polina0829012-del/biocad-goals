import { DetailedHTMLProps, HTMLAttributes } from 'react';

/**
 * Интерфейс пропсов базового компонента.
 * @prop {string | undefined} className - Название класса для стилей элемента.
 * @prop {string | undefined} containerClassName - Название класса для стилей контейнера.
 * @prop {React.ReactNode | undefined} children - Дочерние компоненты.
 * @prop {React.LegacyRef<ComponentType> | undefined} ref - Реф компонента.
 */
export interface IBaseComponentProps<ComponentType extends HTMLElement = HTMLDivElement>
    extends DetailedHTMLProps<HTMLAttributes<ComponentType>, ComponentType> {
    className?: string;
    containerClassName?: string;
    children?: React.ReactNode;
    ref?: React.LegacyRef<ComponentType>;
}
