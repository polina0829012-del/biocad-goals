import { IWorkdeskbioClient } from './workdeskbio-client.interface';

/**
 * Интерфейс клиентов сервисов.
 * @prop {IWorkdeskbioClient} workdeskbioClient - Клиент для работы с данными workdeskbio.
 */
export interface IServicesClients {
    workdeskbioClient: IWorkdeskbioClient;
}
