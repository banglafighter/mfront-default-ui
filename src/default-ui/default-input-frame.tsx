import {WebInputFrameProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "mfront-default-ui";
import {MixType, UINode} from "mmcore";
import {UICommonUtil} from "mfront-ui";

const inputFrameVariants = makeClassVariance(
  "group/input-frame flex w-full gap-1 data-[invalid=true]:text-danger",
  {
    variants: {
        orientation: {
            vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
            horizontal: [
                "flex-row items-center",
                "[&>[data-tag=label]]:flex-auto",
                "has-[>[data-tag=input-frame-horizontal]]:items-start has-[>[data-tag=input-frame-horizontal]]:[&>[role=checkbox],[role=radio]]:mt-px",
            ]
        },
        colSpan: {1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4", 5: "col-span-5", 6: "col-span-6", 7: "col-span-7", 8: "col-span-8", 9: "col-span-9", 10: "col-span-10", 11: "col-span-11", 12: "col-span-12", "full": "col-span-full"},
        rowSpan: {1: "row-span-1", 2: "row-span-2", 3: "row-span-3", 4: "row-span-4", 5: "row-span-5", 6: "row-span-6", 7: "row-span-7", 8: "row-span-8", 9: "row-span-9", 10: "row-span-10", 11: "row-span-11", 12: "row-span-12", "full": "row-span-full"},
        colStart: {1: "col-start-1", 2: "col-start-2", 3: "col-start-3", 4: "col-start-4", 5: "col-start-5", 6: "col-start-6", 7: "col-start-7", 8: "col-start-8", 9: "col-start-9", 10: "col-start-10", 11: "col-start-11", 12: "col-start-12"},
        colEnd: {1: "col-end-1", 2: "col-end-2", 3: "col-end-3", 4: "col-end-4", 5: "col-end-5", 6: "col-end-6", 7: "col-end-7", 8: "col-end-8", 9: "col-end-9", 10: "col-end-10", 11: "col-end-11", 12: "col-end-12"},
        rowStart: {1: "row-start-1", 2: "row-start-2", 3: "row-start-3", 4: "row-start-4", 5: "row-start-5", 6: "row-start-6", 7: "row-start-7", 8: "row-start-8", 9: "row-start-9", 10: "row-start-10", 11: "row-start-11", 12: "row-start-12"},
        rowEnd: {1: "row-end-1", 2: "row-end-2", 3: "row-end-3", 4: "row-end-4", 5: "row-end-5", 6: "row-end-6", 7: "row-end-7", 8: "row-end-8", 9: "row-end-9", 10: "row-end-10", 11: "row-end-11", 12: "row-end-12"},

        colSpanMob: {1: "sm:col-span-1", 2: "sm:col-span-2", 3: "sm:col-span-3", 4: "sm:col-span-4", 5: "sm:col-span-5", 6: "sm:col-span-6", 7: "sm:col-span-7", 8: "sm:col-span-8", 9: "sm:col-span-9", 10: "sm:col-span-10", 11: "sm:col-span-11", 12: "sm:col-span-12", "full": "sm:col-span-full"},
        colSpanTab: {1: "md:col-span-1 lg:col-span-1", 2: "md:col-span-2 lg:col-span-2", 3: "md:col-span-3 lg:col-span-3", 4: "md:col-span-4 lg:col-span-4", 5: "md:col-span-5 lg:col-span-5", 6: "md:col-span-6 lg:col-span-6", 7: "md:col-span-7 lg:col-span-7", 8: "md:col-span-8 lg:col-span-8", 9: "md:col-span-9 lg:col-span-9", 10: "md:col-span-10 lg:col-span-10", 11: "md:col-span-11 lg:col-span-11", 12: "md:col-span-12 lg:col-span-12", "full": "md:col-span-full lg:col-span-full"},
        colSpanLarge: {1: "xl:col-span-1", 2: "xl:col-span-2", 3: "xl:col-span-3", 4: "xl:col-span-4", 5: "xl:col-span-5", 6: "xl:col-span-6", 7: "xl:col-span-7", 8: "xl:col-span-8", 9: "xl:col-span-9", 10: "xl:col-span-10", 11: "xl:col-span-11", 12: "xl:col-span-12", "full": "xl:col-span-full"},

        rowSpanMob: {1: "sm:row-span-1", 2: "sm:row-span-2", 3: "sm:row-span-3", 4: "sm:row-span-4", 5: "sm:row-span-5", 6: "sm:row-span-6", 7: "sm:row-span-7", 8: "sm:row-span-8", 9: "sm:row-span-9", 10: "sm:row-span-10", 11: "sm:row-span-11", 12: "sm:row-span-12", "full": "sm:row-span-full"},
        rowSpanTab: {1: "md:row-span-1 lg:row-span-1", 2: "md:row-span-2 lg:row-span-2", 3: "md:row-span-3 lg:row-span-3", 4: "md:row-span-4 lg:row-span-4", 5: "md:row-span-5 lg:row-span-5", 6: "md:row-span-6 lg:row-span-6", 7: "md:row-span-7 lg:row-span-7", 8: "md:row-span-8 lg:row-span-8", 9: "md:row-span-9 lg:row-span-9", 10: "md:row-span-10 lg:row-span-10", 11: "md:row-span-11 lg:row-span-11", 12: "md:row-span-12 lg:row-span-12", "full": "md:row-span-full lg:row-span-full"},
        rowSpanLarge: {1: "xl:row-span-1", 2: "xl:row-span-2", 3: "xl:row-span-3", 4: "xl:row-span-4", 5: "xl:row-span-5", 6: "xl:row-span-6", 7: "xl:row-span-7", 8: "xl:row-span-8", 9: "xl:row-span-9", 10: "xl:row-span-10", 11: "xl:row-span-11", 12: "xl:row-span-12", "full": "xl:row-span-full"},

        colStartMob: {1: "sm:col-start-1", 2: "sm:col-start-2", 3: "sm:col-start-3", 4: "sm:col-start-4", 5: "sm:col-start-5", 6: "sm:col-start-6", 7: "sm:col-start-7", 8: "sm:col-start-8", 9: "sm:col-start-9", 10: "sm:col-start-10", 11: "sm:col-start-11", 12: "sm:col-start-12", "full": "sm:col-start-full"},
        colStartTab: {1: "md:col-start-1 lg:col-start-1", 2: "md:col-start-2 lg:col-start-2", 3: "md:col-start-3 lg:col-start-3", 4: "md:col-start-4 lg:col-start-4", 5: "md:col-start-5 lg:col-start-5", 6: "md:col-start-6 lg:col-start-6", 7: "md:col-start-7 lg:col-start-7", 8: "md:col-start-8 lg:col-start-8", 9: "md:col-start-9 lg:col-start-9", 10: "md:col-start-10 lg:col-start-10", 11: "md:col-start-11 lg:col-start-11", 12: "md:col-start-12 lg:col-start-12", "full": "md:col-start-full lg:col-start-full"},
        colStartLarge: {1: "xl:col-start-1", 2: "xl:col-start-2", 3: "xl:col-start-3", 4: "xl:col-start-4", 5: "xl:col-start-5", 6: "xl:col-start-6", 7: "xl:col-start-7", 8: "xl:col-start-8", 9: "xl:col-start-9", 10: "xl:col-start-10", 11: "xl:col-start-11", 12: "xl:col-start-12", "full": "xl:col-start-full"},

        colEndMob: {1: "sm:col-end-1", 2: "sm:col-end-2", 3: "sm:col-end-3", 4: "sm:col-end-4", 5: "sm:col-end-5", 6: "sm:col-end-6", 7: "sm:col-end-7", 8: "sm:col-end-8", 9: "sm:col-end-9", 10: "sm:col-end-10", 11: "sm:col-end-11", 12: "sm:col-end-12", "full": "sm:col-end-full"},
        colEndTab: {1: "md:col-end-1 lg:col-end-1", 2: "md:col-end-2 lg:col-end-2", 3: "md:col-end-3 lg:col-end-3", 4: "md:col-end-4 lg:col-end-4", 5: "md:col-end-5 lg:col-end-5", 6: "md:col-end-6 lg:col-end-6", 7: "md:col-end-7 lg:col-end-7", 8: "md:col-end-8 lg:col-end-8", 9: "md:col-end-9 lg:col-end-9", 10: "md:col-end-10 lg:col-end-10", 11: "md:col-end-11 lg:col-end-11", 12: "md:col-end-12 lg:col-end-12", "full": "md:col-end-full lg:col-end-full"},
        colEndLarge: {1: "xl:col-end-1", 2: "xl:col-end-2", 3: "xl:col-end-3", 4: "xl:col-end-4", 5: "xl:col-end-5", 6: "xl:col-end-6", 7: "xl:col-end-7", 8: "xl:col-end-8", 9: "xl:col-end-9", 10: "xl:col-end-10", 11: "xl:col-end-11", 12: "xl:col-end-12", "full": "xl:col-end-full"},

        rowStartMob: {1: "sm:row-start-1", 2: "sm:row-start-2", 3: "sm:row-start-3", 4: "sm:row-start-4", 5: "sm:row-start-5", 6: "sm:row-start-6", 7: "sm:row-start-7", 8: "sm:row-start-8", 9: "sm:row-start-9", 10: "sm:row-start-10", 11: "sm:row-start-11", 12: "sm:row-start-12", "full": "sm:row-start-full"},
        rowStartTab: {1: "md:row-start-1 lg:row-start-1", 2: "md:row-start-2 lg:row-start-2", 3: "md:row-start-3 lg:row-start-3", 4: "md:row-start-4 lg:row-start-4", 5: "md:row-start-5 lg:row-start-5", 6: "md:row-start-6 lg:row-start-6", 7: "md:row-start-7 lg:row-start-7", 8: "md:row-start-8 lg:row-start-8", 9: "md:row-start-9 lg:row-start-9", 10: "md:row-start-10 lg:row-start-10", 11: "md:row-start-11 lg:row-start-11", 12: "md:row-start-12 lg:row-start-12", "full": "md:row-start-full lg:row-start-full"},
        rowStartLarge: {1: "xl:row-start-1", 2: "xl:row-start-2", 3: "xl:row-start-3", 4: "xl:row-start-4", 5: "xl:row-start-5", 6: "xl:row-start-6", 7: "xl:row-start-7", 8: "xl:row-start-8", 9: "xl:row-start-9", 10: "xl:row-start-10", 11: "xl:row-start-11", 12: "xl:row-start-12", "full": "xl:row-start-full"},

        rowEndMob: {1: "sm:row-end-1", 2: "sm:row-end-2", 3: "sm:row-end-3", 4: "sm:row-end-4", 5: "sm:row-end-5", 6: "sm:row-end-6", 7: "sm:row-end-7", 8: "sm:row-end-8", 9: "sm:row-end-9", 10: "sm:row-end-10", 11: "sm:row-end-11", 12: "sm:row-end-12", "full": "sm:row-end-full"},
        rowEndTab: {1: "md:row-end-1 lg:row-end-1", 2: "md:row-end-2 lg:row-end-2", 3: "md:row-end-3 lg:row-end-3", 4: "md:row-end-4 lg:row-end-4", 5: "md:row-end-5 lg:row-end-5", 6: "md:row-end-6 lg:row-end-6", 7: "md:row-end-7 lg:row-end-7", 8: "md:row-end-8 lg:row-end-8", 9: "md:row-end-9 lg:row-end-9", 10: "md:row-end-10 lg:row-end-10", 11: "md:row-end-11 lg:row-end-11", 12: "md:row-end-12 lg:row-end-12", "full": "md:row-end-full lg:row-end-full"},
        rowEndLarge: {1: "xl:row-end-1", 2: "xl:row-end-2", 3: "xl:row-end-3", 4: "xl:row-end-4", 5: "xl:row-end-5", 6: "xl:row-end-6", 7: "xl:row-end-7", 8: "xl:row-end-8", 9: "xl:row-end-9", 10: "xl:row-end-10", 11: "xl:row-end-11", 12: "xl:row-end-12", "full": "xl:row-end-full"},
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)


function generate12DigitNumber() {
    const min = 100_000_000_000;
    const max = 999_000_000_000;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString();
}

function getLabel(labelKey: string, label?: string, required?: boolean, labelNext?: any) {
    if (!label) {
        return ""
    }
    let requiredSymbol: any = required ? <span className="text-danger relative top-[2.5px] required-symbol font-bold">*</span> : ""
    return (
        <label data-tag={"label"} htmlFor={labelKey} className={mergeWind(
            "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "group/label peer/label flex w-fit gap-2 leading-snug group-data-[disabled=true]/input-frame:opacity-50",
            "has-[>[data-tag=input-frame]]:w-full has-[>[data-tag=input-frame]]:flex-col has-[>[data-tag=input-frame]]:rounded-md has-[>[data-tag=input-frame]]:border [&>*]:data-[tag=input-frame]:p-4",
            "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        )}>
            {requiredSymbol} {label} {labelNext}
        </label>
    )
}

function getErrorText(errorTest?: string) {
    if (!errorTest) {
        return ""
    }
    return (
        <div className={mergeWind("text-sm font-normal text-danger")}>{errorTest}</div>
    )
}


function getHintsText(hintsText?: string) {
    if (!hintsText) {
        return ""
    }
    return (
        <p className={mergeWind(
            "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
            "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
            "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        )}>{hintsText}</p>
    )
}


export function DefaultInputFrame({element, className, label, labelNext, required, isError, errorText, hintsText, orientation = "vertical", isChildFirst = false, ...props}: WebInputFrameProps) {
    const labelKey = generate12DigitNumber()
    const conditionalProps: Record<string, string | boolean> = {}
    let messageText: UINode = getHintsText(hintsText)

    if (isError) {
        conditionalProps["data-invalid"] = true
        messageText = getErrorText(errorText)
    }

    let childBeforeContent: UINode = (
        <>
            {!isChildFirst ? getLabel(labelKey, label, required, labelNext) : ""}
        </>
    )

    let childAfterContent: UINode = (
        <>
            {isChildFirst ? getLabel(labelKey, label, required, labelNext) : ""}
            {messageText}
        </>
    )

    if (orientation === "horizontal") {
        childAfterContent = (
            <div data-tag={"input-frame-horizontal"}
                 className={mergeWind("group/input-frame-horizontal flex flex-1 flex-col gap-1 leading-snug")}>
                {childAfterContent}
            </div>
        )
    }

    const {gridItemProps, otherProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)
    return (
        <div
            data-tag={"input-frame"}
            data-orientation={orientation}
            {...conditionalProps}
            {...otherProps}
            className={mergeWind(inputFrameVariants({orientation, ...gridItemProps}), className)}
        >
            {childBeforeContent}
            {element(labelKey)}
            {childAfterContent}
        </div>
    )
}