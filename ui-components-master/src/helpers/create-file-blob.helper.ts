/**
 * Создает blob-файл.
 * @param {BlobPart} blobFile - Зашифрованный файл для преобразования в blob.
 * @param {string} blobType - Тип возвращаемого формата отображения blob-a.
 * @returns {Blob}
 */
export const createFileBlob = (blobFile: BlobPart, blobType: string): Blob => {
    return new Blob([blobFile], { type: blobType });
};