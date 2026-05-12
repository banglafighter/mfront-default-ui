import {
    DialogSize,
    DialogSlideFrom, DialogType,
    WebDialogBodyProps, WebDialogFooterProps,
    WebDialogGeneratorProps, WebDialogHeaderProps, WebDialogProps,
    WebDialogSubTitleProps,
    WebDialogTitleProps
} from "mmcore-ui";
import {
    Dialog as DialogPrimitive,
    Portal as DialogPortalPrimitive,
    Close as DialogClosePrimitive,
    Overlay as DialogOverlayPrimitive,
    Content as DialogContentPrimitive,
    Title as DialogTitlePrimitive,
    Description as DialogDescriptionPrimitive,
} from "@radix-ui/react-dialog"
import {makeClassVariance, mergeWind} from "./../common/tailwind-utils";
import {MixType, mmReactUseCallback, UIComponentProps, UINode} from "mmcore";
import {XIcon} from "lucide-react";


export function DefaultDialogGenerator({type = "dialog", dialogSize = "small", slideFrom = "right", className, modal, title, subTitle, header, footer, footerActionButtons, body, engine, showCloseButton, ...props}: WebDialogGeneratorProps) {

    const getHeader = mmReactUseCallback(() => {
        let isEmpty: boolean = true
        let titleContent: UINode = ""
        let subTitleContent: UINode = ""
        let _title = engine.getActionValue("title", title)
        let _subTitle = engine.getActionValue("subTitle", subTitle)

        if (header) {
            isEmpty = false
        } else {
            if (_title) {
                isEmpty = false
                titleContent = (<DefaultDialogTitle>{_title}</DefaultDialogTitle>)
            }
            if (_subTitle) {
                isEmpty = false
                subTitleContent = (<DefaultDialogSubTitle>{_subTitle}</DefaultDialogSubTitle>)
            }
        }

        if (!isEmpty) {
            return (
                <DefaultDialogHeader>
                    {header}
                    {titleContent}
                    {subTitleContent}
                </DefaultDialogHeader>
            )
        }
        return ""
    }, [])

    const getFooter = mmReactUseCallback(() => {
        let isEmpty: boolean = true
        if (footer) {
            isEmpty = false
        } else {

        }
        if (!isEmpty) {
            return (
                <DefaultDialogFooter>
                    {footer}
                </DefaultDialogFooter>
            )
        }

        return ""
    }, [])

    const bodyProps : Record<string, MixType | undefined> = {
        "slideFrom": slideFrom,
        "dialogSize": dialogSize,
        "type": type,
        "showCloseButton": showCloseButton,
    }

    const getBodyProps = () => {
        const modifiedProps = {...bodyProps}
        modifiedProps.slideFrom = engine.getActionValue("slideFrom", modifiedProps.slideFrom) as DialogSlideFrom
        modifiedProps.type = engine.getActionValue("type", modifiedProps.type) as DialogType
        modifiedProps.dialogSize = engine.getActionValue("dialogSize", modifiedProps.dialogSize) as DialogSize
        return modifiedProps
    }

    const getBodyContent = () => {
        return engine.getActionValue("body", body)
    }

    return (
        <DefaultDialog open={engine.isOpen} onOpenChange={engine.close} modal={modal}>
            <DefaultDialogBody {...getBodyProps()}>
                {getHeader()}
                <div className={mergeWind("overflow-y-auto", className)} {...props}>
                    {getBodyContent()}
                </div>
                {getFooter()}
            </DefaultDialogBody>
        </DefaultDialog>
    )
}

export function DefaultDialog({open, defaultOpen, onOpenChange, modal, children}: WebDialogProps) {
    return (<DialogPrimitive
        data-tag="dialog"
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        modal={modal}
        children={children}
    />)
}

export function DefaultDialogHeader({className, ...props}: WebDialogHeaderProps) {
    return (
        <div
            data-tag="dialog-header"
            className={mergeWind("flex flex-col gap-2", className)}
            {...props}
        />
    )
}

export function DefaultDialogFooter({className, children, ...props}: WebDialogFooterProps) {
    return (
        <div
            data-tag="dialog-footer"
            className={mergeWind(
                "mt-auto flex flex-row justify-end gap-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function DefaultDialogTitle({className, ...props}: WebDialogTitleProps) {
    return (
        <DialogTitlePrimitive
            data-tag="dialog-title"
            className={mergeWind("text-lg leading-none font-semibold mr-3", className)}
            {...props}
        />
    )
}

export function DefaultDialogSubTitle({className, ...props}: WebDialogSubTitleProps) {
    return (
        <DialogDescriptionPrimitive
            data-tag="dialog-subtitle"
            className={mergeWind("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
}

function DialogOverlay({className, ...props}: UIComponentProps<"div">) {
    return (
        <DialogOverlayPrimitive
            data-tag="dialog-overlay"
            className={mergeWind(
                "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
                className
            )}
            {...props}
        />
    )
}

function DialogClose({...props}: UIComponentProps<"button">) {
    return <DialogClosePrimitive data-tag="dialog-close" {...props} />
}

function DialogPortal({...props}: UIComponentProps<"div">) {
    return <DialogPortalPrimitive data-tag="dialog-portal" {...props} />
}

const dialogBodyVariations = makeClassVariance(
    "",
    {
        variants: {
            type: {
                dialog: "fixed top-[50%] left-[50%] z-50 flex flex-col w-full max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] translate-x-[-50%] translate-y-[-50%] gap-2 rounded-lg border bg-background p-5 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                alert: "fixed top-[50%] left-[50%] z-50 flex flex-col w-full max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] translate-x-[-50%] translate-y-[-50%] gap-2 rounded-lg border bg-background p-5 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                drawer: "fixed z-50 bg-background p-5 gap-2 flex flex-col  shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
            },
            slideFrom: {
                right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
                left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
                top: "inset-x-0 top-0 h-auto max-h-[calc(100%-10rem)] border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
                bottom: "inset-x-0 bottom-0 h-auto max-h-[calc(100%-10rem)] border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            },
            dialogSize: {
                tiny: "max-w-sm",
                small: "max-w-lg",
                medium: "max-w-2xl",
                large: "max-w-6xl",
                full: "h-full",
            }
        }
    }
)


export function DefaultDialogBody({className, children, showCloseButton = true, type = "dialog", dialogSize = "small", slideFrom = "right", ...props}: WebDialogBodyProps) {
    let variations: Record<string, string> = {
        type: type
    }

    if (type === "dialog") {
        variations["dialogSize"] = dialogSize
    } else if (type === "drawer") {
        variations["slideFrom"] = slideFrom
    } else if (type === "alert") {
        showCloseButton = false
        variations["dialogSize"] = dialogSize
    }

    return (
        <DialogPortal data-tag="dialog-portal">
            <DialogOverlay/>
            <DialogContentPrimitive
                data-tag="dialog-body"
                className={mergeWind(
                    dialogBodyVariations(variations),
                    className
                )}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <DialogClose className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                        <XIcon/>
                        <span className="sr-only">Close</span>
                    </DialogClose>
                )}
            </DialogContentPrimitive>
        </DialogPortal>
    )
}
