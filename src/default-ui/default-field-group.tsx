import {InputType, WebFieldGroupItemProps, WebFieldGroupProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "mfront-default-ui";
import {MixType, MmReactFragment, UIComponentProps, UINode} from "mmcore";
import {DefaultInputFrame} from "./default-input-frame";
import {UICommonUtil, useFieldHelper} from "mfront-ui";
import {DefaultInput} from "./default-input";
import {DefaultTextarea} from "./default-textarea";

const inputGroupAddonVariants = makeClassVariance(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start": "order-first w-full justify-start px-1.5 pt-1 group-has-[>input]/input-group:pt-1 [.border-b]:pb-1",
        "block-end": "order-last w-full justify-start px-1.5 pb-1 group-has-[>input]/input-group:pb-1 [.border-t]:pt-1",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)


function FieldGroup({className, ...props}: UIComponentProps<"div">) {
    return (
        <div
            data-tag="field-group"
            role="group"
            className={mergeWind(
                "group/field-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30",
                "h-8 min-w-0 has-[>textarea]:h-auto",

                // Variants based on alignment.
                "has-[>[data-align=inline-start]]:[&>input]:pl-1",
                "has-[>[data-align=inline-end]]:[&>input]:pr-1",
                "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-1",
                "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-1",

                // Focus state.
                "has-[[data-tag=field-group-input]:focus-visible]:border-ring has-[[data-tag=field-group-input]:focus-visible]:ring-[1px] has-[[data-tag=field-group-input]:focus-visible]:ring-ring/50",

                // Error state.
                "has-[[data-tag][aria-invalid=true]]:border-danger has-[[data-tag][aria-invalid=true]]:ring-danger/20 dark:has-[[data-tag][aria-invalid=true]]:ring-danger/40",
                className
            )}
            {...props}
        />
    )
}

type AddonAlign = "block-start" | "block-end" | "inline-end" | "inline-start"
function InputGroupAddon({className, align = "inline-start", children}: { align ?: AddonAlign } & UIComponentProps<"div">) {
    return (
        <div
            data-align={align}
            data-tag="field-group-adon"
            className={mergeWind(inputGroupAddonVariants({align}), className)}
        >
            {children}
        </div>
    )
}

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
        <InputGroupAddon align={align} className={className}>
            {items.map((item: WebFieldGroupItemProps, index: number) => {
                return (
                    <MmReactFragment key={index}>
                        {item.itemType === "text" ? getItemText(item.content) : item.content}
                    </MmReactFragment>
                )
            })}
        </InputGroupAddon>
    )
}

export function DefaultFieldGroup({groupType, startOrTopItems, endOrButtonItems, name, className, label, labelNext, required, errorText, hintsText, isError, inputClassName, id, onChange, defaultValue, engine, type = "text", startOrTopItemClassName, endOrButtonItemClassName, ...props}: WebFieldGroupProps) {
    const {fieldRef, handleChange} = useFieldHelper<HTMLInputElement>({name, defaultValue, engine, onChange})
    const {fieldRef : textareaRef, handleChange: textareaHandleChange} = useFieldHelper<HTMLTextAreaElement>({name, defaultValue, engine, onChange})
    const {gridItemProps, otherProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)

    const getInputField = (labelKey: string, type: InputType) => {
        return (
            <DefaultInput
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
            <FieldGroup>
                {input}
                {getItems(startOrTopAlign, startOrTopItems as Array<WebFieldGroupItemProps>, startOrTopItemClassName)}
                {getItems(endOrButtonAlign, endOrButtonItems as Array<WebFieldGroupItemProps>, endOrButtonItemClassName)}
            </FieldGroup>
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