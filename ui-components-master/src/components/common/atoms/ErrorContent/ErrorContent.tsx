import { FC } from 'react';
import classNames from 'classnames';

import { TextLink } from '../../molecules/TextLink/TextLink';
import { Button } from '../../atoms/Button/Button';

import { ButtonStyles } from '../../../../enums/button-styles.enum';
import { FontWeights } from '../../../../enums/font-weights.enum';

import { LINK_MAIN_PAGE } from '../../../../global/constants/menu/sidebar-menu';

import styles from './ErrorContent.module.css';

/**
 * Интерфейс компонента отображения ошибок.
 * @prop {JSX.Element | null} image - Картинка ошибки.
 * @prop {JSX.Element} errorStatus - Статус ошибки.
 * @prop {JSX.Element} errorText - Текст ошибки.
 * @prop {JSX.Element} errorDescriptionText - Текст описания ошибки.
 * @prop {string} errorButtonText - Текст кнопки в компоненте отображения ошибок.
 * @prop {string} link - Ссылка.
 */
interface IErrorContentProps {
    image: JSX.Element | null;
    errorStatus: JSX.Element;
    errorText: JSX.Element;
    errorDescriptionText: JSX.Element;
    errorButtonText: string;
    link: string;
}

/**
 * Компонент контента страницы ошибки.
 * @param {IErrorContentProps} params - входные параметры компонента.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const ErrorContent: FC<IErrorContentProps> = ({
    image,
    errorStatus,
    errorText,
    errorDescriptionText,
    errorButtonText,
    link,
}) => {
    return (
        <div className={styles.errorBlock}>
            {image}
            <div className={styles.errorDescription}>
                {errorStatus}
                <div className={styles.errorText}>
                    <div className={classNames(FontWeights.bold)}>{errorText}</div>
                    <div className={styles.errorDescriptionText}>{errorDescriptionText}</div>
                </div>
                {location.pathname !== LINK_MAIN_PAGE && (
                    <TextLink to={link}>
                        <Button buttonStyle={ButtonStyles.primary} title={errorButtonText} />
                    </TextLink>
                )}
            </div>
        </div>
    );
};
