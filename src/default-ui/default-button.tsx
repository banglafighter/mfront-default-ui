import {WebButtonProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "../common/tailwind-utils";

const buttonVariants = makeClassVariance(
    "",
    {
        variants: {
            variant: {
                primary: "",
                secondary: "",
                info: "",
                danger: "",
                warning: "",
                success: "",
                outline: "",
                link: "",
            },
            size: {
                default: "",
                sm: "",
                xs: "",
                lg: "",
                icon: "",
                iconSm: "",
                iconLg: "",
                iconXs: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export function DefaultButton({className, variant = "primary", size = "default", ...props}: WebButtonProps) {
    const ButtonTag = "button"
    return (
        <ButtonTag
            className={mergeWind(buttonVariants({variant, size, className}))}
            {...props}
        />
    )
}