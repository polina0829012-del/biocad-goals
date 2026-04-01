import { FC, useEffect, useMemo, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ShortUserInfo } from '../../../features/MainPageContent/organisms/ShortUserInfo/ShortUserInfo';
import { HeaderQuickInfoButtons } from '../../../features/MainPageContent/organisms/HeaderQuickInfoButtons/HeaderQuickInfoButtons';
import { QuickSearch } from '../QuickSearch/QuickSearch';

import { StoreNames } from '../../../../enums/store-names.enum';
import { WindowEvents } from '../../../../enums/window-events.enum';
import { ServiceNames } from '../../../../enums/service-names.enum';
import { UserRoles } from '../../../../enums/api/user-roles.enum';

import { WorkdeskbioStore } from '../../../../state/store/workdeskbio.store';
import { WorkdeskbioService } from '../../../../state/service/workdeskbio.service';
import { WORKDESKBIO_ROUTE_LINKS } from '../../../../global/constants/workdeskbio-route-links';
import { MAX_SCROLL_TOP } from '../../../../global/constants/header';
import HOME_PAGE from '../../../../localization/ru/home-page/home-page.json';

import styles from './Header.module.css';

/**
 * Интерфейс пропсов шапки.
 * @prop {WorkdeskbioService | undefined} workdeskbioService - Сервис для работы с данными workdeskbio.
 * @prop {WorkdeskbioStore | undefined} workdeskbioStore - Хранилище данных workdeskbio.
 * @prop {string | undefined} workdeskbioMainPageLink - Ссылка на главную страницу workdeskbio.
 * @prop {string | undefined} hcmWorkdeskbioLink - Ссылка на HCM-workdeskbio.
 */
export interface IHeaderProps {
    workdeskbioService?: WorkdeskbioService;
    workdeskbioStore?: WorkdeskbioStore;
    workdeskbioMainPageLink?: string;
    hcmWorkdeskbioLink?: string;
    accountRoles?: UserRoles[];
}

/**
 * Компонент шапки.
 * @returns {ReactElement} React-элемент.
 */
export const Header: FC<IHeaderProps> = inject(
    StoreNames.workdeskbioStore,
    ServiceNames.workdeskbioService
)(
    observer(({ workdeskbioService, workdeskbioStore, workdeskbioMainPageLink, hcmWorkdeskbioLink, accountRoles }) => {
        const [isScrolled, setIsScrolled] = useState<boolean>(false);

        /**
         * Обработчик события прокрутки страницы.
         * @returns {void}
         */
        const handleScroll = (): void => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            /** Устанавливаем значение true, если страница прокручена вниз ниже установленного значения. */
            setIsScrolled(scrollTop > MAX_SCROLL_TOP);
        };

        /** Эффектит загрузку данных пользователя. */
        useEffect(() => {
            if (workdeskbioStore?.currentUser) return;

            void workdeskbioService?.loadCurrentUser();
        }, [workdeskbioService, workdeskbioStore?.currentUser]);

        /** Эффектит добавление скрола. */
        useEffect(() => {
            /** Добавляем обработчик события скролла при монтировании компонента. */
            window.addEventListener(WindowEvents.scroll, handleScroll);

            /** Удаляем обработчик события скролла при монтировании компонента. */
            return () => {
                window.removeEventListener(WindowEvents.scroll, handleScroll);
            };
        }, []);

        /** Эффектит обновление ссылки на главную страницу Воркдеска. */
        useEffect(() => {
            if (!workdeskbioMainPageLink) return;

            workdeskbioStore?.setMainPageLink(workdeskbioMainPageLink);
        }, [workdeskbioMainPageLink, workdeskbioStore]);

        /** Эффектит обновление ролей пользователя. */
        useEffect(() => {
            if (!accountRoles) return;

            workdeskbioStore?.setAccountRoles(accountRoles);
        }, [accountRoles, workdeskbioStore]);

        const userLink = workdeskbioStore?.currentUser?.adLogin
            ? `${hcmWorkdeskbioLink ?? ''}${WORKDESKBIO_ROUTE_LINKS.PROFILE}/${workdeskbioStore?.currentUser?.adLogin}`
            : '';

        /** Краткая информация пользователя. */
        const shortUserInfo = useMemo(() => {
            return (
                <ShortUserInfo
                    isScrolled={isScrolled}
                    adLogin={workdeskbioStore?.currentUser?.adLogin ?? ''}
                    firstName={workdeskbioStore?.currentUser?.firstName ?? ''}
                    lastName={workdeskbioStore?.currentUser?.lastName ?? ''}
                    email={workdeskbioStore?.currentUser?.email ?? ''}
                />
            );
        }, [workdeskbioStore?.currentUser, isScrolled]);

        return (
            <div className={classNames(styles.header, isScrolled && styles.scrollHeader)}>
                <QuickSearch
                    containerClassName={styles.searchContainer}
                    placeholder={HOME_PAGE.quickSearchPlaceholder}
                    hcmWorkdeskbioLink={hcmWorkdeskbioLink}
                />
                <div className={styles.contentRight}>
                    <HeaderQuickInfoButtons />
                    <Link to={userLink}>{shortUserInfo}</Link>
                </div>
            </div>
        );
    })
);
