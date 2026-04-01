import { FC, useEffect, useMemo, useState } from 'react';

import { ErrorComponent, IErrorComponentProps } from '../../../common/molecules/ErrorComponent/ErrorComponent';
import { ReactComponent as ClientError } from '../../../../assets/images/errors/client-error.svg';
import { ReactComponent as ServerError } from '../../../../assets/images/errors/server-error.svg';

import { StatusCodes } from '../../../../enums/status-codes.enum';

import ErrorLocalization from '../../../../localization/ru/errors/error.json';

/**
 * Интерфейс пропсов компонента обертки страницы ошибки.
 * @param {number | undefined} status - Код сетевой ошибки.
 * @param {string | undefined} buttonText - Текст кнопки.
 * @param {string | undefined} description - Текст описания ошибки.
 * @param {string | undefined} link - Ссылка кнопки.
 * @param {string | undefined} message - Сообщение об ошибке.
 */
interface IErrorWrapperProps {
    status?: number;
    buttonText?: string;
    description?: string;
    link?: string;
    message?: string;
}
/**
 * Компонент обертки контента ошибки.
 * @param {IErrorWrapperProps} params - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const ErrorWrapper: FC<IErrorWrapperProps> = ({
    buttonText,
    description,
    link,
    message,
    status = StatusCodes.notFound,
}) => {
    const [changeStatus, setChangeStatus] = useState<StatusCodes>();

    /** Относиться ли сообщение к ошибке сети. */
    const isMessageNetworkError: boolean = message === ErrorLocalization.networkError;

    /**
     * Изменяет статус ошибки, в зависимости от входящего значения.
     */
    useEffect(() => {
        onClickChangeStatus(status as StatusCodes);
    }, [status]);

    /**
     * Меняет объект с информацией об ошибке.
     * @param {StatusCodes} code - Код ошибки.
     */
    const onClickChangeStatus = (code: StatusCodes): void => {
        setChangeStatus(code);
    };

    /**
     * Переключает значения статус-кода.
     * @returns {IErrorComponentProps} - Объект ошибки.
     */
    const errorObject = useMemo((): IErrorComponentProps => {
        switch (changeStatus) {
            case StatusCodes.unauthorized:
                return {
                    status: StatusCodes.unauthorized,
                    title: ErrorLocalization.unauthorizedTitle,
                    description: ErrorLocalization.unauthorizedDescription,
                    link: '/',
                    buttonText: ErrorLocalization.returnButtonText,
                    image: <ClientError />,
                };

            case StatusCodes.forbidden:
                return {
                    status: StatusCodes.forbidden,
                    title: isMessageNetworkError ? ErrorLocalization.notFoundTitle : ErrorLocalization.forbiddenTitle,
                    description: ErrorLocalization.badGatewayDescription,
                    link: '/',
                    buttonText: ErrorLocalization.returnButtonText,
                    image: <ClientError />,
                };

            case StatusCodes.notFound:
                return {
                    status: StatusCodes.notFound,
                    title: ErrorLocalization.notFoundTitle,
                    description: description ?? ErrorLocalization.notFoundDescription,
                    link: link ?? '/',
                    buttonText: buttonText ?? ErrorLocalization.returnButtonText,
                    image: <ClientError />,
                };

            case StatusCodes.internalServerError:
                return {
                    status: StatusCodes.internalServerError,
                    title: ErrorLocalization.internalServerErrorTitle,
                    description: ErrorLocalization.internalServerErrorDescription,
                    link: '/',
                    buttonText: ErrorLocalization.returnButtonText,
                    image: <ServerError />,
                };

            case StatusCodes.badGateway:
                return {
                    status: StatusCodes.badGateway,
                    title: ErrorLocalization.badGatewayTitle,
                    description: ErrorLocalization.badGatewayDescription,
                    link: '/',
                    buttonText: ErrorLocalization.returnButtonText,
                    image: <ServerError />,
                };

            case StatusCodes.serviceUnavailable:
                return {
                    status: StatusCodes.serviceUnavailable,
                    title: ErrorLocalization.serviceUnavailableTitle,
                    description: ErrorLocalization.serviceUnavailableDescription,
                    link: '/',
                    buttonText: ErrorLocalization.returnButtonText,
                    image: <ServerError />,
                };

            default:
                return {
                    status: 0,
                    title: '',
                    description: '',
                    link: '',
                    buttonText: '',
                    image: null,
                };
        }
    }, [changeStatus]);

    return (
        <ErrorComponent
            status={errorObject.status}
            title={errorObject.title}
            description={errorObject.description}
            link={errorObject.link}
            buttonText={errorObject.buttonText}
            image={errorObject.image}
        />
    );
};
