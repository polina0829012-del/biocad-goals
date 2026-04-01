import { FC, ReactElement } from 'react';

import { TemplatePage } from '../../components/common/templates/TemplatePage/TemplatePage';
import { ErrorWrapper } from '../../components/common/organisms/ErrorWrapper/ErrorWrapper';
import { Footer } from '../../components/common/molecules/Footer/Footer';

/**
 * Интерфейс компонента страницы с ошибкой.
 * @prop {number | undefined} status - Код ошибки.
 * @prop {string | undefined} message - Сообщение об ошибке.
 * @prop {ReactElement | undefined} header - Компонент шапки.
 * @prop {ReactElement | undefined} footer - Компонент футера.
 */
interface IErrorPageProps {
    status?: number;
    message?: string;
    header?: ReactElement;
    footer?: ReactElement;
}
/**
 * Компонент страницы с ошибкой.
 * @returns {ReactElement} React-элемент.
 */
export const ErrorPage: FC<IErrorPageProps> = ({ status, message = '', header, footer = <Footer /> }) => {
    return (
        <TemplatePage header={header} content={<ErrorWrapper status={status} message={message} />} footer={footer} />
    );
};
