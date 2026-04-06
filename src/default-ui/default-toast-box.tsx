import {Bounce, Flip, Slide, toast, ToastContainer, ToastOptions, Zoom} from "react-toastify";
import {MMUtil} from "mmcore";
import {WebToastActionProps, WebToastProps} from "mmcore-ui";

function getTransition(transitionType?: string) {
    let transition: any = undefined
    switch (transitionType) {
        case "bounce":
            transition = Bounce
            break
        case "flip":
            transition = Flip
            break
        case "slide":
            transition = Slide
            break
        case "zoom":
            transition = Zoom
            break
    }
    return transition
}

function getPosition(positionType?: string) {
    let position: any = "top-center"
    if (positionType === "bottom") {
        position = "top-bottom"
    } else if (positionType !== undefined) {
        position = MMUtil.camelToKebab(positionType)
    }
    return position
}

function getAutoClose(autoHide?: boolean, visibilityTimeMS?: number) {
    if (autoHide === true || autoHide === undefined) {
        if (visibilityTimeMS !== undefined) {
            return visibilityTimeMS
        }
        return undefined
    }
    return false
}

const UIToastPropsDefault: Partial<WebToastProps> = {
    position: "top",
    visibilityTimeMS: 5000,
    autoHide: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    theme: "light",
    transition: "bounce",
}

export function DefaultToastBox(props: WebToastProps) {
    let _props: WebToastProps = MMUtil.setPropsDefault<WebToastProps>(props, UIToastPropsDefault)
    let position: any = getPosition(_props.position)
    let transition: any = getTransition(_props.transition)
    return (
        <ToastContainer
            position={position}
            autoClose={getAutoClose(_props.autoHide, _props.visibilityTimeMS)}
            pauseOnFocusLoss={_props.pauseOnFocusLoss}
            pauseOnHover={_props.pauseOnHover}
            theme={_props.theme}
            transition={transition}
        />
    )
}

export function defaultToastAction(props: WebToastActionProps) {
    let position: any = getPosition(props.position)
    let transition: any = getTransition(props.transition)
    let options: ToastOptions = {
        theme: props.theme,
        position: position,
        transition: transition,
        onClose: props.onClose,
        autoClose: getAutoClose(props.autoHide, props.visibilityTimeMS)
    }
    switch (props.type) {
        case "success":
            toast.success(props.message, options)
            break
        case "error":
            toast.error(props.message, options)
            break
        case "warning":
            toast.warning(props.message, options)
            break
        case "info":
            toast.info(props.message, options)
            break
        default:
            toast(props.message, options)
    }
}