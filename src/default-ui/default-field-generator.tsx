import {
    GridBase,
    WebCheckFieldProps,
    WebDateTimeFieldProps,
    WebDefaultInputFieldPropsBase,
    WebFieldEngineProps,
    WebFieldGeneratorProps, WebFieldGroupProps, WebFileFieldProps, WebSelectFieldProps,
} from "mmcore-ui";
import {CheckField, DateTimeField, FieldGroup, FileField, GridItem, SelectField, UICommonUtil} from "mfront-ui";
import {MixType} from "mmcore";
import {makeClassVariance, mergeWind} from "mfront-default-ui";
import PasswordField from "../internal/password-field";

type ResponsiveSpan = {
    mobile: GridBase
    tablet: GridBase
}


const autoColSpan: Record<GridBase, ResponsiveSpan> = {
    1: {mobile: 6, tablet: 3},
    2: {mobile: 6, tablet: 4},
    3: {mobile: 12, tablet: 6},
    4: {mobile: 12, tablet: 6},
    5: {mobile: 12, tablet: 6},
    6: {mobile: 12, tablet: 6},
    7: {mobile: 12, tablet: 12},
    8: {mobile: 12, tablet: 12},
    9: {mobile: 12, tablet: 12},
    10: {mobile: 12, tablet: 12},
    11: {mobile: 12, tablet: 12},
    12: {mobile: 12, tablet: 12},
}

export function resolveAutoColSpan(props: any) {
    const colSpan = props.colSpan as GridBase | undefined

    if (!colSpan) {
        return props
    }

    const auto = autoColSpan[colSpan]

    return {
        ...props,
        colSpanMob: props.colSpanMob ?? auto.mobile,
        colSpanTab: props.colSpanTab ?? auto.tablet
    }
}


const fieldGeneratorVariants = makeClassVariance(
    "",
    {
        variants: {
            cols: {1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6", 7: "grid-cols-7", 8: "grid-cols-8", 9: "grid-cols-9", 10: "grid-cols-10", 11: "grid-cols-11", 12: "grid-cols-12"},
            rows: {1: "grid-rows-1", 2: "grid-rows-2", 3: "grid-rows-3", 4: "grid-rows-4", 5: "grid-rows-5", 6: "grid-rows-6", 7: "grid-rows-7", 8: "grid-rows-8", 9: "grid-rows-9", 10: "grid-rows-10", 11: "grid-rows-11", 12: "grid-rows-12"},
            flow: {row: "grid-flow-row", column: "grid-flow-col"},
            gap: {1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 5: "gap-5", 6: "gap-6", 7: "gap-7", 8: "gap-8", 9: "gap-9", 10: "gap-10", 11: "gap-11", 12: "gap-12"},

            colGap: {1: "gap-x-1", 2: "gap-x-2", 3: "gap-x-3", 4: "gap-x-4", 5: "gap-x-5", 6: "gap-x-6", 7: "gap-x-7", 8: "gap-x-8", 9: "gap-x-9", 10: "gap-x-10", 11: "gap-x-11", 12: "gap-x-12"},
            rowGap: {1: "gap-y-1", 2: "gap-y-2", 3: "gap-y-3", 4: "gap-y-4", 5: "gap-y-5", 6: "gap-y-6", 7: "gap-y-7", 8: "gap-y-8", 9: "gap-y-9", 10: "gap-y-10", 11: "gap-y-11", 12: "gap-y-12"},

            colsMob: {1: "max-md:grid-cols-1", 2: "max-md:grid-cols-2", 3: "max-md:grid-cols-3", 4: "max-md:grid-cols-4", 5: "max-md:grid-cols-5", 6: "max-md:grid-cols-6", 7: "max-md:grid-cols-7", 8: "max-md:grid-cols-8", 9: "max-md:grid-cols-9", 10: "max-md:grid-cols-10", 11: "max-md:grid-cols-11", 12: "max-md:grid-cols-12", "full": "max-md:grid-cols-full"},
            colsTab: {1: "md:max-lg:grid-cols-1", 2: "md:max-lg:grid-cols-2", 3: "md:max-lg:grid-cols-3", 4: "md:max-lg:grid-cols-4", 5: "md:max-lg:grid-cols-5", 6: "md:max-lg:grid-cols-6", 7: "md:max-lg:grid-cols-7", 8: "md:max-lg:grid-cols-8", 9: "md:max-lg:grid-cols-9", 10: "md:max-lg:grid-cols-10", 11: "md:max-lg:grid-cols-11", 12: "md:max-lg:grid-cols-12", "full": "md:max-lg:grid-cols-full"},
            colsLarge: {1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3", 4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6", 7: "xl:grid-cols-7", 8: "xl:grid-cols-8", 9: "xl:grid-cols-9", 10: "xl:grid-cols-10", 11: "xl:grid-cols-11", 12: "xl:grid-cols-12", "full": "xl:grid-cols-full"},

            rowsMob: {1: "max-md:grid-rows-1", 2: "max-md:grid-rows-2", 3: "max-md:grid-rows-3", 4: "max-md:grid-rows-4", 5: "max-md:grid-rows-5", 6: "max-md:grid-rows-6", 7: "max-md:grid-rows-7", 8: "max-md:grid-rows-8", 9: "max-md:grid-rows-9", 10: "max-md:grid-rows-10", 11: "max-md:grid-rows-11", 12: "max-md:grid-rows-12", "full": "max-md:grid-rows-full"},
            rowsTab: {1: "md:max-lg:grid-rows-1", 2: "md:max-lg:grid-rows-2", 3: "md:max-lg:grid-rows-3", 4: "md:max-lg:grid-rows-4", 5: "md:max-lg:grid-rows-5", 6: "md:max-lg:grid-rows-6", 7: "md:max-lg:grid-rows-7", 8: "md:max-lg:grid-rows-8", 9: "md:max-lg:grid-rows-9", 10: "md:max-lg:grid-rows-10", 11: "md:max-lg:grid-rows-11", 12: "md:max-lg:grid-rows-12", "full": "md:max-lg:grid-rows-full"},
            rowsLarge: {1: "xl:grid-rows-1", 2: "xl:grid-rows-2", 3: "xl:grid-rows-3", 4: "xl:grid-rows-4", 5: "xl:grid-rows-5", 6: "xl:grid-rows-6", 7: "xl:grid-rows-7", 8: "xl:grid-rows-8", 9: "xl:grid-rows-9", 10: "xl:grid-rows-10", 11: "xl:grid-rows-11", 12: "xl:grid-rows-12", "full": "xl:grid-rows-full"},

            gapMob: {1: "max-md:gap-1", 2: "max-md:gap-2", 3: "max-md:gap-3", 4: "max-md:gap-4", 5: "max-md:gap-5", 6: "max-md:gap-6", 7: "max-md:gap-7", 8: "max-md:gap-8", 9: "max-md:gap-9", 10: "max-md:gap-10", 11: "max-md:gap-11", 12: "max-md:gap-12"},
            gapTab: {1: "md:max-lg:gap-1", 2: "md:max-lg:gap-2", 3: "md:max-lg:gap-3", 4: "md:max-lg:gap-4", 5: "md:max-lg:gap-5", 6: "md:max-lg:gap-6", 7: "md:max-lg:gap-7", 8: "md:max-lg:gap-8", 9: "md:max-lg:gap-9", 10: "md:max-lg:gap-10", 11: "md:max-lg:gap-11", 12: "md:max-lg:gap-12"},
            layout: {
                grid: "grid"
            }
        }
    }
)

export function getFieldFromSpec(spec: WebDefaultInputFieldPropsBase, index: number, engine: WebFieldEngineProps, extraConfig: Record<string, any> = {}) {
    let {specType, isHidden, ...fieldSpec} = spec;
    if (isHidden) {
        return null
    }
    fieldSpec = resolveAutoColSpan(fieldSpec)

    switch (specType) {
        case "text":
            const textProps = fieldSpec as WebFieldGroupProps
            return (<FieldGroup {...textProps} type={textProps.type} key={index} engine={engine}/>)
        case "password":
            const passwordProps = fieldSpec as WebFieldGroupProps
            return (<PasswordField {...passwordProps} key={index} engine={engine}/>)
        case "textarea":
            const textareaProps = fieldSpec as WebFieldGroupProps
            return (<FieldGroup {...textareaProps} type={"textarea"} key={index} engine={engine}/>)
        case "select":
            const selectProps = fieldSpec as WebSelectFieldProps
            return (<SelectField {...selectProps} key={index} engine={engine}/>)
        case "file":
            const fileProps = fieldSpec as WebFileFieldProps
            if (extraConfig && extraConfig.relativeUrl) {
                fileProps.relativeUrl = extraConfig.relativeUrl
            }
            return (<FileField {...fileProps} key={index} engine={engine}/>)
        case "date":
            const dateProps = fieldSpec as WebDateTimeFieldProps
            return (<DateTimeField {...dateProps} key={index} engine={engine}/>)
        case "checkbox":
            const checkboxProps = fieldSpec as WebCheckFieldProps
            return (<CheckField {...checkboxProps} key={index} engine={engine}/>)
        case "break" as any:
            const breakProps = fieldSpec as WebCheckFieldProps
            return (
                <GridItem colSpan={breakProps.colSpan} key={index}>
                    {breakProps.content}
                </GridItem>
            )
    }
    return null
}

export default function DefaultFieldGenerator ({className, engine, layout = "grid", extraConfig, ...props}: WebFieldGeneratorProps){
    const {gridProps, otherProps} = UICommonUtil.extractGridProps(props as Record<string, MixType>)

    return (
        <div {...otherProps} className={mergeWind(fieldGeneratorVariants({layout, ...gridProps}), className)} key={`fg-${engine.version}`}>
            {engine.fieldSpecList().map((spec: WebDefaultInputFieldPropsBase, index: number)=> {
                return getFieldFromSpec(spec, index, engine, extraConfig)
            })}
        </div>
    )
}