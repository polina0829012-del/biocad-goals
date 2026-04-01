import React, { useRef } from 'react';
import { Provider } from 'mobx-react';

import { IServicesClients } from '../interfaces/api/client/services-clients.interface';

import { ServicesProvider } from '../utils/services.provider';

/**
 * Интерфейс компонента высшего порядка, предоставляющий дочерним компонентам коллекцию сервисов.
 * @prop {IServicesClients} servicesClients - Клиенты сервисов.
 * @prop {React.ReactNode} children - Дочерние элементы.
 */
interface WorkdeskbioServicesProviderProps {
    servicesClients: IServicesClients;
    children: React.ReactNode;
}

/**
 * Компонент высшего порядка, предоставляющий дочерним компонентам коллекцию сервисов.
 * @param {WorkdeskbioServicesProviderProps} params - Входные параметры компонентов.
 * @returns {ReactElement} React-элемент.
 */
export const WorkdeskbioServicesProvider: React.FC<WorkdeskbioServicesProviderProps> = ({ servicesClients, children }) => {
    const servicesProvider = useRef<ServicesProvider | null>(null);

    if (!servicesProvider.current) {
        servicesProvider.current = new ServicesProvider(servicesClients.workdeskbioClient);
    } else {
        servicesProvider.current.updateClient(servicesClients.workdeskbioClient);
    }

    const workdeskbioServices = servicesProvider.current.getServicesCollection();

    return <Provider {...workdeskbioServices}>{children}</Provider>;
};
