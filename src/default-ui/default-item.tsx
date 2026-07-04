import {
    WebItemActionProps,
    WebItemBodyProps,
    WebItemMediaProps,
    WebItemProps,
    WebItemSubTitleProps,
    WebItemTitleProps
} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "./../common/tailwind-utils"
import {Slot} from "@radix-ui/react-slot";


export function DefaultItem({className, variant = "outline", size = "default", asChild = false, ...props}: WebItemProps & { asChild?: boolean }) {
    const DynamicComponent = asChild ? Slot : "div"
    return (
        <DynamicComponent
            data-tag="item"
            data-variant={variant}
            data-size={size}
            className={mergeWind(itemVariants({variant, size, className}))}
            {...props}
        />
    )
}

export function DefaultItemBody({className, ...props}: WebItemBodyProps) {
    return (
        <div
            data-tag="item-body"
            className={mergeWind(
                "flex flex-1 flex-col gap-0 [&+[data-tag=item-body]]:flex-none",
                className
            )}
            {...props}
        />
    )
}

export function DefaultItemTitle({className, ...props}: WebItemTitleProps) {
    return (
        <div
            data-tag="item-title"
            className={mergeWind(
                "flex w-fit items-center gap-1 text-sm leading-snug font-medium truncate",
                className
            )}
            {...props}
        />
    )
}

export function DefaultItemSubTitle({className, ...props}: WebItemSubTitleProps) {
    return (
        <div
            data-tag="item-subtitle"
            className={mergeWind(
                "line-clamp-2 text-xs leading-normal font-normal text-balance text-muted-foreground truncate",
                "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
                className
            )}
            {...props}
        />
    )
}

export function DefaultItemAction({className, ...props}: WebItemActionProps) {
    return (
        <div
            data-tag="item-actions"
            className={mergeWind("flex items-center gap-2", className)}
            {...props}
        />
    )
}

export function DefaultItemMedia({className, variant = "default", ...props}: WebItemMediaProps) {
    return (
        <div
            data-tag="item-media"
            data-variant={variant}
            className={mergeWind(itemMediaVariants({variant, className}))}
            {...props}
        />
    )
}

const itemVariants = makeClassVariance(
    "group/item flex flex-wrap items-center rounded-sm border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                outline: "border-border",
                muted: "bg-muted/50",
            },
            size: {
                sm: "gap-1 p-1",
                default: "gap-2 px-4 py-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const itemMediaVariants = makeClassVariance(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-tag=item-subtitle]]/item:translate-y-0.5 group-has-[[data-tag=item-subtitle]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)