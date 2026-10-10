import {FieldValueType, WebRadioButtonFieldProps} from "mmcore-ui";
import {MixType, MMReactChangeEvent} from "mmcore";
import {setInputElementVirtualRef, UICommonUtil, useFieldHelper} from "mfront-ui";
import {makeClassVariance} from "mfront-default-ui";
import {CheckIcon} from "lucide-react";
import {mergeWind} from "./../common/tailwind-utils";
import {DefaultInputFrame} from "./default-input-frame";
import {useState, type CSSProperties} from "mfront";

const radioGroupVariants = makeClassVariance("min-w-0 w-full", {
    variants: {
        variant: {
            segmented: "gap-1 rounded-lg bg-muted p-1",
            status: "gap-2",
            cards: "gap-2",
            stacked: "gap-2"
        },
        orientation: {
            horizontal: "flex flex-wrap",
            vertical: "flex flex-col"
        },
        cards: {
            true: "grid grid-cols-1 sm:grid-cols-3",
            false: ""
        }
    },
    defaultVariants: {
        variant: "segmented",
        orientation: "horizontal",
        cards: false
    }
});

const radioOptionVariants = makeClassVariance(
    "relative flex min-w-0 items-center rounded-lg border select-none transition-colors duration-200 ease-out focus-within:ring-1 focus-within:ring-ring/30 data-[inactive=true]:cursor-not-allowed data-[inactive=true]:opacity-50 data-[readonly=true]:cursor-default data-[inactive=false]:data-[readonly=false]:cursor-pointer data-[state=checked]:font-medium",
    {
        variants: {
            variant: {
                segmented: "justify-center gap-1.5 border-transparent bg-background text-foreground hover:bg-background/90 data-[state=checked]:bg-background data-[state=checked]:text-[var(--radio-selected-color)]",
                status: "justify-center gap-1.5 border-border bg-background text-foreground hover:bg-muted/40 data-[state=checked]:border-[var(--radio-selected-color)] data-[state=checked]:bg-[var(--radio-selected-color)] data-[state=checked]:text-[var(--radio-contrast-color)]",
                cards: "gap-3 border-border bg-background text-foreground hover:bg-muted/40 data-[state=checked]:border-[var(--radio-soft-border)] data-[state=checked]:bg-[var(--radio-soft-background)]",
                stacked: "w-full gap-3 border-border bg-background text-foreground hover:bg-muted/40 data-[state=checked]:border-[var(--radio-soft-border)] data-[state=checked]:bg-[var(--radio-soft-background)]"
            },
            size: {
                small: "px-2 py-2 text-xs",
                medium: "px-3 py-3 text-sm",
                large: "px-4 py-4 text-base"
            },
            fullWidth: {
                true: "flex-1 basis-0",
                false: ""
            },
            vertical: {
                true: "w-full",
                false: ""
            }
        },
        defaultVariants: {
            variant: "segmented",
            size: "medium",
            fullWidth: false,
            vertical: false
        }
    }
);

const radioIconVariants = makeClassVariance("shrink-0", {
    variants: {
        size: {
            small: "size-4",
            medium: "size-5",
            large: "size-6"
        }
    },
    defaultVariants: {
        size: "medium"
    }
});

function contrastText(hex: string): string {
    const match = /^#([0-9a-f]{6})$/i.exec(hex);

    if (!match) {
        return "#ffffff";
    }

    const components = [0, 2, 4].map((start) => {
        const value = parseInt(match[1].slice(start, start + 2), 16) / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });

    const luminance = components[0] * 0.2126 + components[1] * 0.7152 + components[2] * 0.0722;
    return luminance > 0.179 ? "#111827" : "#ffffff";
}

export function DefaultRadioButtonField({
    name,
    className,
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
    options,
    variant = "segmented",
    size = "small",
    orientation,
    fullWidth = true,
    disabled = false,
    readOnly = false,
    selectedColor = "#2563eb",
    ...props
}: WebRadioButtonFieldProps) {
    const {fieldRef, setFieldValue} = useFieldHelper<HTMLInputElement>({
        name,
        defaultValue,
        engine,
        onChange
    });
    const {gridItemProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>);
    const [inputValue, setInputValue] = useState<FieldValueType>(defaultValue);

    setInputElementVirtualRef(fieldRef, {
        setValue: (value: string) => {
            setInputValue(value);
        }
    });

    const selectedValue = inputValue === undefined || inputValue === null ? "" : String(inputValue);
    const vertical = orientation ? orientation === "vertical" : variant === "stacked";
    const isCardsGrid = variant === "cards" && !vertical;
    const showDescription = variant === "cards" || variant === "stacked";

    function handleFieldChange(next: string) {
        if (disabled || readOnly || selectedValue === next) {
            return;
        }

        const event = {
            target: {
                name,
                type: "radio",
                value: next
            },
            currentTarget: {
                name,
                type: "radio",
                value: next
            }
        } as unknown as MMReactChangeEvent<HTMLInputElement>;

        setInputValue(next);
        setFieldValue(name, next, event);
    }

    return (
        <DefaultInputFrame
            label={label}
            labelNext={labelNext}
            required={required}
            errorText={errorText}
            hintsText={hintsText}
            isError={isError}
            className={mergeWind("min-w-0", className)}
            orientation="vertical"
            id={id}
            {...gridItemProps}
            element={(labelId: string) => (
                <div
                    role="radiogroup"
                    aria-label={typeof label === "string" ? label : name}
                    aria-required={required}
                    aria-invalid={isError}
                    className={mergeWind(radioGroupVariants({
                        variant,
                        orientation: vertical ? "vertical" : "horizontal",
                        cards: isCardsGrid
                    }))}
                >
                    {options.map((option, index) => {
                        const checked = selectedValue === option.value;
                        const inactive = disabled || option.disabled;
                        const color = option.selectedColor ?? selectedColor;
                        const Icon = option.icon;
                        const optionId = `${labelId}-${index}`;
                        const style = {
                            "--radio-selected-color": color,
                            "--radio-contrast-color": contrastText(color),
                            "--radio-soft-border": `color-mix(in srgb, ${color} 35%, var(--color-border, #e2e8f0))`,
                            "--radio-soft-background": `color-mix(in srgb, ${color} 5%, var(--color-background, white))`
                        } as CSSProperties;

                        return (
                            <label
                                key={option.value}
                                htmlFor={optionId}
                                data-state={checked ? "checked" : "unchecked"}
                                data-inactive={inactive ? "true" : "false"}
                                data-readonly={readOnly ? "true" : "false"}
                                style={style}
                                className={mergeWind(radioOptionVariants({
                                    variant,
                                    size,
                                    fullWidth: fullWidth && !isCardsGrid && !vertical,
                                    vertical
                                }))}
                            >
                                <input
                                    id={optionId}
                                    type="radio"
                                    className="sr-only"
                                    name={name}
                                    value={option.value}
                                    checked={checked}
                                    disabled={inactive}
                                    required={required && !disabled}
                                    aria-readonly={readOnly}
                                    onClick={(event) => {
                                        if (readOnly) {
                                            event.preventDefault();
                                        }
                                    }}
                                    onChange={() => {
                                        handleFieldChange(option.value);
                                    }}
                                />
                                {Icon && (
                                    <Icon className={radioIconVariants({size})} aria-hidden="true" />
                                )}
                                <span className={mergeWind("min-w-0", showDescription && "flex-1")}>
                                    <span className="block">{option.label}</span>
                                    {showDescription && option.subtitle && (
                                        <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                                            {option.subtitle}
                                        </span>
                                    )}
                                </span>
                                {checked && showDescription && (
                                    <CheckIcon className="size-4 shrink-0" aria-hidden="true" />
                                )}
                                {!checked && variant === "stacked" && (
                                    <span className="size-4 shrink-0 rounded-full border border-border" aria-hidden="true" />
                                )}
                            </label>
                        );
                    })}
                </div>
            )}
        />
    );
}
