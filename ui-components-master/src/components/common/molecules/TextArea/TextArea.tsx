import React, { FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { TextComponent } from '../../atoms/TextComponent/TextComponent';
import { ReactComponent as InfoCircleIcon } from '../../../../assets/icons/info-circle.svg';

import { CaptionTextComponentModel } from '../../../../models/components/text-component.models';
import { TEditableRowNames } from '../../../../types/profile/editable-row-names.type';
import { FontWeights } from '../../../../enums/text/font-weights.enum';
import { WindowEvents } from '../../../../enums/window-events.enum';
import { KeyboardKeys } from '../../../../enums/keyboard-keys.enum';

import { DIFF_TEXTAREA_HEIGHT_PX, TEXTAREA_MIN_HEIGHT_PX } from '../../../../global/constants/textarea';
import { getValueFromObjectPath } from '../../../../helpers/get-value-from-object-path.helper';
import VALIDATIONS_TEXT from '../../../../localization/ru/validations.json';

import styles from './TextArea.module.css';

/**
 * Интерфейс текстового поля.
 * @prop {TEditableRowNames | TFormNames} fieldName - Название поля.
 * @prop {(fieldName: string, value: string) => void | undefined} setValue - Устанавливает значение поля.
 * @prop {string | undefined} value - Значение поля.
 * @prop {number | undefined} maxLength - Максимальное значение количества символов поля.
 * @prop {number | undefined} minHeight - Минимальная высота текстового поля.
 * @prop {(event: React.ChangeEvent<HTMLTextAreaElement>) => void | undefined} onTextareaChange - Событие изменения значения текстарии.
 * @prop {string | undefined} classSymbolsLength - Класснейм для стилизации количества символов.
 * @prop {number | undefined} diffHeight - Разница высоты текстового поля.
 * @prop {boolean | undefined} isEnterAllowed - Разрешен ли перенос строки?
 */
interface ITextAreaProps<TFormNames> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    fieldName: TEditableRowNames | TFormNames;
    setValue?: (fieldName: string, value: string) => void;
    value?: string;
    maxLength?: number;
    minHeight?: number;
    onTextareaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    classSymbolsLength?: string;
    diffHeight?: number;
    isEnterAllowed?: boolean;
}

/**
 * Компонент текстового поля.
 * @param {ITextAreaProps<string>} params - Входные параметры компонента HTMLAttributes для HTMLInputElement.
 * @returns {ReactElement} React-элемент.
 */
export const TextArea: FC<ITextAreaProps<string>> = ({
    fieldName,
    setValue,
    className,
    onTextareaChange,
    maxLength,
    classSymbolsLength,
    minHeight = TEXTAREA_MIN_HEIGHT_PX,
    diffHeight = DIFF_TEXTAREA_HEIGHT_PX,
    value = '',
    isEnterAllowed = true,
    ...props
}) => {
    const [isHoverTooltip, setIsHoverTooltip] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    const textAreaRef = useRef<HTMLTextAreaElement>();

    const {
        watch,
        formState: { errors },
        register,
    } = useFormContext();

    const { ref: registerRef, onChange, onBlur, name, required } = register(fieldName);

    const textValue = watch(name);

    /**
     * Обновляет высоту <textarea>.
     * @returns {void} - Void.
     */
    const changeTextareaHeight = useCallback((): void => {
        if (!textAreaRef.current) {
            return;
        }

        textAreaRef.current.style.height = '0px';

        let scrollHeight;

        /* Если высота меньше чем минимальная, добавить разницу. */
        if (textAreaRef.current.scrollHeight < minHeight) {
            scrollHeight = diffHeight + textAreaRef.current.scrollHeight;
        } else {
            scrollHeight = textAreaRef.current.scrollHeight;
        }

        /* Устанавливаем высоту напрямую, вне цикла рендеринга, если установить иначе, приведет к неправильному значению. */
        textAreaRef.current.style.height = `${scrollHeight}px`;
    }, [minHeight, diffHeight]);

    /**
     * Эффектит перерасчет <textarea> при изменении значения textValue.
     */
    useEffect(() => {
        changeTextareaHeight();
    }, [minHeight, textValue, changeTextareaHeight]);

    /* Эффектит изменение высоты <textarea> при изменении окна браузера. */
    useEffect(() => {
        window.addEventListener(WindowEvents.resize, changeTextareaHeight);

        return () => {
            window.removeEventListener(WindowEvents.resize, changeTextareaHeight);
        };
    }, [window.devicePixelRatio, minHeight, textValue, changeTextareaHeight]);

    /**
     * Создает пропсы для текста количества символов.
     * @param {string} text - Текст.
     * @param {string | undefined} className - Название класса стилей.
     * @returns {CaptionTextComponentModel} - Пропсы текстовой модели.
     */
    const symbolsLengthTextProps = (text: string, className?: string): CaptionTextComponentModel =>
        new CaptionTextComponentModel({ text, className, weight: FontWeights.medium });

    /**
     * Обрабатывает события инпута устанавливая значение поиска.
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - Событие инпута.
     * @returns {void} Исполняет функцию установки значения поиска.
     */
    const onInputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value = (event.target as HTMLTextAreaElement).value;

        setValue?.(name, value);

        void onChange(event);
    };

    // TODO: P4NBCD-6032 classSymbolsLength для подсветки колличества символов при ошибке. Ожидаем общее описание для поведения полей. Возможно потребуется поправить компонент.
    /**
     * Рендерит количество символов в textarea.
     * @returns {ReactElement | undefined} Текущее и максимальное количество символов.
     */
    const renderSymbolsLength = (): ReactElement | undefined => {
        if (maxLength) {
            const symbolsText = `${String(textValue?.length ?? 0)}/${maxLength}`;

            return (
                <div className={styles.symbolsLengthContainer}>
                    <TextComponent
                        {...symbolsLengthTextProps(symbolsText, classNames(styles.symbolsLength, classSymbolsLength))}
                    />
                </div>
            );
        }
    };

    /**
     * Устанавливает состояние ошибки, если количество символов превышено.
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - Event.
     * @returns {void} - Void.
     */
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const currentValue = event.target.value;

        if (!maxLength) return;

        if (currentValue.length > maxLength) {
            setError(true);
        } else {
            setError(false);
        }

        void onChange(event);

        onTextareaChange?.(event);
    };

    /**
     * Обрабатывает нажатие на клавишу переноса строки.
     * @param {React.KeyboardEvent<HTMLTextAreaElement>} event - Event.
     * @returns {void} - Void.
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (isEnterAllowed) return;

        if (event.key !== KeyboardKeys.enter) return;

        event.preventDefault();
    };

    /** Создает пропсы для текста ошибки. */
    const errorTooltipTextProps = new CaptionTextComponentModel({
        weight: FontWeights.medium,
        text: VALIDATIONS_TEXT.maxSymbols,
    });

    return (
        <div className={styles.textAreaBlock}>
            <div className={styles.textArea}>
                <textarea
                    className={classNames(
                        styles.textAreaField,
                        Boolean(errors[name] ?? getValueFromObjectPath(errors, name)) && styles.error,
                        className
                    )}
                    onInput={onInputHandler}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    maxLength={maxLength}
                    onBlur={onBlur}
                    name={name}
                    required={required}
                    {...props}
                    ref={(element) => {
                        if (element) {
                            textAreaRef.current = element;
                            registerRef(element);
                        }
                    }}
                />
                {renderSymbolsLength()}
            </div>
            <div className={styles.errorBlock}>
                {error && (
                    <div onMouseEnter={() => setIsHoverTooltip(true)} onMouseLeave={() => setIsHoverTooltip(false)}>
                        <InfoCircleIcon className={styles.tooltipCircle} />
                    </div>
                )}
                {error && isHoverTooltip && (
                    <div className={styles.errorTooltip}>
                        <TextComponent {...errorTooltipTextProps} />
                    </div>
                )}
            </div>
        </div>
    );
};
