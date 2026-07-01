import {WebAccordionItemProps, WebAccordionProps} from "mmcore-ui";
import {mergeWind} from "./../common/tailwind-utils"
import {UIComponentProps} from "mmcore";

import {
    Accordion as AccordionPrimitive,
    AccordionItem as AccordionItemPrimitive,
    AccordionTrigger as AccordionTriggerPrimitive,
    AccordionContent as AccordionContentPrimitive,
    AccordionHeader as AccordionHeaderPrimitive,
} from "@radix-ui/react-accordion"
import {ChevronDownIcon} from "lucide-react";


export function DefaultAccordion({selectType, className, defaultAccordionId, items}: WebAccordionProps) {
    const otherProps: Record<string, any> = {}
    if (selectType === "single") {
        otherProps["collapsible"] = true
    }
    return (
        <Accordion className={className} type={selectType as any} defaultValue={defaultAccordionId} {...otherProps}>
            {items.map((item: WebAccordionItemProps, index: number) => {
                return (
                    <AccordionItem key={index} value={item.accordionId} className={item.itemClassName}>
                        <AccordionTrigger className={item.headerClassName}>{item.labelContent}</AccordionTrigger>
                        <AccordionContent className={item.componentClassName}>{item.component}</AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

function Accordion({ ...props }: UIComponentProps<typeof AccordionPrimitive>) {
  return <AccordionPrimitive data-tag="accordion" {...props} />
}

function AccordionItem({className, ...props}: UIComponentProps<typeof AccordionItemPrimitive>) {
    return (
        <AccordionItemPrimitive
            data-tag="accordion-item"
            className={mergeWind("border-b", className)}
            {...props}
        />
    )
}

function AccordionTrigger({ className, children, ...props }: UIComponentProps<typeof AccordionTriggerPrimitive>) {
  return (
    <AccordionHeaderPrimitive className="flex">
      <AccordionTriggerPrimitive
        data-tag="accordion-trigger"
        className={mergeWind(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none cursor-pointer focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  )
}

function AccordionContent({ className, children, ...props }: UIComponentProps<typeof AccordionContentPrimitive>) {
  return (
    <AccordionContentPrimitive
      data-tag="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={mergeWind("pt-0 pb-4", className)}>{children}</div>
    </AccordionContentPrimitive>
  )
}
