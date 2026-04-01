import { FC, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Spinner } from '../../../../common/atoms/Spinner/Spinner';
import { TextLink } from '../../../../common/atoms/TextLink/TextLink';
import { TextComponent } from '../../../../common/atoms/TextComponent/TextComponent';
import { Button } from '../../../../common/molecules/Button/Button';

import { LinkTargetTypes } from '../../../../../enums/links-target-types.enum';
import { TextVariations } from '../../../../../enums/text/text-variations.enum';
import { ButtonStyles } from '../../../../../enums/button-styles.enum';
import { FontWeights } from '../../../../../enums/text/font-weights.enum';

import { createTextProps } from '../../../../../helpers/text/create-text-props.helper';
import { CONSULTATOR_LINK } from '../../../../../global/constants/quick-search';
import SearchLocalization from '../../../../../localization/ru/quick-search/quick-search.json';

import styles from './AdvancedSearchLlmAnswer.module.css';

/**
 * Интерфейс пропсов компонента ответа Llm в расширенном поиске.
 * @prop {boolean} isLoadingLlmAnswer - Ответ загружается?
 * @prop {string | null | undefined} answerByLlm - Ответ от Llm.
 * @prop {(isOpen: boolean) => void} setIsModalOpen - Открывает модальное окно.
 */
interface IAdvancedSearchLlmAnswerProps {
    isLoadingLlmAnswer: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    answerByLlm?: string | null;
}

/**
 * Компонент ответа Llm в расширенном поиске.
 * @param {IAdvancedSearchLlmAnswerProps} params - Входные параметры компонента ответа Llm в расширенном поиске.
 * @returns {React.FC} Функциональный react-компонент.
 */
export const AdvancedSearchLlmAnswer: FC<IAdvancedSearchLlmAnswerProps> = ({
    isLoadingLlmAnswer,
    answerByLlm,
    setIsModalOpen,
}) => {
    const [isOverflowed, setIsOverflowed] = useState<boolean>(false);

    const quickAnswerTextRef = useRef<HTMLDivElement>(null);

    /** Устанавливает флаг переполнения когда ответ большой. */
    useEffect(() => {
        const element = quickAnswerTextRef.current;

        if (!element) return;

        setIsOverflowed(element.scrollHeight > element.clientHeight);
    }, [answerByLlm]);

    return (
        <div className={styles.cardBodyContainer}>
            {isLoadingLlmAnswer ? (
                <Spinner className={styles.llmAnswerSpinner} />
            ) : (
                <>
                    <div ref={quickAnswerTextRef} className={styles.cardBody}>
                        <ReactMarkdown
                            className={styles.markdownText}
                            components={{
                                a: ({ node, ...props }) => (
                                    <TextLink
                                        {...props}
                                        // eslint-disable-next-line react/prop-types -- Ошибка eslint.
                                        to={String(props.href)}
                                        target={LinkTargetTypes.blank}
                                    />
                                ),
                            }}
                        >
                            {answerByLlm}
                        </ReactMarkdown>
                    </div>
                    {isOverflowed && (
                        <Button
                            className={styles.readMoreText}
                            title={SearchLocalization.readMore}
                            buttonStyle={ButtonStyles.primaryText}
                            onClick={() => setIsModalOpen(true)}
                        />
                    )}
                    <div className={styles.inlineText}>
                        <TextComponent
                            {...createTextProps({
                                text: SearchLocalization.answerBy,
                                textVariation: TextVariations.text,
                                className: styles.inlineText,
                            })}
                        />
                        <TextLink to={CONSULTATOR_LINK}>
                            <TextComponent
                                {...createTextProps({
                                    text: SearchLocalization.consultator,
                                    textVariation: TextVariations.text,
                                    className: styles.inlineText,
                                    weight: FontWeights.medium,
                                })}
                            />
                        </TextLink>
                    </div>
                </>
            )}
        </div>
    );
};
