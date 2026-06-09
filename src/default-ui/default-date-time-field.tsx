import {CalendarMonthYearSelection, FieldValueType, PopoverPosition, WebDateTimeFieldProps} from "mmcore-ui";
import { format } from "date-fns"
import {DefaultPopover} from "./default-popover";
import {Button, UICommonUtil, useFieldHelper} from "mfront-ui";
import {CalendarIcon} from "lucide-react";
import {useState} from "mfront";
import {DefaultInputFrame} from "./default-input-frame";
import {MixType, MMReactChangeEvent, mmReactUseEffect} from "mmcore";
import {DefaultCalendar} from "./default-calendar";
import {DateRange} from "react-day-picker";
import DateTimeFormatter from "../common/date-time-formatter";


export function DefaultDateTimeField(
    {
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
        defaultValue,
        placeholder,
        onChange,
        monthYearSelection,
        valueFormat = "dd/MM/yyyy",
        displayFormat = "dd/MM/yyyy",
        position = "center",
        dateInputType = "single",
        ...props
    }: WebDateTimeFieldProps) {
    const {handleChange} = useFieldHelper<HTMLInputElement>({name, defaultValue, engine, onChange})
    const {gridItemProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)

    const handleInputChange = (selected: Date | DateRange | undefined) => {
        let value: any = null
        if (selected && selected instanceof Date) {
            value = DateTimeFormatter.getFormattedDate(displayFormat, selected)
        }
        if (value) {
            const event = {
                target: {
                    name,
                    value: value,
                } as HTMLInputElement,
                currentTarget: {
                    name,
                    value: value,
                } as HTMLInputElement,
            } as MMReactChangeEvent<HTMLInputElement>
            handleChange(event)
        }
    }

    const getCalenderView = (labelId: string) => {
        if (dateInputType === "range") {
            return (
                <CalendarRangeInput
                    labelId={labelId}
                    position={position}
                    placeholder={placeholder}
                    monthYearSelection={monthYearSelection}
                    displayFormat={displayFormat}
                    handleChange={handleInputChange}
                    defaultValue={defaultValue}
                    valueFormat={valueFormat}
                />
            )
        }
        return (
            <CalendarSingleInput
                labelId={labelId}
                position={position}
                placeholder={placeholder}
                monthYearSelection={monthYearSelection}
                displayFormat={displayFormat}
                handleChange={handleInputChange}
                defaultValue={defaultValue}
                valueFormat={valueFormat}
            />
        )
    }

    return (
        <DefaultInputFrame
            label={label}
            labelNext={labelNext}
            required={required}
            errorText={errorText}
            hintsText={hintsText}
            isError={isError}
            className={className}
            id={id}
            {...gridItemProps}
            element={(labelId: string) => getCalenderView(labelId)}
        />
    )
}

interface CalendarInput {
    placeholder?: string | undefined
    labelId: string
    position?: PopoverPosition
    monthYearSelection?: CalendarMonthYearSelection
    handleChange?: (selected: Date | DateRange | undefined) => void
    displayFormat?: string
    valueFormat?: string
    defaultValue?: FieldValueType
}

function CalendarSingleInput({placeholder, labelId, position, monthYearSelection, displayFormat, defaultValue, handleChange, valueFormat, ...props}: CalendarInput) {
    const [date, setDate] = useState<Date>()
    mmReactUseEffect(() => {
        if (defaultValue && valueFormat) {
            setDate(DateTimeFormatter.getDateFromSting(defaultValue as string, valueFormat))
        }
    }, [defaultValue])

    return (
        <DefaultPopover
            position={position}
            trigger={
                <Button
                    id={labelId}
                    variant="outline"
                    data-empty={!date}
                    className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                    {date ? DateTimeFormatter.getFormattedDate(displayFormat, date) : <span>{placeholder}</span>}
                    <CalendarIcon/>
                </Button>
            }
            body={
                <div className={"w-auto p-0"}>
                    <DefaultCalendar
                        monthYearSelection={monthYearSelection}
                        selectionMode="single"
                        selected={date}
                        onSelect={(selected: any) =>{
                            setDate(selected)
                            if (handleChange) {
                                handleChange(selected)
                            }
                        }}
                    />
                </div>
            }
        />
    )
}

function CalendarRangeInput({placeholder, labelId, position, monthYearSelection, defaultValue, handleChange, ...props}: CalendarInput) {
    const [date, setDate] = useState<DateRange | undefined>()
    return (
        <DefaultPopover
            position={position}
            trigger={
                <Button
                    id={labelId}
                    variant="outline"
                    data-empty={!date}
                    className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                    ) : (
                        <span>{placeholder}</span>
                    )}
                    <CalendarIcon/>
                </Button>
            }
            body={
                <div className={"w-auto p-0"}>
                    <DefaultCalendar
                        monthYearSelection={monthYearSelection}
                        selectionMode="range"
                        selected={date}
                        numberOfMonths={2}
                        onSelect={(selected: any) =>{
                            setDate(selected)
                            if (handleChange) {
                                handleChange(selected)
                            }
                        }}
                    />
                </div>
            }
        />
    )
}