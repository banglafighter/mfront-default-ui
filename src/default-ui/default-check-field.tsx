import {FieldValueType, WebCheckFieldProps} from "mmcore-ui";
import {DefaultInputFrame} from "./default-input-frame";
import {setInputElementVirtualRef, UICommonUtil, useFieldHelper} from "mfront-ui";
import {MixType, MMReactChangeEvent, UIComponentProps} from "mmcore";
import {
    Checkbox as CheckboxPrimitive,
    Indicator as CheckboxIndicatorPrimitive
} from "@radix-ui/react-checkbox";
import {
    Switch as SwitchPrimitive,
    Thumb as SwitchThumbPrimitive,
} from "@radix-ui/react-switch";
import {mergeWind} from "./../common/tailwind-utils";
import {CheckIcon} from "lucide-react";
import {useState} from "mfront";


export function DefaultCheckField(
    {
        type = "checkbox",
        name,
        className,
        multiple,
        label,
        labelNext,
        required,
        errorText,
        hintsText,
        isError,
        id,
        engine,
        onChange,
        defaultValue,
        ...props
    }: WebCheckFieldProps) {
    const {fieldRef, setFieldValue} = useFieldHelper<HTMLInputElement>({name, defaultValue, engine, onChange})
    const {gridItemProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)
    const [inputValue, setInputValue] = useState<FieldValueType>()

    setInputElementVirtualRef(fieldRef, {
        setValue: (value: string) => (setInputValue(value))
    })

    const handleFieldChange = (checked: boolean) => {
        const event = {
            target: {
                name,
                type: "checkbox",
                checked,
            },
            currentTarget: {
                name,
                type: "checkbox",
                checked,
            },
        } as unknown as MMReactChangeEvent<HTMLInputElement>;
        setFieldValue(name, checked, event)
    }

    const isDefaultChecked = (): boolean => {
        return inputValue !== undefined && inputValue === "true";
    }

    return (
        <DefaultInputFrame
            label={label}
            labelNext={labelNext}
            required={required}
            errorText={errorText}
            hintsText={hintsText}
            isError={isError}
            className={mergeWind("self-center", className)}
            orientation={"horizontal"}
            isChildFirst={true}
            id={id}
            {...gridItemProps}
            element={(labelId: string) => {
                if (type === "switch") {
                    return (
                        <Switch
                            key={`${isDefaultChecked()}`}
                            id={labelId}
                            name={name}
                            aria-invalid={isError}
                            onCheckedChange={handleFieldChange}
                            defaultChecked={isDefaultChecked()}
                        />
                    )
                } else {
                    return (
                        <Checkbox
                            key={`${isDefaultChecked()}`}
                            id={labelId}
                            name={name}
                            aria-invalid={isError}
                            onCheckedChange={handleFieldChange}
                            defaultChecked={isDefaultChecked()}
                        />
                    )
                }
            }}/>
    )
}

function Checkbox({ className, ...props }: UIComponentProps<typeof CheckboxPrimitive>) {
  return (
    <CheckboxPrimitive
      data-tag="checkbox"
      className={mergeWind(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-danger/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-danger/40 dark:data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxIndicatorPrimitive
        data-tag="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxIndicatorPrimitive>
    </CheckboxPrimitive>
  )
}

function Switch({ className, size = "default", ...props }: UIComponentProps<typeof SwitchPrimitive> & { size?: "sm" | "default" }) {
  return (
    <SwitchPrimitive
      data-tag="switch"
      data-size={size}
      className={mergeWind(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className
      )}
      {...props}
    >
      <SwitchThumbPrimitive
        data-tag="switch-thumb"
        className={mergeWind(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
        )}
      />
    </SwitchPrimitive>
  )
}