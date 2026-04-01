import { WorkdeskbioStore } from '../state/store/workdeskbio.store';
import { WorkdeskbioService } from '../state/service/workdeskbio.service';

import { IWorkdeskbioClient } from '../interfaces/api/client/workdeskbio-client.interface';
import { WorkdeskbioUiStore } from '../state/store/workdeskbio-ui.store';
import { WorkdeskbioUiService } from '../state/service/workdeskbio-ui.service';

/**
 * Поставщик сервисов.
 */
export class ServicesProvider {
    public readonly workdeskbioStore: WorkdeskbioStore;
    public readonly workdeskbioService: WorkdeskbioService;
    public readonly workdeskbioUiStore: WorkdeskbioUiStore;
    public readonly workdeskbioUiService: WorkdeskbioUiService;

    private workdeskbioClient: IWorkdeskbioClient;

    private readonly servicesCollection: object;

    /**
     * Конструктор поставщика сервисов.
     * @prop {IWorkdeskbioClient} PortalClient - Клиент для работы с данными workdeskbio.
     */
    constructor(PortalClient: IWorkdeskbioClient) {
        this.workdeskbioClient = PortalClient;

        const workdeskbioStore = new WorkdeskbioStore();
        this.workdeskbioStore = workdeskbioStore;
        this.workdeskbioService = new WorkdeskbioService(this.workdeskbioClient, workdeskbioStore);

        const workdeskbioUiStore = new WorkdeskbioUiStore();
        this.workdeskbioUiStore = workdeskbioUiStore;
        this.workdeskbioUiService = new WorkdeskbioUiService(workdeskbioUiStore);

        this.servicesCollection = {
            workdeskbioStore: this.workdeskbioStore,
            workdeskbioService: this.workdeskbioService,

            workdeskbioUiStore: this.workdeskbioUiStore,
            workdeskbioUiService: this.workdeskbioUiService,
        };
    }

    /**
     * Обновляет клиента для текущего экземпляра сервиса.
     * @param {IWorkdeskbioClient} PortalClient - Клиент для работы с данными workdeskbio.
     */
    public updateClient(PortalClient: IWorkdeskbioClient): void {
        this.workdeskbioClient = PortalClient;
    }

    public readonly getServicesCollection = (): object => this.servicesCollection;
}
