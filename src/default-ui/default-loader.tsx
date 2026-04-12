import {WebLoaderProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "../common/tailwind-utils";
import {Loader2Icon} from "lucide-react";
import {UIComponent} from "mmcore";

const loaderVariants = makeClassVariance(
    "animate-spin",
    {
        variants: {
            size: {
                default: "size-5",
                xs: "size-3",
                sm: "size-4",
                md: "size-6",
                lg: "size-8",
                xl: "size-9",
                xxl: "size-12",
            },
            speed: {
                .5: "[animation-duration:.5s]",
                1: "[animation-duration:1s]",
                2: "[animation-duration:2s]",
                3: "[animation-duration:3s]",
                4: "[animation-duration:4s]",
                5: "[animation-duration:5s]",
            },
            direction: {
                normal: "[animation-direction:normal]",
                reverse: "[animation-direction:reverse]",
                alternate: "[animation-direction:alternate]",
            }
        },
        defaultVariants: {
            size: "default",
        },
    }
)


export function DefaultLoader({className, icon, variant = "spinner", size = "default", speed = 3, direction = "normal", ...props}: WebLoaderProps) {
    let IconComponent: UIComponent<WebLoaderProps> = Loader2Icon
    if (icon) {
        IconComponent = icon
    }
    return (
        <IconComponent
            className={mergeWind(loaderVariants({size, speed, direction, className}))}
            {...props}
        />
    )
}
