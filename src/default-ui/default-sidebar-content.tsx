import {WebSidebarContentProps} from "mmcore-ui";
import {mergeWind} from "../common/tailwind-utils";


export function DefaultSidebarContent({className, ...props}: WebSidebarContentProps) {
    return (
        <main
            data-tag="sidebar-content"
            className={mergeWind(
                "relative flex w-full flex-1 flex-col bg-background",
                "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
                className
            )}
            {...props}
        />
    )
}