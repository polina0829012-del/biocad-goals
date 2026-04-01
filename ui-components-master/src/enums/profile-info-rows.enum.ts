/**
 * Строки с информацией профиля.
 * @enum {string}
 * @member {string} ProfileInfoRows.birthDate - День рождения.
 * @member {string} ProfileInfoRows.email - Почта.
 * @member {string} ProfileInfoRows.telegram - Телеграм.
 * @member {string} ProfileInfoRows.additionalPhone - Дополнительный телефон.
 * @member {string} ProfileInfoRows.head - Руководитель.
 * @member {string} ProfileInfoRows.about - О себе.
 * @member {string} ProfileInfoRows.subdivision - Подразделение.
 * @member {string} ProfileInfoRows.city - Город.
 * @member {string} ProfileInfoRows.employmentDate - Дата трудоустройства.
 * @member {string} ProfileInfoRows.organizationName - Наименование организации.
 * @member {string} ProfileInfoRows.positionName - Должность.
 */
export enum ProfileInfoRows {
    birthDate = 'birthDate',
    email = 'email',
    telegram = 'telegram',
    additionalPhone = 'additionalPhone',
    head = 'head',
    about = 'about',
    subdivision = 'subdivision',
    city = 'city',
    employmentDate = 'employmentDate',
    hrPartner = 'hrPartner',
    organizationName = 'organizationName',
    subdivisionName = 'subdivisionName',
    positionName = 'positionName',
}
