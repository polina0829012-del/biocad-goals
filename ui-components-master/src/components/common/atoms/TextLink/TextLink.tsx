import { FC } from 'react';
import classnames from 'classnames';

// eslint-disable-next-line import/named -- react-router-dom содержит в себе экспортируемый интерфейс LinkProps
import { Link, LinkProps } from 'react-router-dom';

import styles from './TextLink.module.css';

/**
 * Компонент Текстовой ссылки.
 * @param {LinkProps} props - Пропсы компонента.
 * @returns {ReactElement} React-элемент.
 */
export const TextLink: FC<LinkProps> = (props) => {
    return (
        <Link {...props} className={classnames(styles.link, props.className)}>
            {props.children}
        </Link>
    );
};
