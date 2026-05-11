import {
    SidebarMenuItemBaseProps,
    SidebarMenuItemProps,
    SidebarMenuItemSize,
    SidebarMenuItemVariant,
    WebSidebarProps
} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "../common/tailwind-utils";
import {useSidebarContext} from "./default-sidebar-provider";
import {MmReactFragment, mmReactUseCallback, UIComponentProps, UINode} from "mmcore";
import {ChevronRight} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "../internal/colapsible";


export function DefaultSidebar({menu, header, headerAttrs, footer, footerAttrs, body, bodyAttrs, menuBefore, menuAfter, ...props}: WebSidebarProps) {

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
        return (
            <SidebarBodyBlock {...bodyAttrs}>
                {menuBefore}
                {getSidebarMenu(menu)}
                {menuAfter}
            </SidebarBodyBlock>
        )
    }, [body])

    return (
        <SidebarBlock {...props}>
            {headerContent()}
            {bodyContent()}
            {footerContent()}
        </SidebarBlock>
    )
}

export function getSidebarMenu(menu?: SidebarMenuItemProps[]) {
    return (
        <>
            {menu?.map((item: SidebarMenuItemProps, index: number) => {
                if (item.group) {
                    return (
                        <SidebarGroupBlock key={index}>
                            <SidebarGroupLabelBlock>{item.menuContent}</SidebarGroupLabelBlock>
                            {getMenuAndNestingMenu(item.group, index)}
                        </SidebarGroupBlock>
                    )
                }
                return getMenuAndNestingMenu([item], index)
            })}
        </>
    )
}

function getMenuAndNestingMenu(nested?: SidebarMenuItemProps[], keyIndex?: number) {

    const _getSubMenu = (submenu?: SidebarMenuItemBaseProps[], subIndex?: number) => {
        if (!submenu) {
            return ""
        }
        return (
            <SidebarMenuSubBlock key={"menu-subitem-" + subIndex}>
                {submenu?.map((item: SidebarMenuItemBaseProps, index: number) => {
                    return (
                        <SidebarMenuSubItemBlock key={index} {...item.menuContentAttrs}>
                            <SidebarMenuSubActionBlock size={item.size} isActive={false}>{item.menuContent}</SidebarMenuSubActionBlock>
                        </SidebarMenuSubItemBlock>
                    )
                })}
            </SidebarMenuSubBlock>
        )
    }

    const _getItemAction = (item: SidebarMenuItemProps, collapsible: boolean, index: number) => {
        let _itemNext: UINode = (
            <>
                {item.menuNext ? (
                    <SidebarMenuNextBlock showOnHover={item.menuNextShowOnHover} {...item.menuNextAttrs}>
                        {item.menuNext}
                    </SidebarMenuNextBlock>
                ) : ""}
            </>
        )

        let _collapsibleContent: UINode = ""
        if (collapsible) {
            _collapsibleContent = (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            )
        }

        return (
            <MmReactFragment key={`action-${index}`}>
                <SidebarMenuItemActionBlock variant={item.variant} size={item.size} isActive={false}>
                    {item.menuContent}
                    {_collapsibleContent}
                </SidebarMenuItemActionBlock>
                {_itemNext}
            </MmReactFragment>
        )
    }

    const _getMenuItem = (item: SidebarMenuItemProps, index: number, collapsible: boolean) => {
        return (
            <SidebarMenuItemBlock key={index} {...item.menuContentAttrs}>
                {collapsible ? <CollapsibleTrigger asChild>{_getItemAction(item, true, index)}</CollapsibleTrigger> : _getItemAction(item, false, index)}
                {collapsible ? <CollapsibleContent asChild>{_getSubMenu(item.nested, index)}</CollapsibleContent> : _getSubMenu(item.nested, index)}
            </SidebarMenuItemBlock>
        )
    }

    return (
        <SidebarMenuBlock key={`menu-${keyIndex}`}>
            {nested?.map((item: SidebarMenuItemProps, index: number) => {
                return (
                    <MmReactFragment key={`smb-${index}`}>
                        {item.collapsible ? (
                            <Collapsible asChild className="group/collapsible" >
                                {_getMenuItem(item, index, true)}
                            </Collapsible>
                        ) : _getMenuItem(item, index, false)}
                    </MmReactFragment>
                )
            })}
        </SidebarMenuBlock>
    )
}



function SidebarMenuNextBlock({ className, showOnHover = false, ...props }: UIComponentProps<"div"> & { showOnHover?: boolean }) {
  return (
    <div
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={mergeWind(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
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

function SidebarGroupLabelBlock({className, ...props}: UIComponentProps<"div">) {
    return (
        <div
            data-tag="sidebar-group-label"
            data-sidebar="group-label"
            className={mergeWind(
                "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
                className
            )}
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
      className={mergeWind("group/menu-item relative cursor-pointer", className)}
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

const sidebarMenuItemActionVariants = makeClassVariance(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                outline:
                    "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
            },
            size: {
                default: "h-8 text-sm",
                small: "h-7 text-xs",
                large: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function SidebarMenuItemActionBlock({ isActive = false, variant = "default", size = "default", className, ...props }: UIComponentProps<"div"> & { isActive?: boolean, variant?: SidebarMenuItemVariant, size?: SidebarMenuItemSize}) {
  return (
    <div
      data-tag="sidebar-menu-action"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={mergeWind(sidebarMenuItemActionVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function SidebarMenuSubActionBlock({ size = "default", isActive = false, className, ...props }: UIComponentProps<"div"> & { size?: "small" | "default" | "large", isActive?: boolean }) {
  return (
    <div
      data-tag="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={mergeWind(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "small" && "text-xs",
        size === "default" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}



