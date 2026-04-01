/**
 * Query параметры страницы управленческой структуры.
 * @enum {string}
 * @member {string} ManagementStructureQueryParams.subdivisionId - Идентификатор подразделения.
 * @member {string} ManagementStructureQueryParams.organizationStructurePositionId - Идентификатор позиции.
 * @member {string} ManagementStructureQueryParams.userId - Идентификатор пользователя.
 */
export enum ManagementStructureQueryParams {
    subdivisionId = 'subdivisionId',
    organizationStructurePositionId = 'organizationStructurePositionId',
    userId = 'userId',
}
