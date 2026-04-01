import { UserRoles } from '../enums/api/user-roles.enum';

import { ADMIN_ROLES } from '../global/constants/admin/admin-roles';

/**
 * Проверяет наличие роли у пользователя.
 * @param {string | string[]} targetRole - Роль, наличие которой нужно проверить.
 * @param {UserRoles[] | undefined} accountRoles - Роли аккаунта.
 * @returns {boolean | undefined} - Роль есть?
 */
export const checkHasRole = (targetRole: string | string[], accountRoles?: UserRoles[]): boolean | undefined => {
const isIncludeRole =
    typeof targetRole === 'string'
        ? accountRoles?.includes(targetRole as UserRoles)
        : accountRoles?.some((userRole) => targetRole?.includes(userRole));

    return isIncludeRole;
};

/**
 * Проверяет наличие роли администратора у пользователя.
 * @param {UserRoles[] | undefined} accountRoles - Роли аккаунта.
 * @returns {boolean | undefined} - Есть роль администратора?
 */
export const checkHasAdminRole = (accountRoles?: UserRoles[]): boolean | undefined => {
    const isIncludeRole = accountRoles?.some((userRole) => ADMIN_ROLES.includes(userRole));

    return isIncludeRole;
};
