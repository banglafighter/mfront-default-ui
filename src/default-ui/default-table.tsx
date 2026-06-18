import {
    WebTableProps,
    WebTBodyProps,
    WebTDProps,
    WebTFootProps, WebTHeadProps,
    WebTHProps,
    WebTRProps
} from "mmcore-ui";
import {mergeWind} from "mfront-default-ui";
import {UINode} from "mmcore";


export function DefaultTable({className, wrapperClassName, containerContent = null, ...props}: WebTableProps & { containerContent?: UINode | null}) {
    return (
        <div
            data-tag="table-container"
            className={wrapperClassName ? wrapperClassName : "relative w-full overflow-x-auto"}
        >
            <table
                data-tag="table"
                className={mergeWind("w-full caption-bottom text-sm", className)}
                {...props}
            />
            {containerContent}
        </div>
    )
}

export function DefaultTHead({className, ...props}: WebTHeadProps) {
    return (
        <thead
            data-tag="table-header"
            className={mergeWind("[&_tr]:border-b", "bg-muted", className)}
            {...props}
        />
    )
}

export function DefaultTFoot({className, ...props}: WebTFootProps) {
    return (
        <tfoot
            data-tag="table-footer"
            className={mergeWind(
                "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
                className
            )}
            {...props}
        />
    )
}

export function DefaultTBody({className, ...props}: WebTBodyProps) {
    return (
        <tbody
            data-tag="table-body"
            className={mergeWind("[&_tr:last-child]:border-0", className)}
            {...props}
        />
    )
}

export function DefaultTR({className, ...props}: WebTRProps) {
      return (
    <tr
      data-tag="table-row"
      className={mergeWind(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

export function DefaultTH({className, ...props}: WebTHProps) {
   return (
    <th
      data-tag="table-head"
      className={mergeWind(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

export function DefaultTD({className, ...props}: WebTDProps) {
    return (
        <td
            data-tag="table-data"
            className={mergeWind(
                "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                className
            )}
            {...props}
        />
    )
}