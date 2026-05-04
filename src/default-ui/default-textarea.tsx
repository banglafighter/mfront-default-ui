import {WebTextareaProps} from "mmcore-ui";
import {mergeWind} from "mfront-default-ui";


export function DefaultTextarea({className, ...props}: WebTextareaProps) {
    return (
        <textarea
            data-tag={"textarea"}
            className={mergeWind(
                "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-1.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-danger/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-danger/40",
                className
            )}
            {...props}
        />
    )
}