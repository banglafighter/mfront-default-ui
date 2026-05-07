import {WebInputFieldProps} from "mmcore-ui";
import {DefaultInputFrame} from "./default-input-frame";
import {UICommonUtil, useFieldHelper} from "mfront-ui";
import {MixType} from "mmcore";
import {DefaultInput} from "./default-input";
import {DefaultTextarea} from "./default-textarea";


export function DefaultInputField({name, className, label, labelNext, required, errorText, hintsText, isError, inputClassName, id, onChange, defaultValue, engine, type = "text", ...props}: WebInputFieldProps) {
    const {fieldRef, handleChange} = useFieldHelper<HTMLInputElement>({name, defaultValue, engine, onChange})
    const {fieldRef : textareaRef, handleChange: textareaHandleChange} = useFieldHelper<HTMLTextAreaElement>({name, defaultValue, engine, onChange})
    const {gridItemProps, otherProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)

    const getInputField = (labelKey: string) => {
        return (
            <DefaultInput
                aria-invalid={isError}
                name={name}
                id={labelKey}
                type={type}
                {...otherProps}
                className={inputClassName}
                ref={fieldRef}
                onChange={handleChange}
            />
        )
    }

    const getTextareaField = (labelKey: string) => {
        return (
            <DefaultTextarea
                aria-invalid={isError}
                name={name}
                id={labelKey}
                {...otherProps}
                className={inputClassName}
                ref={textareaRef}
                onChange={textareaHandleChange}
            />
        )
    }

    return (
        <DefaultInputFrame
            label={label}
            labelNext={labelNext}
            required={required}
            errorText={errorText}
            hintsText={hintsText}
            isError={isError}
            className={className}
            id={id}
            {...gridItemProps}
            element={(labelKey: string) => {
                if (type === "textarea") {
                    return getTextareaField(labelKey)
                }
                return getInputField(labelKey)
            }}
        />
    )
}