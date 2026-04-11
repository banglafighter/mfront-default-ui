import {WebSeperatorProps} from "mmcore-ui";
import {mergeWind} from "../common/tailwind-utils";
import { Separator as SeparatorPrimitive } from "@radix-ui/react-separator"


export function DefaultSeparator({className, orientation = "horizontal", ...props}: WebSeperatorProps) {
    return (
        <SeparatorPrimitive
            decorative={true}
            orientation={orientation}
            className={mergeWind("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className)}
            {...props}
        />
    )
}