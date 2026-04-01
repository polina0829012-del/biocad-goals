/**
 * Роли пользователей.
 * @enum {string}
 * @member {string} UserRoles.globalAdmin - Глобальный администратор.
 * @member {string} UserRoles.admin - Администратор.
 * @member {string} UserRoles.user - Пользователь.
 * @member {string} UserRoles.leader - Руководитель.
 * @member {string} UserRoles.civil - ГПХ.
 * @member {string} UserRoles.trainee - Стажер.
 * @member {string} UserRoles.director - Директор.
 * @member {string} UserRoles.assistantDirector - Ассистент директора.
 * @member {string} UserRoles.bVoiceModerator - Модератор стены обратной связи.
 * @member {string} UserRoles.achievementAdmin - Администратор награждений.
 * @member {string} UserRoles.achievementManager - Менеджер награждений.
 * @member {string} UserRoles.knowledgeBaseModerator - Модератор базы знаний.
 * @member {string} UserRoles.newsAdmin - Администратор сервиса новостей.
 */
export enum UserRoles {
    globalAdmin = 'global-admin',
    admin = 'admin',
    user = 'user',
    leader = 'leader',
    civil = 'civil',
    trainee = 'trainee',
    director = 'director',
    assistantDirector = 'assistant-director',
    bVoiceModerator = 'bvoice-moderator',
    achievementAdmin = 'achievement-admin',
    achievementManager = 'achievement-manager',
    knowledgeBaseModerator = 'knowledge-base-moderator',
    newsAdmin = 'news-admin',
}
