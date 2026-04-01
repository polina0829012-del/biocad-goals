/**
 * Получает значение по пути объекта.
 * @param {Record<string, unknown>} objectPath  - Объект для запроса.
 * @param {string} path - Путь к получению свойства.
 * @returns {unknown} - Значение объекта.
 */
export function getValueFromObjectPath(objectPath: Record<string, unknown>, path: string): unknown {
    let current: any = objectPath;
    for (const key of path.split('.')) {
        current = current?.[key];
    }
    return current;
}
