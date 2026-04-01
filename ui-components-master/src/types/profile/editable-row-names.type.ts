import { ProfileInfoRows } from '../../enums/profile-info-rows.enum';

/**
 * Тип с названиями изменяемых разделов профиля.
 */
export type TEditableRowNames = Exclude<
    ProfileInfoRows,
    | ProfileInfoRows.birthDate
    | ProfileInfoRows.head
    | ProfileInfoRows.email
    | ProfileInfoRows.subdivision
    | ProfileInfoRows.city
    | ProfileInfoRows.employmentDate
>;
