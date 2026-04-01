import { IButtonProps } from './button-props.interface';

/**
 * Интерфейс пропсов компонента иконочной квадратной кнопки.
 * @prop {IButtonProps['iconFirst']} icon - Иконка встраиваемая в кнопку.
 */
export interface ISquareIconButtonProps extends Omit<IButtonProps, 'iconFirst' | 'iconLast'> {
    icon: IButtonProps['iconFirst'];
}
