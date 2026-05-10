import {
  Collapsible as CollapsiblePrimitive,
  CollapsibleTrigger as CollapsibleTriggerPrimitive,
  CollapsibleContent as CollapsibleContentPrimitive
} from "@radix-ui/react-collapsible"
import {UIComponentProps} from "mmcore";
import {mergeWind} from "mfront-default-ui";
import "./assets/css/collapsible-animation.css"

function Collapsible({...props}: UIComponentProps<typeof CollapsiblePrimitive>) {
  return <CollapsiblePrimitive data-tag="collapsible" {...props} />
}

function CollapsibleTrigger({...props}: UIComponentProps<typeof CollapsibleTriggerPrimitive>) {
  return (
      <CollapsibleTriggerPrimitive
          data-tag="collapsible-trigger"
          {...props}
      />
  )
}

function CollapsibleContent({className, ...props}: UIComponentProps<typeof CollapsibleContentPrimitive>) {
  return (
      <CollapsibleContentPrimitive
          data-tag="collapsible-content"
          className={mergeWind(
              "overflow-hidden",
              "data-[state=open]:animate-[mw-collapsible-down_99ms_ease-out]",
              "data-[state=closed]:animate-[mw-collapsible-up_99ms_ease-out]",
              className
          )}
          {...props}
      />
  )
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
}