import {WebDropdownProps} from "mmcore-ui";
import { DropdownMenu as RadixDropdownPrimitive } from "@radix-ui/react-dropdown-menu"
import {UIComponentProps} from "mmcore";


export function DefaultDropdown({className, ...props}: WebDropdownProps) {
    return (
        <></>
    )
}


function RadixDropdown({ ...props }: UIComponentProps<typeof RadixDropdownPrimitive>) {
  return <RadixDropdownPrimitive data-tag="dropdown-menu" {...props} />
}