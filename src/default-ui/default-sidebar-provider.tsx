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
        isOpen,
        defaultState = "expanded",
        stateStoreName = "sidebar-state",
        sidebarWidth = "16rem",
        sidebarWidthMobile = "18rem",
        sidebarIconWidth = "3rem",
        sidebarShortcutKey = "b",
        children,
        style,
        onOpenChange,
        ...props
    }: WebSidebarProviderProps) {
    const {isMobile} = useUIUtil()
    const [mobileOpenState, setMobileOpenState] = mmReactUseState<boolean>(false)

    // Check state already saved on memory
    const storedOpenState = localStorage.getItem(stateStoreName)
    let defaultOpenState = defaultState === "expanded"
    if (storedOpenState !== null) {
        defaultOpenState = storedOpenState === "true"
    }
    const [internalOpenState, setInternalOpenState] = mmReactUseState<boolean>(defaultOpenState)


    const currentOpenState = isOpen ?? internalOpenState
    const handleOtherOpenState = mmReactUseCallback((state: boolean) => {
        if (onOpenChange) {
            onOpenChange(state)
        }
        setInternalOpenState(state)
        localStorage.setItem(stateStoreName, `${state}`)
    }, [currentOpenState, internalOpenState])


    const toggleSidebar = mmReactUseCallback(() => {
        return isMobile ? setMobileOpenState((openState) => !openState) : handleOtherOpenState(!currentOpenState)
    }, [isOpen, currentOpenState, internalOpenState, setMobileOpenState])

    mmReactUseEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === sidebarShortcutKey && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                toggleSidebar()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar, sidebarShortcutKey])

    const stateName = currentOpenState ? "expanded" : "collapsed"
    const contextValue = mmReactUseMemo<WebSidebarContexProps>(() => (
        {
            isMobile,
            toggleSidebar,
            mobileOpenState,
            setMobileOpenState,
            stateName,
            currentOpenState,
            sidebarWidth,
            sidebarIconWidth,
            sidebarWidthMobile
        }
    ), [stateName, currentOpenState, isMobile, toggleSidebar, handleOtherOpenState, mobileOpenState, setMobileOpenState])

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