import { createFileBlob } from '../helpers/create-file-blob.helper';
import { WorkdeskbioService } from '../state/service/workdeskbio.service';

/** Загружает фото профиля.
 * @param {string | null | undefined} adLogin - Логин пользователя.
 * @param {WorkdeskbioService} workdeskbioService - Сервис workdeskbio.
 * @param {(value: React.SetStateAction<string | null>) => void} setUserPhoto - Устанавливает фото пользователя.
 * @returns {void} - Void.
 */
export const getProfilePhoto = (
    adLogin: string | null | undefined,
    workdeskbioService: WorkdeskbioService,
    setUserPhoto: (value: React.SetStateAction<string | null>) => void
): void => {
    setUserPhoto(null);

    if (!adLogin) return;

    workdeskbioService
        ?.getUserPhoto(adLogin)
        .then((photo) => {
            if (!photo) return;

            const photoBlob = createFileBlob(photo, (photo as Blob).type);

            setUserPhoto(URL.createObjectURL(photoBlob));
        })
        .catch((error) => {
            setUserPhoto(null);
            console.log(error);
        });
};
