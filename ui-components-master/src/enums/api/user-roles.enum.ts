/**
 * Роли пользователей.
 * @enum {string}
 * Пользовательские роли.
 * @member {string} UserRoles.user - Пользователь.
 * @member {string} UserRoles.leader - Руководитель.
 * @member {string} UserRoles.civil - ГПХ.
 * @member {string} UserRoles.trainee - Стажер.
 * @member {string} UserRoles.director - Директор.
 * @member {string} UserRoles.assistantDirector - Ассистент директора.
 * @member {string} UserRoles.tmbUser - Пользователь тимбилдингов.
 * Администраторские роли Воркдеска.
 * @member {string} UserRoles.admin - Администратор.
 * @member {string} UserRoles.bVoiceModerator - Модератор стены обратной связи.
 * @member {string} UserRoles.achievementAdmin - Администратор награждений.
 * @member {string} UserRoles.achievementManager - Менеджер награждений.
 * @member {string} UserRoles.knowledgeBaseModerator - Модератор базы знаний.
 * @member {string} UserRoles.newsAdmin - Администратор сервиса новостей.
 * Администраторские роли внешних сервисов.
 * @member {string} UserRoles.tmbSecurityDepartmentApprover - Апрувер тимбилдингов.
 * @member {string} UserRoles.tmbAdmin - Администратор тимбилдингов.
 * @member {string} UserRoles.moleculeAdmin - Администратор молекулы.
 * @member {string} UserRoles.moleculeSuperUser - Супер пользователь молекулы.
 * @member {string} UserRoles.moleculeApprover - Апрувер молекулы.
 * @member {string} UserRoles.moleculeVicePresident - Президент молекулы.
 * @member {string} UserRoles.moleculeDirection - Дирекция молекулы.
 * @member {string} UserRoles.adminForMenu - Роль для ограничения доступа к меню только пользователем с ролью admin.
 * @member {string} UserRoles.leaderForMenu - Роль для ограничения доступа к меню только пользователем с ролью leader.
 */
export enum UserRoles {
    /** Пользовательские роли. */
    user = 'workdeskbio.user',
    leader = 'workdeskbio.leader',
    civil = 'workdeskbio.civil',
    trainee = 'workdeskbio.trainee',
    director = 'workdeskbio.director',
    assistantDirector = 'workdeskbio.assistant-director',
    tmbUser = 'tmb.user',

    /** Администраторские роли workdeskbio. */
    admin = 'workdeskbio.admin',
    bVoiceModerator = 'workdeskbio.bvoice-moderator',
    achievementAdmin = 'workdeskbio.achievement-admin',
    achievementManager = 'workdeskbio.achievement-manager',
    knowledgeBaseModerator = 'workdeskbio.knowledge-base-moderator',
    newsAdmin = 'workdeskbio.news-admin',

    /** Администраторские роли внешних сервисов. */
    tmbSecurityDepartmentApprover = 'tmb.security-department-approver',
    tmbAdmin = 'tmb.admin',
    moleculeAdmin = 'molecule.admin',
    moleculeApprover = 'molecule.approver',

    // TODO: временное решение для админки меню, будет поправлено.
    adminForMenu = 'admin',
    leaderForMenu = 'leader',
}
