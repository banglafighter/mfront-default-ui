import {WebPopoverProps} from "mmcore-ui";
import {mergeWind} from "./../common/tailwind-utils"
import { 
    Popover as PopoverPrimitive,
    Trigger as PopoverTriggerPrimitive,
    Content as PopoverContentPrimitive,
    Portal as PopoverPortalPrimitive,
} from "@radix-ui/react-popover"
import {mmReactUseCallback, UIComponentProps, UINode} from "mmcore";


export function DefaultPopover({className, trigger, body, title, subTitle, position = "center", ...props}: WebPopoverProps) {

    const getHeader = mmReactUseCallback(() => {
        let isEmpty: boolean = true
        let titleContent: UINode = null
        let subTitleContent: UINode = null

        if (title) {
            isEmpty = false
            titleContent = (<PopoverTitle>{title}</PopoverTitle>)
        }
        if (subTitle) {
            isEmpty = false
            subTitleContent = (<PopoverSubTitle>{subTitle}</PopoverSubTitle>)
        }

        if (!isEmpty) {
            return (
                <PopoverHeader>
                    {titleContent}
                    {subTitleContent}
                </PopoverHeader>
            )
        }
        return null
    }, [])

    return (
        <Popover>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent align={position} {...props}>
                {getHeader()}
                {body}
            </PopoverContent>
        </Popover>
    )
}

function Popover({...props}: UIComponentProps<typeof PopoverPrimitive>) {
    return <PopoverPrimitive data-tag="popover" {...props} />
}

function PopoverTrigger({...props}: UIComponentProps<typeof PopoverTriggerPrimitive>) {
    return <PopoverTriggerPrimitive data-tag="popover-trigger" {...props} />
}

function PopoverContent({ className, align = "center", sideOffset = 4, ...props }: UIComponentProps<typeof PopoverContentPrimitive>) {
  return (
    <PopoverPortalPrimitive>
      <PopoverContentPrimitive
        data-tag="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={mergeWind(
          "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </PopoverPortalPrimitive>
  )
}

function PopoverHeader({ className, ...props }: UIComponentProps<"div">) {
  return (
    <div
      data-tag="popover-header"
      className={mergeWind("flex flex-col text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: UIComponentProps<"h2">) {
  return (
    <div
      data-tag="popover-title"
      className={mergeWind("font-medium", className)}
      {...props}
    />
  )
}

function PopoverSubTitle({ className, ...props }: UIComponentProps<"p">) {
  return (
    <p
      data-tag="popover-description"
      className={mergeWind("text-muted-foreground", className)}
      {...props}
    />
  )
}