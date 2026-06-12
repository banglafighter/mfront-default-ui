import {
    WebCardActionProps,
    WebCardBodyProps, WebCardFooterProps, WebCardHeaderProps, WebCardProps,
    WebCardSubTitleProps,
    WebCardTitleProps
} from "mmcore-ui";
import {mergeWind} from "../common/tailwind-utils";


export function DefaultCard({className, ...props}: WebCardProps) {
    return (
        <div
            className={mergeWind(
                "flex flex-col gap-1 rounded-sm border bg-card py-6 text-card-foreground shadow-sm",
                className)}
            {...props}
        />
    )
}

export function DefaultCardHeader({className, ...props}: WebCardHeaderProps) {
    return (
        <div
            className={mergeWind(
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
                className)}
            {...props}
        />
    )
}

export function DefaultCardFooter({className, ...props}: WebCardFooterProps) {
    return (
        <div
            className={mergeWind(
                "flex items-center px-6 [.border-t]:pt-6",
                className)}
            {...props}
        />
    )
}

export function DefaultCardBody({className, ...props}: WebCardBodyProps) {
    return (
        <div
            className={mergeWind(
                "px-6",
                className)}
            {...props}
        />
    )
}

export function DefaultCardTitle({className, ...props}: WebCardTitleProps) {
    return (
        <div
            className={mergeWind(
                "leading-none font-semibold",
                className)}
            {...props}
        />
    )
}

export function DefaultCardSubTitle({className, ...props}: WebCardSubTitleProps) {
    return (
        <div
            className={mergeWind(
                "text-sm text-muted-foreground",
                className)}
            {...props}
        />
    )
}

export function DefaultCardAction({className, ...props}: WebCardActionProps) {
    return (
        <div
            className={mergeWind(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className)}
            {...props}
        />
    )
}