import {WebInputFieldProps} from "mmcore-ui";
import {DefaultInputFrame} from "./default-input-frame";
import {Input, UICommonUtil} from "mfront-ui";
import {MixType} from "mmcore";


export function DefaultInputField({name, className, label, labelNext, required, errorText, hintsText, isError, inputClassName, id, type = "text", ...props}: WebInputFieldProps) {
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
                    <Input name={name} id={labelKey} type={type} {...otherProps} className={inputClassName}/>
                )
            }}
        />
    )
}