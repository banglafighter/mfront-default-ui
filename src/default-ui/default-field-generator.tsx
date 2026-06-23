import {
    WebCheckFieldProps,
    WebDateTimeFieldProps,
    WebDefaultInputFieldPropsBase,
    WebFieldEngineProps,
    WebFieldGeneratorProps, WebFieldGroupProps, WebFileFieldProps, WebSelectFieldProps,
} from "mmcore-ui";
import {CheckField, DateTimeField, FieldGroup, FileField, SelectField, UICommonUtil} from "mfront-ui";
import {MixType} from "mmcore";
import {makeClassVariance, mergeWind} from "mfront-default-ui";
import PasswordField from "../internal/password-field";


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

            colsMob: {1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5", 6: "sm:grid-cols-6", 7: "sm:grid-cols-7", 8: "sm:grid-cols-8", 9: "sm:grid-cols-9", 10: "sm:grid-cols-10", 11: "sm:grid-cols-11", 12: "sm:grid-cols-12", "full": "sm:grid-cols-full"},
            colsTab: {1: "md:grid-cols-1 lg:grid-cols-1", 2: "md:grid-cols-2 lg:grid-cols-2", 3: "md:grid-cols-3 lg:grid-cols-3", 4: "md:grid-cols-4 lg:grid-cols-4", 5: "md:grid-cols-5 lg:grid-cols-5", 6: "md:grid-cols-6 lg:grid-cols-6", 7: "md:grid-cols-7 lg:grid-cols-7", 8: "md:grid-cols-8 lg:grid-cols-8", 9: "md:grid-cols-9 lg:grid-cols-9", 10: "md:grid-cols-10 lg:grid-cols-10", 11: "md:grid-cols-11 lg:grid-cols-11", 12: "md:grid-cols-12 lg:grid-cols-12", "full": "md:grid-cols-full lg:grid-cols-full"},
            colsLarge: {1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3", 4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6", 7: "xl:grid-cols-7", 8: "xl:grid-cols-8", 9: "xl:grid-cols-9", 10: "xl:grid-cols-10", 11: "xl:grid-cols-11", 12: "xl:grid-cols-12", "full": "xl:grid-cols-full"},

            rowsMob: {1: "sm:grid-rows-1", 2: "sm:grid-rows-2", 3: "sm:grid-rows-3", 4: "sm:grid-rows-4", 5: "sm:grid-rows-5", 6: "sm:grid-rows-6", 7: "sm:grid-rows-7", 8: "sm:grid-rows-8", 9: "sm:grid-rows-9", 10: "sm:grid-rows-10", 11: "sm:grid-rows-11", 12: "sm:grid-rows-12", "full": "sm:grid-rows-full"},
            rowsTab: {1: "md:grid-rows-1 lg:grid-rows-1", 2: "md:grid-rows-2 lg:grid-rows-2", 3: "md:grid-rows-3 lg:grid-rows-3", 4: "md:grid-rows-4 lg:grid-rows-4", 5: "md:grid-rows-5 lg:grid-rows-5", 6: "md:grid-rows-6 lg:grid-rows-6", 7: "md:grid-rows-7 lg:grid-rows-7", 8: "md:grid-rows-8 lg:grid-rows-8", 9: "md:grid-rows-9 lg:grid-rows-9", 10: "md:grid-rows-10 lg:grid-rows-10", 11: "md:grid-rows-11 lg:grid-rows-11", 12: "md:grid-rows-12 lg:grid-rows-12", "full": "md:grid-rows-full lg:grid-rows-full"},
            rowsLarge: {1: "xl:grid-rows-1", 2: "xl:grid-rows-2", 3: "xl:grid-rows-3", 4: "xl:grid-rows-4", 5: "xl:grid-rows-5", 6: "xl:grid-rows-6", 7: "xl:grid-rows-7", 8: "xl:grid-rows-8", 9: "xl:grid-rows-9", 10: "xl:grid-rows-10", 11: "xl:grid-rows-11", 12: "xl:grid-rows-12", "full": "xl:grid-rows-full"},

            gapMob: {1: "sm:gap-1", 2: "sm:gap-2", 3: "sm:gap-3", 4: "sm:gap-4", 5: "sm:gap-5", 6: "sm:gap-6", 7: "sm:gap-7", 8: "sm:gap-8", 9: "sm:gap-9", 10: "sm:gap-10", 11: "sm:gap-11", 12: "sm:gap-12"},
            gapTab: {1: "md:gap-1", 2: "md:gap-2", 3: "md:gap-3", 4: "md:gap-4", 5: "md:gap-5", 6: "md:gap-6", 7: "md:gap-7", 8: "md:gap-8", 9: "md:gap-9", 10: "md:gap-10", 11: "md:gap-11", 12: "md:gap-12"},
            layout: {
                grid: "grid"
            }
        }
    }
)

export function getFieldFromSpec(spec: WebDefaultInputFieldPropsBase, index: number, engine: WebFieldEngineProps, extraConfig: Record<string, any> = {}) {
    const {specType, isHidden, ...fieldSpec} = spec;
    if (isHidden) {
        return null
    }

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