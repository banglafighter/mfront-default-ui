import {WebFileFieldProps} from "mmcore-ui";
import {mergeWind} from "./../common/tailwind-utils";
import {DefaultInputFrame} from "./default-input-frame";
import {toast, UICommonUtil, useFieldHelper} from "mfront-ui";
import {MixType, MMReactChangeEvent, mmReactUseState, UINode} from "mmcore";
import Dropzone, {DropzoneState, FileRejection} from "react-dropzone";
import {CloudUpload} from "lucide-react";
import {_t} from "mfront";


export function DefaultFileField(
    {
        name,
        className,
        multiple = false,
        label,
        labelNext,
        required,
        errorText,
        hintsText,
        isError,
        id,
        engine,
        maxFiles,
        minSize,
        maxSize,
        centerContent,
        mimeType,
        defaultValue,
        onChange,
        acceptFileExtensions,
        preview,
        ...props
    }: WebFileFieldProps) {
    const [fileValue, setFileValue] = mmReactUseState<File | File[] | null>(null)
    const [internalError, setInternalError] = mmReactUseState<string | null>(null)
    const {handleChange} = useFieldHelper<HTMLInputElement>({name, defaultValue, engine, onChange})
    const {gridItemProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)

    let _centerContent: UINode = centerContent
    if (!_centerContent) {
        _centerContent = (
            <span className={"flex gap-2 text-lg font-medium"}>
                <CloudUpload/> Drop your {multiple ? "files" : "file"} here
            </span>
        )
    }

    const formatBytes = (bytes: number = 0) => {
        if (bytes === 0) {
            return "0 Bytes"
        }
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    }

    const getErrorMessage = (code: string) => {
        switch (code) {
            case "file-too-large":
                return `File is larger than ${formatBytes(maxSize)}`;
            case "file-too-small":
                return "File is too small";
            case "file-invalid-type":
                return "Invalid file type";
            case "too-many-files":
                return "Too many files selected";
            default:
                return "File upload failed";
        }
    }

    const trimComma = (message: string) => {
        return message.replace(/^,+|,+$/g, "")
    }

    const handleRejectedFiles = (fileRejections: FileRejection[]) => {
        let error: string | null = null
        if (!multiple && fileRejections.length > 0) {
            error = _t("Only one file can be uploaded")
        } else {
            for (let rejections of fileRejections) {
                for (let eachError of rejections.errors) {
                    error = `, ${_t(getErrorMessage(eachError.code))}`
                }
            }
            if (error) {
                error = trimComma(error)
            }
        }
        setInternalError(error)
        if (error) {
            toast({
                type: "error",
                message: error
            })
        }
    }

    const handleAcceptedFiles = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (fileRejections && fileRejections.length > 0) {
            return
        }
        let value: any = acceptedFiles[0]
        if (multiple) {
            value = []
            for (let acceptFile of acceptedFiles) {
                value.push(acceptFile)
            }
        }
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
        setFileValue(value)
        handleChange(event)
    }

    const _acceptedFiles = mimeType ? {[mimeType]: acceptFileExtensions ?? []} : undefined

    const getHints = () => {
        let messages: string[] = []
        if (acceptFileExtensions) {
            messages.push(`Allowed file types: ${acceptFileExtensions.join(", ")}`)
        }
        if (maxSize) {
            messages.push(`File size must not exceed ${formatBytes(maxSize)}`)
        }
        if (minSize) {
            messages.push(`File size must be at least ${formatBytes(minSize)}`)
        }
        if (messages.length > 0) {
            return (
                <p className={"text-secondary font-bold"}>{messages.join(", ")}</p>
            )
        }
        return null
    }

    const getPrview = () => {
        let previewValue: any = defaultValue
        let isFile: boolean = false
        if (fileValue) {
            isFile = true
            previewValue = fileValue
        }

        if (previewValue && !Array.isArray(previewValue)) {
            previewValue = [previewValue]
        }

        if (preview && previewValue) {
            return preview(multiple, isFile, previewValue)
        }
        if (!previewValue) {
            return null
        }

        return (
            <ul>
                {previewValue.map((value: string | File, index: number) => {
                    return (
                        <li key={index}>{value instanceof File ? value.name : value}</li>
                    )
                })}
            </ul>
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
            element={(labelId: string) => (
                <>
                    <Dropzone
                        accept={_acceptedFiles}
                        multiple={multiple}
                        maxFiles={maxFiles}
                        minSize={minSize}
                        maxSize={maxSize}
                        onDrop={(acceptedFiles, fileRejections) => {
                            handleRejectedFiles(fileRejections)
                            handleAcceptedFiles(acceptedFiles, fileRejections)
                        }}
                    >
                        {({getRootProps, getInputProps, isDragActive}: DropzoneState) => {
                            return (
                                <div
                                    aria-invalid={isError}
                                    {...getRootProps()}
                                    className={mergeWind(
                                        "flex items-center justify-center",
                                        "h-40 w-full border-2 border-dashed rounded-lg cursor-pointer transition",
                                        "aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40",
                                        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                    )}
                                >
                                    <input id={labelId} {...getInputProps()} />
                                    <div className={"flex flex-col gap-1 items-center"}>
                                        <p className={"text-gray-500"}>
                                            {_centerContent}
                                        </p>
                                        {internalError && <p className={"text-danger font-bold"}>{internalError}</p>}
                                        {getHints()}
                                    </div>
                                </div>
                            )
                        }}
                    </Dropzone>
                    {getPrview()}
                </>
            )}/>
    )
}