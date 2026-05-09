import {InputType, WebFieldGroupItemProps, WebFieldGroupProps} from "mmcore-ui";
import {mergeWind} from "mfront-default-ui";
import {MixType, MmReactFragment, UINode} from "mmcore";
import {DefaultInputFrame} from "./default-input-frame";
import {UICommonUtil, useFieldHelper} from "mfront-ui";
import {DefaultInput} from "./default-input";
import {DefaultTextarea} from "./default-textarea";
import {AddonAlign, SharedFieldGroup, SharedInputGroupAddon} from "../internal/shared-field-group";


function getItemText(content: UINode){
    return (
        <span className={mergeWind("flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4")}>
            {content}
        </span>
    )
}

function getItems(align: AddonAlign, items?: Array<WebFieldGroupItemProps>, className?: string) {
    if (!items) {
        return ""
    }
    return (
        <SharedInputGroupAddon align={align} className={className}>
            {items.map((item: WebFieldGroupItemProps, index: number) => {
                return (
                    <MmReactFragment key={index}>
                        {item.itemType === "text" ? getItemText(item.content) : item.content}
                    </MmReactFragment>
                )
            })}
        </SharedInputGroupAddon>
    )
}

export function DefaultFieldGroup({startOrTopItems, endOrBottomItems, name, className, label, labelNext, required, errorText, hintsText, isError, inputClassName, id, onChange, defaultValue, engine, startOrTopItemClassName, endOrButtonItemClassName, groupType = "text", type = "text", ...props}: WebFieldGroupProps) {
    const {fieldRef, handleChange} = useFieldHelper<HTMLInputElement>({name, defaultValue, engine, onChange})
    const {fieldRef : textareaRef, handleChange: textareaHandleChange} = useFieldHelper<HTMLTextAreaElement>({name, defaultValue, engine, onChange})
    const {gridItemProps, otherProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)

    const getInputField = (labelKey: string, type: InputType) => {
        return (
            <DefaultInput
                aria-invalid={isError}
                data-tag="field-group-input"
                name={name}
                id={labelKey}
                type={type}
                {...otherProps}
                className={mergeWind(inputClassName, "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent")}
                ref={fieldRef}
                onChange={handleChange}
            />
        )
    }

    const getTextareaField = (labelKey: string) => {
        return (
            <DefaultTextarea
                aria-invalid={isError}
                data-tag="field-group-input"
                name={name}
                id={labelKey}
                {...otherProps}
                className={mergeWind(inputClassName, "flex-1 resize-none rounded-none border-0 bg-transparent py-1 shadow-none focus-visible:ring-0 dark:bg-transparent")}
                ref={textareaRef}
                onChange={textareaHandleChange}
            />
        )
    }

    const getElement = (labelKey: string) => {
        let input: UINode = ""
        let startOrTopAlign: AddonAlign = "inline-start"
        let endOrButtonAlign: AddonAlign = "inline-end"
        if (groupType === "text") {
            input = getInputField(labelKey, type)
        } else if (groupType === "textarea") {
            input = getTextareaField(labelKey)
            startOrTopAlign = "block-start"
            endOrButtonAlign = "block-end"
        }
        return (
            <SharedFieldGroup>
                {input}
                {getItems(startOrTopAlign, startOrTopItems as Array<WebFieldGroupItemProps>, startOrTopItemClassName)}
                {getItems(endOrButtonAlign, endOrBottomItems as Array<WebFieldGroupItemProps>, endOrButtonItemClassName)}
            </SharedFieldGroup>
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
            element={(labelKey: string) => getElement(labelKey)}
        />
    )
}