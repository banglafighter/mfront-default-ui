import {WebInputFieldProps} from "mmcore-ui";
import {DefaultInputFrame} from "./default-input-frame";
import {UICommonUtil, useFieldHelper} from "mfront-ui";
import {MixType} from "mmcore";
import {DefaultInput} from "./default-input";


export function DefaultInputField({name, className, label, labelNext, required, errorText, hintsText, isError, inputClassName, id, onChange, defaultValue, engine, type = "text", ...props}: WebInputFieldProps) {
    const {fieldRef, handleChange} = useFieldHelper<HTMLInputElement>({name, defaultValue, engine, onChange})
    const {gridItemProps, otherProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)
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
                return (
                    <DefaultInput
                        name={name}
                        id={labelKey}
                        type={type}
                        {...otherProps}
                        className={inputClassName}
                        ref={fieldRef}
                        onChange={handleChange}
                    />
                )
            }}
        />
    )
}