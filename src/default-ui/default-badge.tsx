import {WebBadgeProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "./../common/tailwind-utils"
import {Slot} from "@radix-ui/react-slot";

const badgeVariants = makeClassVariance(
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 [&>svg]:pointer-events-none [&>svg]:size-3",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                info: "bg-info text-info-foreground [a&]:hover:bg-info/90",
                warning: "bg-warning text-warning-foreground [a&]:hover:bg-warning/90",
                success: "bg-success text-success-foreground [a&]:hover:bg-success/90",
                danger: "bg-danger text-white focus-visible:ring-danger/20 dark:bg-danger/60 dark:focus-visible:ring-danger/40 [a&]:hover:bg-danger/90",
                outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                link: "text-primary underline-offset-4 [a&]:hover:underline",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
)


export function DefaultBadge({className, variant = "primary", asChild = false, ...props}: WebBadgeProps) {
    const Component = asChild ? Slot : "span"
    return (
        <Component
            data-tag="badge"
            data-variant={variant}
            className={mergeWind(badgeVariants({variant}), className)}
            {...props}
        />
    )
}