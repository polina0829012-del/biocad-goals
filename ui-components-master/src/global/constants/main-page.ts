import { LinkTargetTypes } from '../../enums/links-target-types.enum';

import HOME_PAGE from '../../localization/ru/home-page/home-page.json';

import { ROUTE_LINKS } from './route-links';

/** Карточка для отзыва. */
export const LEAVE_REVIEW_CARD = {
    title: HOME_PAGE.leaveReview,
    description: HOME_PAGE.reviewDescription,
    button: HOME_PAGE.buttonWrite,
    url: 'https://forms.office.com/Pages/ResponsePage.aspx?id=Pu9LHQsgOU-9sfUn4toTmVfNgvjOgjpIm484XXXmq5dUQ01UVE1BMUQzVjFHSVZQTllaWEhMTzBaUi4u',
};

/** Элементы меню поддержки портала. */
export const SUPPORT_MENU_ITEMS = [
    {
        label: HOME_PAGE.reportAnError,
        value: 'https://jira.bioclaude.ru/plugins/servlet/desk/workdeskbio/7/create/976',
        target: LinkTargetTypes.blank,
    },
    {
        label: HOME_PAGE.workdeskbioArticlesAndFeatures,
        value: '/knowledge_bases_catalog/knowledge_base/workdeskbio/1',
        target: LinkTargetTypes.blank,
    },
];

/** Элементы меню кошелька портала. */
export const WALLET_MENU_ITEMS = [
    {
        label: HOME_PAGE.compensate,
        value: 'https://teambuildings.bioclaude.ru/',
        target: LinkTargetTypes.blank,
    },
];

/** Элементы меню поддержки портала. */
export const FEEDBACK_MENU_ITEMS = [
    {
        label: HOME_PAGE.bVoice,
        value: ROUTE_LINKS.B_VOICE,
        target: LinkTargetTypes.blank,
    },
    {
        label: HOME_PAGE.receptionGeneralDirector,
        onClickOpenModal: true,
    },
    {
        label: HOME_PAGE.anonymousReception,
        value: 'https://napishivp.bioclaude.ru/',
        target: LinkTargetTypes.blank,
    },
];
