import {MixType, UIComponentProps} from "mmcore";
import {makeClassVariance, mergeWind} from "mfront-default-ui";
import {buttonClassAndVariants, DefaultButton} from "../default-ui/default-button";
import {DefaultInput} from "../default-ui/default-input";
import {WebInputProps} from "mmcore-ui";

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


export function SharedFieldGroup({className, ...props}: UIComponentProps<"div">) {
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


export type AddonAlign = "block-start" | "block-end" | "inline-end" | "inline-start"
export function SharedInputGroupAddon({className, align = "inline-start", children}: { align ?: AddonAlign } & UIComponentProps<"div">) {
    return (
        <div
            data-align={align}
            data-tag="field-group-adon"
            className={mergeWind(inputGroupAddonVariants({align}), className)}
            onClick={(e) => {
                if ((e.target as HTMLElement).closest("button")) {
                    return
                }
                e.currentTarget.parentElement?.querySelector("input")?.focus()
            }}
        >
            {children}
        </div>
    )
}

const sharedFieldGroupButtonVariants = makeClassVariance(
    "flex items-center gap-2 text-sm shadow-none",
    {
        variants: {
            size: {
                xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
                sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
                iconXs: "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
                iconSm: "size-8 p-0 has-[>svg]:p-0",
            },
        },
        defaultVariants: {
            size: "xs",
        },
    }
)

type FieldGroupButtonType = "xs" | "sm" | "iconXs" | "iconSm"
type FieldGroupButtonTag = "button" | "a" | "div" | "span"

export function SharedFieldGroupButton(
    {
        className,
        type = "button",
        variant = "ghost",
        size = "xs",
        tagName = "button",
        disabled,
        ...props
    }: Omit<UIComponentProps<typeof DefaultButton>, "size"> & { size?: FieldGroupButtonType, tagName?: FieldGroupButtonTag }) {
    const TagName = tagName
    const conditionalProps: Record<string, unknown> = {
        ...props
    }

    if (disabled !== undefined){
        conditionalProps.disabled = disabled
    }

    if (tagName === "button") {
        conditionalProps.type = type
    }
    return (
        <TagName
            {...conditionalProps}
            data-size={size}
            className={mergeWind(
                sharedFieldGroupButtonVariants({size}),
                buttonClassAndVariants({variant}),
                className
            )}
        />
    )
}


export function SharedFieldGroupInput({className, ...props}: WebInputProps) {
    return (
        <DefaultInput
            data-slot="input-group-control"
            className={mergeWind(
                "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
                className
            )}
            {...props}
        />
    )
}