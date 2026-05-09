import {WebSelectFieldProps} from "mmcore-ui";
import {MixType, mmReactUseCallback, mmReactUseMemo, mmReactUseState} from "mmcore";
import { Combobox as BasicUICombobox } from "@base-ui/react"
import {SharedFieldGroup, SharedInputGroupAddon} from "../internal/shared-field-group";
import {mergeWind} from "mfront-default-ui";
import {DefaultButton} from "./default-button";
import {DefaultInput} from "./default-input";
import {CheckIcon, ChevronDownIcon, XIcon} from "lucide-react";
import styles from "./assets/css/default-select-field.module.css"

const ComboboxPrimitive = BasicUICombobox.Root


function ComboboxTrigger({
  className,
  children,
  ...props
}: BasicUICombobox.Trigger.Props) {
  return (
    <BasicUICombobox.Trigger
      data-slot="combobox-trigger"
      className={mergeWind("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        className="pointer-events-none size-4 text-muted-foreground"
      />
    </BasicUICombobox.Trigger>
  )
}

function ComboboxClear({ className, ...props }: BasicUICombobox.Clear.Props) {
  return (
    <BasicUICombobox.Clear
      data-slot="combobox-clear"
      render={<DefaultButton variant="ghost" size="iconXs" className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent" />}
      className={className}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </BasicUICombobox.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: BasicUICombobox.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <SharedFieldGroup className={mergeWind("w-auto", className)}>
      <BasicUICombobox.Input
        render={<DefaultInput disabled={disabled} type={"text"} name={"input"} className={mergeWind( "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent")}/>}
        {...props}
      />
      <SharedInputGroupAddon align="inline-end">
        {showTrigger && (
          <DefaultButton
            size="iconSm"
            variant="ghost"
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </DefaultButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </SharedInputGroupAddon>
      {children}
    </SharedFieldGroup>
  )
}

function ComboboxChips({
  className,
  ...props
}: BasicUICombobox.Chips.Props) {
  return (
    <BasicUICombobox.Chips
      data-slot="combobox-chips"
      className={mergeWind(
        "flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1.5 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: BasicUICombobox.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <BasicUICombobox.Chip
      data-slot="combobox-chip"
      className={mergeWind(
        "flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <BasicUICombobox.ChipRemove
          render={<DefaultButton variant="ghost" size="iconXs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </BasicUICombobox.ChipRemove>
      )}
    </BasicUICombobox.Chip>
  )
}

function ComboboxChipsInput({
  className,
  children,
  ...props
}: BasicUICombobox.Input.Props) {
    return (
        <BasicUICombobox.Input
            data-slot="combobox-chip-input"
            className={mergeWind("min-w-16 flex-1 outline-none", className)}
            {...props}
        />
    )
}

function ComboboxValue({ ...props }: BasicUICombobox.Value.Props) {
  return <BasicUICombobox.Value data-slot="combobox-value" {...props} />
}

function ComboboxStatus({className, ...props}: BasicUICombobox.Status.Props) {
    return (
        <BasicUICombobox.Status
            data-slot="combobox-status"
            className={mergeWind(
                "hidden w-full justify-center items-center gap-1 al py-2 text-muted-foreground flex",
                className
            )}
            {...props}
        />
    )
}

function ComboboxEmpty({className, type = "message", ...props}: {type?: "message" | "action" } & BasicUICombobox.Empty.Props) {
  let typeClassName: string = "text-sm text-muted-foreground"
  if (type === "action") {
    typeClassName = "text-sm cursor-default"
  }
  return (
      <BasicUICombobox.Empty
          data-slot="combobox-empty"
          className={mergeWind(
              "hidden w-full justify-center py-2 text-center group-data-empty/combobox-content:flex",
              className,
              typeClassName
          )}
          {...props}
      />
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: BasicUICombobox.Popup.Props &
  Pick<
    BasicUICombobox.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <BasicUICombobox.Portal>
      <BasicUICombobox.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <BasicUICombobox.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={mergeWind("group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </BasicUICombobox.Positioner>
    </BasicUICombobox.Portal>
  )
}

function ComboboxList({ className, ...props }: BasicUICombobox.List.Props) {
  return (
    <BasicUICombobox.List
      data-slot="combobox-list"
      className={mergeWind(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: BasicUICombobox.Item.Props) {
  return (
    <BasicUICombobox.Item
      data-slot="combobox-item"
      className={mergeWind(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <BasicUICombobox.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </BasicUICombobox.ItemIndicator>
    </BasicUICombobox.Item>
  )
}



export function DefaultSelectField({options, labelKey, valueKey, multiple, customOption, defaultValue, createNewItem, loadNewItem, placeholder, emptyOptionContent = "List is empty", ...props}: WebSelectFieldProps) {
    const [value, setValue] = mmReactUseState<Record<string, MixType>[]>([])
    const [dynamicOptions, setDynamicOptions] = mmReactUseState<Record<string, MixType>[]>([])
    const [showEmptyOption, setShowEmptyOption] = mmReactUseState<boolean>(true)
    const [isLoading, setLoading] = mmReactUseState<boolean>(false)
    const [searchText, setSearchText] = mmReactUseState('')


    const mergedItems = mmReactUseMemo(() => {
        const map = new Map();
        [...dynamicOptions, ...options].forEach(item => {
            map.set(item[valueKey], item);
        });
        return Array.from(map.values());
    }, [dynamicOptions, options, valueKey]);

    const selectedItemSet = mmReactUseMemo(() => {
        return new Set((Array.isArray(value) ? value : []).map(v => v[valueKey]));
    }, [value, valueKey]);

    const getSingleInput = () => {
        return (<ComboboxInput placeholder={placeholder} showClear={true}/>)
    }

    const getMultiInput = () => {
        return (
            <ComboboxChips>
                <ComboboxValue>
                    {value.map((item: any, index: number) => (
                        <ComboboxChip key={item[valueKey]}>{item[labelKey]}</ComboboxChip>
                    ))}
                </ComboboxValue>
                <ComboboxChipsInput placeholder={placeholder}/>
            </ComboboxChips>
        )
    }
    const onValueChange = mmReactUseCallback((selectedValue: any) => {
        if (Array.isArray(selectedValue)) {
            setValue(selectedValue);
        } else {
            let value: any = []
            if (selectedValue !== null && selectedValue !== undefined) {
                value.push(selectedValue)
            }
            setValue(value);
        }
    }, []);

    const ignoreItemIfSelected = mmReactUseCallback((item: any) => {
        return selectedItemSet.has(item[valueKey]);
    }, [selectedItemSet, valueKey]);

    let conditionalProps: any = {}
    if (multiple) {
        conditionalProps["value"] = value
    }

    const onInputValueChange = mmReactUseCallback((searchValue: string, event: any) => {
        const trimmed = searchValue.trim();
        setSearchText(trimmed);
        if (loadNewItem && !isLoading) {
            let refinedSearchText: string = trimmed.toLowerCase();
            let willCall: boolean = !mergedItems.some((item: any) => (String(item?.[labelKey]).toLowerCase().includes(refinedSearchText)));
            if (!willCall) {
                return
            }
            loadNewItem((isLoading: boolean) => {
                setLoading(isLoading);
            }, (newOptions: Array<any>) => {
                setDynamicOptions(prev => [
                    ...prev,
                    ...newOptions
                ]);
                setLoading(false)
            })
        }
        setShowEmptyOption(true);
    }, [isLoading]);

    const getEmptyContent = mmReactUseCallback(() => {
        if (!showEmptyOption || isLoading) {
            return ""
        }
        let emptyContent: any = emptyOptionContent
        let emptyType: any = "message"
        if (createNewItem) {
            emptyType = "action"
            emptyContent = (
                <div className={"w-full"} onClick={() => {
                    setShowEmptyOption(false);
                    createNewItem(searchText, (newOptions: Array<any>) => {
                        setDynamicOptions(prev => [
                            ...prev,
                            ...newOptions
                        ]);
                    })
                }}>{emptyOptionContent}</div>
            )
        }
        return (<ComboboxEmpty type={emptyType}>{emptyContent}</ComboboxEmpty>)
    }, [isLoading])

    const getStatus = () => {
        let content: any = null
        if (isLoading) {
            content = (
                <>
                    <span className={styles.spinner}/>
                    Searching…
                </>
            )
        }
        if (!content) {
            return ""
        }
        return (
            <ComboboxStatus>{content}</ComboboxStatus>
        )
    }

    return (
        <ComboboxPrimitive
            items={mergedItems}
            onValueChange={onValueChange}
            onInputValueChange={onInputValueChange}
            {...conditionalProps}
            multiple={multiple}
            defaultValue={defaultValue}
            onOpenChangeComplete={(open: boolean) => {
                setShowEmptyOption(true)
            }}
        >
            {multiple ? getMultiInput() : getSingleInput()}
            <ComboboxContent>
                {getEmptyContent()}
                {getStatus()}
                <ComboboxList>
                    {(item: any, index: any) => {
                        if (multiple && ignoreItemIfSelected(item)) {
                            return null
                        }
                        return (
                            <ComboboxItem key={index} value={item}>
                                {customOption ? customOption(item, labelKey, valueKey, options) : item[labelKey]}
                            </ComboboxItem>
                        )
                    }}
                </ComboboxList>
            </ComboboxContent>
        </ComboboxPrimitive>
    )
}