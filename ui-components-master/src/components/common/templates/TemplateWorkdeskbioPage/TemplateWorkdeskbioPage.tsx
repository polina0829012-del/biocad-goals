import { FC, ReactElement } from 'react';

import { TemplatePage } from '../../templates/TemplatePage/TemplatePage';
import { Header } from '../../organisms/Header/Header';
import { Footer } from '../../molecules/Footer/Footer';

import { UserRoles } from '../../../../enums/api/user-roles.enum';

/**
 * Интерфейс пропсов компонента-сетки страницы.
 * @prop {React.ReactNode | undefined} menu - Компонент меню.
 * @prop {React.ReactNode | undefined} content - Компонент основного контента.
 * @prop {string | undefined} workdeskbioMainPageLink - Ссылка на главную страницу workdeskbio.
 * @prop {string | undefined} hcmWorkdeskbioLink - Ссылка на HCM-workdeskbio.
 * @prop {string | undefined} menuLogoLink - Ссылка для логотипа в меню.
 * @prop {UserRoles[] | undefined} accountRoles - Роли пользователя.
 */
export interface ITemplateWorkdeskbioPageProps {
    content?: React.ReactNode;
    menu?: ReactElement;
    workdeskbioMainPageLink?: string;
    hcmWorkdeskbioLink?: string;
    menuLogoLink?: string;
    accountRoles?: UserRoles[];
}

/**
 * Компонент-сетки страницы workdeskbio.
 * @param {ITemplateWorkdeskbioPageProps} params - Входные параметры компонента.
 * @returns {ReactElement} React-элемент.
 */
export const TemplateWorkdeskbioPage: FC<ITemplateWorkdeskbioPageProps> = ({
    content,
    menu,
    workdeskbioMainPageLink,
    menuLogoLink,
    hcmWorkdeskbioLink,
    accountRoles
}) => {
    const header: JSX.Element = (
        <Header
            workdeskbioMainPageLink={workdeskbioMainPageLink}
            hcmWorkdeskbioLink={hcmWorkdeskbioLink}
            accountRoles={accountRoles}
        />
    );

    return (
        <TemplatePage
            header={header}
            content={content}
            footer={<Footer />}
            menu={menu}
            menuLogoLink={menuLogoLink}
        />
    );
};
