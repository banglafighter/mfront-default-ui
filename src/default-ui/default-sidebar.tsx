import {WebSidebarProps} from "mmcore-ui";
import {mergeWind} from "../common/tailwind-utils";
import {useSidebarContext} from "./default-sidebar-provider";


export function DefaultSidebar({...props}: WebSidebarProps) {
    return (
        <Sidebar {...props}>

        </Sidebar>
    )
}

function Sidebar({className,  side = "left", variant = "sidebar", collapsible = "offcanvas", children, ...props}: WebSidebarProps) {
    const {isMobile} = useSidebarContext()

    if (collapsible === "none") {
        return (
            <div
                data-tag="sidebar"
                className={mergeWind(
                    "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }

    if (isMobile) {
        // load dialog box with left sheet
    }

    return (
        <div
            data-tag="sidebar"
            className={mergeWind(
                "group peer hidden text-sidebar-foreground md:block",
                className
            )}
        >
            <div
                data-tag="sidebar-gap"
                className={mergeWind(
                    "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                    "group-data-[collapsible=offcanvas]:w-0",
                    "group-data-[side=right]:rotate-180",
                    variant === "floating" || variant === "inset"
                        ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
                )}
            />
            <div
                data-tag="sidebar-container"
                className={mergeWind(
                    "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                    side === "left"
                        ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                        : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                    // Adjust the padding for floating and inset variants.
                    variant === "floating" || variant === "inset"
                        ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                    className
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    data-tag="sidebar-inner"
                    className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
                >
                    {children}
                </div>
            </div>
        </div>
    )
}



