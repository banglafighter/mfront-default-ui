import {WebInputProps} from "mmcore-ui";
import {mergeWind} from "mfront-default-ui";


export function DefaultInput({type, className, ...props}: WebInputProps) {
    return (
        <input
            data-tag={"input"}
            type={type}
            className={mergeWind(
                "h-8 w-full min-w-0 rounded-md border border-input bg-transparent px-1.5 py-1.5 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
                "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
                "aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40",
                className
            )}
            {...props}
        />
    )
}