import {WebGridProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "../common/tailwind-utils";

const gridVariants = makeClassVariance(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all active:translate-y-px outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground hover:bg-primary/90",
            },
            size: {
                iconLg: "size-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export function DefaultGrid({className, variant = "primary", size = "default", ...props}: WebGridProps) {
    const GridTag = "div"
    return (
        <GridTag
            className={mergeWind(gridVariants({variant, size, className}))}
            {...props}
        />
    )
}