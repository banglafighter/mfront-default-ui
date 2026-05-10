import {WebSidebarContexProps, WebSidebarProviderProps} from "mmcore-ui";
import {mergeWind} from "../common/tailwind-utils";

import {
    mmReactCreateContext,
    MMReactCSSProperties,
    mmReactUseCallback,
    mmReactUseContext, mmReactUseEffect, mmReactUseMemo,
    mmReactUseState
} from "mmcore";
import {MFrontException} from "mfront-core";
import {useUIUtil} from "mfront-ui";

const SidebarContext = mmReactCreateContext<WebSidebarContexProps | null>(null)

export function useSidebarContext() {
    const context = mmReactUseContext(SidebarContext)
    if (!context) {
        throw new MFrontException("useSidebar must be used within a SidebarProvider.")
    }

    return context
}


export function DefaultSidebarProvider(
    {
        className,
        isOpen = true,
        cookieName = "sidebar-state",
        cookieMaxAge = 60 * 60 * 24 * 7,
        sidebarWidth = "16rem",
        sidebarWidthMobile = "18rem",
        sidebarIconWidth = "3rem",
        sidebarShortcutKey = "b",
        children,
        style,
        ...props
    }: WebSidebarProviderProps) {
    const {isMobile} = useUIUtil()
    const [mobileOpenState, setMobileOpenState] = mmReactUseState(false)

    const setOtherOpenState = mmReactUseCallback((state: boolean) => {
        // document.cookie = `${cookieName}=${openState}; path=/; max-age=${cookieMaxAge}`
    }, [])

    const toggleSidebar = mmReactUseCallback(() => {

    }, [])

    mmReactUseEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === sidebarShortcutKey && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                toggleSidebar()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    const contextValue = mmReactUseMemo<WebSidebarContexProps>(() => (
        {
            isMobile,
            toggleSidebar
        }
    ), [])

    return (
        <SidebarContext.Provider value={contextValue}>
            <div
                data-tag={"sidebar-provider"}
                style={
                    {
                        "--sidebar-width": sidebarWidth,
                        "--sidebar-width-icon": sidebarIconWidth,
                        ...style,
                    } as MMReactCSSProperties
                }
                className={mergeWind(
                    "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    )
}