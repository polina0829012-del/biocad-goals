import { FC } from 'react';
import classNames from 'classnames';

import { IBaseComponentProps } from '../../../../interfaces/components/common/base-component-props.interface';

import styles from './Spinner.module.css';

/**
 * Компонент спинера для загрузки.
 * @param {IBaseComponentProps} params - Входные параметры компонента.
 * @returns {React.FC} - Функциональный react-компонент.
 */
export const Spinner: FC<IBaseComponentProps> = (props) => {
    return <div className={classNames(styles.spinner, props.className)} />;
};
