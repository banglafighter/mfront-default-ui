import {WebButtonProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "../common/tailwind-utils";

const buttonVariants = makeClassVariance(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground hover:bg-primary/90",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                info: "bg-info text-info-foreground hover:bg-info/90",
                danger: "bg-danger text-danger-foreground hover:bg-danger/90 focus-visible:ring-danger/20 dark:bg-danger/60 dark:focus-visible:ring-danger/40",
                warning: "bg-warning text-warning-foreground hover:bg-warning/90",
                success: "bg-success text-success-foreground hover:bg-success/90",
                outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
                iconXs: "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
                iconSm: "size-8",
                iconLg: "size-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export function DefaultButton({className, variant = "primary", size = "default", ...props}: WebButtonProps) {
    const ButtonTag = "button"
    return (
        <ButtonTag
            className={mergeWind(buttonVariants({variant, size, className}))}
            {...props}
        />
    )
}