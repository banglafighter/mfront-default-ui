import {WebSidebarProps} from "mmcore-ui";
import {mergeWind} from "../common/tailwind-utils";
import {useSidebarContext} from "./default-sidebar-provider";
import {mmReactUseCallback, UIComponentProps} from "mmcore";


export function DefaultSidebar({header, headerAttrs, footer, footerAttrs, body, bodyAttrs, ...props}: WebSidebarProps) {

    const headerContent = mmReactUseCallback(() => {
        if (!header) {
            return ""
        }
        return (
            <SidebarHeaderBlock {...headerAttrs}>
                {header}
            </SidebarHeaderBlock>
        )
    }, [header])

    const footerContent = mmReactUseCallback(() => {
        if (!footer) {
            return ""
        }
        return (
            <SidebarFooterBlock {...footerAttrs}>
                {footer}
            </SidebarFooterBlock>
        )
    }, [footer])

    const bodyContent = mmReactUseCallback(() => {
        if (body) {
            return (
                <SidebarBodyBlock {...bodyAttrs}>
                    {body}
                </SidebarBodyBlock>
            )
        }
    }, [body])

    return (
        <SidebarBlock {...props}>
            {headerContent()}
            {bodyContent()}
            {footerContent()}
        </SidebarBlock>
    )
}

function SidebarBodyBlock({ className, ...props }: UIComponentProps<"div">) {
  return (
    <div
      data-tag="sidebar-body"
      data-sidebar="content"
      className={mergeWind(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupBlock({ className, ...props }: UIComponentProps<"div">) {
  return (
    <div
      data-tag="sidebar-group"
      data-sidebar="group"
      className={mergeWind("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarMenuBlock({ className, ...props }: UIComponentProps<"ul">) {
  return (
    <ul
      data-tag="sidebar-menu"
      data-sidebar="menu"
      className={mergeWind("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItemBlock({ className, ...props }: UIComponentProps<"li">) {
  return (
    <li
      data-tag="sidebar-menu-item"
      data-sidebar="menu-item"
      className={mergeWind("group/menu-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubBlock({ className, ...props }: UIComponentProps<"ul">) {
  return (
    <ul
      data-tag="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={mergeWind(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItemBlock({className, ...props }: UIComponentProps<"li">) {
  return (
    <li
      data-tag="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={mergeWind("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarHeaderBlock({ className, ...props }: UIComponentProps<"div">) {
  return (
    <div
      data-tag="sidebar-header"
      data-sidebar="header"
      className={mergeWind("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooterBlock({ className, ...props }: UIComponentProps<"div">) {
  return (
    <div
      data-tag="sidebar-footer"
      data-sidebar="footer"
      className={mergeWind("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarBlock({className,  side = "left", variant = "sidebar", collapsible = "offcanvas", children, ...props}: WebSidebarProps) {
    const {isMobile, stateName} = useSidebarContext()
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
            data-state={stateName}
            data-collapsible={stateName === "collapsed" ? collapsible : ""}
            data-variant={variant}
            data-side={side}
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



