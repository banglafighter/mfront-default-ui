import {WebFileFieldProps} from "mmcore-ui";
import {mergeWind} from "./../common/tailwind-utils";
import {DefaultInputFrame} from "./default-input-frame";
import {UICommonUtil} from "mfront-ui";
import {MixType, UINode} from "mmcore";
import Dropzone, {DropzoneState} from "react-dropzone";
import {CloudUpload} from "lucide-react";


export function DefaultFileField(
    {
        name,
        className,
        multiple,
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
        ...props
    }: WebFileFieldProps) {
    // const {fieldRef, handleChange} = useFieldHelper<HTMLSelectElement>({name, defaultValue, engine, onChange})
    const {gridItemProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)
    let _centerContent: UINode = centerContent
    if (!_centerContent) {
        _centerContent = (
            <span className={"flex gap-2 text-lg font-medium"}>
                <CloudUpload/> Drop your {multiple ? "files" : "file"} here
            </span>
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
                <Dropzone
                    multiple={multiple}
                    maxFiles={maxFiles}
                    minSize={minSize}
                    maxSize={maxSize}
                    onDrop={(acceptedFiles, fileRejections) => {

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
                                <p className={"text-gray-500"}>
                                    {_centerContent}
                                </p>
                            </div>
                        )
                    }}
                </Dropzone>
            )}/>
    )
}