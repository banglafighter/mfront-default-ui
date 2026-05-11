import {WebSidebarTogglerProps} from "mmcore-ui";
import {mergeWind} from "../common/tailwind-utils";
import {useSidebarContext} from "./default-sidebar-provider";
import {DefaultButton} from "./default-button";
import {PanelLeftIcon} from "lucide-react";


export function DefaultSidebarToggler({className, iconContent, onClick}: WebSidebarTogglerProps) {
    const {toggleSidebar} = useSidebarContext()
    return (
        <DefaultButton
            data-sidebar="trigger"
            data-tag="sidebar-trigger"
            variant="ghost"
            size="icon"
            className={mergeWind("size-7", className)}
            onClick={(event) => {
                onClick?.()
                toggleSidebar()
            }}
        >
            {iconContent ?? <PanelLeftIcon/>}
            <span className="sr-only">Toggle Sidebar</span>
        </DefaultButton>
    )
}