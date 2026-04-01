import { Type } from 'class-transformer';

import { BaseDto } from '../baseDto';

import { MenuElementLevels } from '../../enums/menu/menu-item-levels.enum';
import { MenuItemType } from '../../enums/menu/menu-item-type.enum';
import { UserRoles } from '../../enums/user-roles.enum';

/**
 * DTO элемента меню.
 * @prop {number} id - Уникальный идентификатор.
 * @prop {string | null} title - Название элемента меню.
 * @prop {boolean | null} isTitleShown - Отображать в меню?
 * @prop {string | null} url - URL элемента меню.
 * @prop {MenuItemType} type - Тип элемента меню.
 * @prop {number} order - Порядковый номер для сортировки.
 * @prop {MenuItemDto[] | null} childItems - Дочерние элементы меню.
 * @prop {UserRoles[] | null} requiredRoles - Роли, для которых доступен элемент меню.
 * @prop {number} iconId - Идентификатор иконки.
 * @prop {MenuElementLevels} level - Уровень вложенности.
 * @prop {number} parentId - Идентификатор родителя.
 */
export class MenuItemDto extends BaseDto {
    public id: number = 0;

    public title: string | null = null;

    public isTitleShown: boolean | null = null;

    public url: string | null = null;

    public type: MenuItemType = MenuItemType.item;

    public level: MenuElementLevels = MenuElementLevels.first;

    public order: number = 0;

    // Используется декоратор для рекурсивной модели которая приходит с сервера.
    @Type(() => MenuItemDto)
    public childItems: MenuItemDto[] | null = null;

    public requiredRoles: UserRoles[] | null = null;

    public iconId: number = 0;

    public parentId: number | null = null;
}
