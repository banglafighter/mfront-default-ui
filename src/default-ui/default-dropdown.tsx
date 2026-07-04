import {DropdownItemProps, WebDropdownProps} from "mmcore-ui";
import {
    Content,
    Group,
    Label,
    Portal,
    DropdownMenu as RadixDropdownPrimitive,
    Separator,
    Trigger,
    SubContent,
    Sub, SubTrigger,
    Item
} from "@radix-ui/react-dropdown-menu"
import {MmReactFragment, mmReactUseCallback, UIComponentProps} from "mmcore";
import {mergeWind} from "mfront-default-ui";
import {ChevronRightIcon} from "lucide-react";


export function DefaultDropdown({className, trigger, items, size, position = "end", side, contentClassName, ...props}: WebDropdownProps) {

    const generateGroup = mmReactUseCallback((groupItem: DropdownItemProps, key: number) => {
        return (
            <MmReactFragment key={key}>
                <RadixDropdownGroup>
                    <RadixDropdownLabel>{groupItem.nameContent}</RadixDropdownLabel>
                    {groupItem.group && generateItem(groupItem.group)}
                </RadixDropdownGroup>
                {groupItem.separator && <RadixDropdownSeparator/>}
            </MmReactFragment>
        )
    }, [])

    const generateNestedItem = mmReactUseCallback((nestedItem: DropdownItemProps, key: number) => {
        return (
            <MmReactFragment key={key}>
                <RadixDropdownSub>
                    <RadixDropdownSubTrigger>{nestedItem.nameContent}</RadixDropdownSubTrigger>
                    <RadixDropdownPortal>
                        <RadixDropdownSubContent>
                            {nestedItem.nested && generateItem(nestedItem.nested)}
                        </RadixDropdownSubContent>
                    </RadixDropdownPortal>
                </RadixDropdownSub>
                {nestedItem.separator && <RadixDropdownSeparator/>}
            </MmReactFragment>
        )
    }, [])

    const getItem = mmReactUseCallback((item: DropdownItemProps, key: number) => {
        const itemProps: Record<string, any> = {}
        if (item.isHidden) {
            return null
        }

        if (item.action) {
            itemProps.onClick = () => item.action?.(item.actionData)
        }

        if (item.variant) {
            itemProps.variant = item.variant
        }

        return (
            <MmReactFragment key={key}>
                {item.separator && <RadixDropdownSeparator/>}
                <RadixDropdownItem {...itemProps}>
                    {item.nameContent}
                    {item.shortcut && <RadixDropdownShortcut>{item.shortcut}</RadixDropdownShortcut>}
                </RadixDropdownItem>
            </MmReactFragment>
        )
    }, [])

    const generateItem = mmReactUseCallback((itemList: Array<DropdownItemProps>) => (
        itemList.map((item: DropdownItemProps, index: number) => {
            if (item.group) {
                return generateGroup(item, index)
            }
            if (item.nested) {
                return generateNestedItem(item, index)
            }
            return getItem(item, index)
        })
    ), [])

    return (
        <RadixDropdown>
            <RadixDropdownTrigger asChild>
                {trigger}
            </RadixDropdownTrigger>
            {items.length > 0 && <RadixDropdownContent className={contentClassName} align={position} side={side}>{generateItem(items)}</RadixDropdownContent>}
        </RadixDropdown>
    )
}


function RadixDropdown({ ...props }: UIComponentProps<typeof RadixDropdownPrimitive>) {
  return <RadixDropdownPrimitive data-tag="dropdown-menu" {...props} />
}

function RadixDropdownItem({ className, inset, variant = "default", ...props }: UIComponentProps<typeof Item> & {inset?: boolean, variant?: "default" | "destructive" }) {
  return (
      <Item
          data-tag="dropdown-menu-item"
          data-inset={inset}
          data-variant={variant}
          className={mergeWind(
              "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
              "cursor-pointer",
              className
          )}
          {...props}
      />
  )
}

function RadixDropdownShortcut({className, ...props }: UIComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={mergeWind(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}


function RadixDropdownTrigger({...props }: UIComponentProps<typeof Trigger>) {
  return (
    <Trigger
      data-tag="dropdown-menu-trigger"
      {...props}
    />
  )
}

function RadixDropdownContent({ className, sideOffset = 4, side, ...props }: UIComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        data-tag="dropdown-menu-content"
        sideOffset={sideOffset}
        side={side}
        className={mergeWind(
          "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </Portal>
  )
}

function RadixDropdownGroup({...props}: UIComponentProps<typeof Group>) {
    return (
        <Group data-tag="dropdown-menu-group" {...props} />
    )
}

function RadixDropdownLabel({className, inset, ...props}: UIComponentProps<typeof Label> & { inset?: boolean }) {
    return (
        <Label
            data-tag="dropdown-menu-label"
            data-inset={inset}
            className={mergeWind(
                "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
                className
            )}
            {...props}
        />
    )
}

function RadixDropdownSeparator({className, ...props}: UIComponentProps<typeof Separator>) {
    return (
        <Separator
            data-slot="dropdown-menu-separator"
            className={mergeWind("-mx-1 my-1 h-px bg-border", className)}
            {...props}
        />
    )
}

function RadixDropdownSub({...props}: UIComponentProps<typeof Sub>) {
    return <Sub data-slot="dropdown-menu-sub" {...props} />
}

function RadixDropdownSubTrigger({ className, inset, children, ...props }: UIComponentProps<typeof SubTrigger> & { inset?: boolean }) {
  return (
    <SubTrigger
      data-tag="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={mergeWind(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </SubTrigger>
  )
}

function RadixDropdownPortal({ ...props }: UIComponentProps<typeof Portal>) {
  return (
    <Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function RadixDropdownSubContent({className, ...props}: UIComponentProps<typeof SubContent>) {
    return (
        <SubContent
            data-slot="dropdown-menu-sub-content"
            className={mergeWind(
                "z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                className
            )}
            {...props}
        />
    )
}