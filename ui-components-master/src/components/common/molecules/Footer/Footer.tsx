import { FC } from 'react';

import { Divider } from '../../molecules/Divider/Divider';
import { TextComponent } from '../../atoms/TextComponent/TextComponent';
import { ReactComponent as FooterCompanyLogoIcon } from '../../../../assets/icons/common/bioclaude-logo-black.svg';

import { TextSmallComponentModel } from '../../../../models/components/text-component.models';

import COPYRIGHT_LOCALIZATION from '../../../../localization/ru/footer/footer.json';

import styles from './Footer.module.css';

/**
 * Компонент Футера.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const Footer: FC = () => {
    const currentYear = new Date().getFullYear();

    const copyrightText = COPYRIGHT_LOCALIZATION.copyrightText.replace('CURRENT_YEAR', currentYear.toString());

    const bottomFooterTextProps = new TextSmallComponentModel({ text: copyrightText });

    return (
        <div>
            <Divider />
            <section className={styles.bottomFooter}>
                <FooterCompanyLogoIcon />
                <TextComponent {...bottomFooterTextProps} />
            </section>
        </div>
    );
};
