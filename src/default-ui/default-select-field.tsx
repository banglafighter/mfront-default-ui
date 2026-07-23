import {FieldValueType, WebSelectFieldProps} from "mmcore-ui";
import {
    MixType, MMReactChangeEvent, mmReactUseCallback,
    mmReactUseEffect, mmReactUseMemo, mmReactUseRef, mmReactUseState
} from "mmcore";
import {Loader, setSelectElementElementVirtualRef, UICommonUtil, useFieldHelper} from "mfront-ui";
import {DefaultInputFrame} from "./default-input-frame";
import {_t} from "mfront";
import Select, { MultiValue, SingleValue, components } from "react-select";
import {mergeWind} from "mfront-default-ui";
import {ChevronDownIcon, Loader as LoaderIcon, XIcon} from "lucide-react";


export function DefaultSelectField({options, labelKey, valueKey, multiple, customOption, defaultValue, createNewItem, loadNewItem, placeholder, emptyOptionContent = "No options", name, className, label, labelNext, required, errorText, hintsText, isError, inputClassName, id, onChange, engine, loadUrlItem, showClear = true, isTagMode = false, ...props}: WebSelectFieldProps) {
    const reactSelectRef = mmReactUseRef<any>(null);
    const [dynamicOptions, setDynamicOptions] = mmReactUseState<Record<string, MixType>[]>(() => {
        if (engine) {
            return engine.getSelectOptionCache(name)
        }
        return []
    })
    const [isLoading, setLoading] = mmReactUseState<boolean>(false)
    const [searchText, setSearchText] = mmReactUseState<any>('')
    const isInternalUpdateHappen = mmReactUseRef<boolean>(false);

    const {fieldRef, handleChange} = useFieldHelper<HTMLSelectElement>({name, defaultValue, engine, onChange})
    const {gridItemProps} = UICommonUtil.extractGridItemProps(props as Record<string, MixType>)


    mmReactUseEffect(() => {
        if (engine) {
            engine.setSelectOptionCache(name, dynamicOptions)
        }
    }, [dynamicOptions]);

    mmReactUseEffect(() => {
        if (loadUrlItem) {
            loadUrlItem().then((items: Record<string, MixType>[]) => {
                if (items) {
                    setDynamicOptions(items)
                }
            })
        }
    }, []);

    setSelectElementElementVirtualRef(fieldRef, {
        setValue: (value: FieldValueType) => {
            setSelectExistingValue(value)
        }
    })

    const selectOptions = mmReactUseMemo(() => {
        const uniqueMap = new Map();
        const formatOption = (item: Record<string, MixType>) => ({
            value: item[valueKey],
            label: customOption ? customOption(item, labelKey, valueKey, options) : String(item[labelKey]),
            raw: item
        });

        [...dynamicOptions, ...options].forEach(item => {
            if (item && item[valueKey] !== undefined) {
                uniqueMap.set(String(item[valueKey]), formatOption(item));
            }
        });
        return Array.from(uniqueMap.values());
    }, [dynamicOptions, options, valueKey, labelKey, customOption])

    const setSelectExistingValue = mmReactUseCallback((value: FieldValueType) => {
        isInternalUpdateHappen.current = true;
        const inputValue = engine ? engine.getFieldValue(name) : value
        if (!inputValue) {
            return multiple ? [] : undefined;
        }
        let processedValue: any = undefined
        if (multiple) {
            const valuesArray = Array.isArray(inputValue) ? inputValue : [inputValue];
            processedValue = selectOptions.filter(opt => valuesArray.includes(opt.value));
        } else {
            processedValue = selectOptions.find(opt => opt.value === inputValue) || undefined;
        }
        if (processedValue && reactSelectRef.current) {
            reactSelectRef.current.setValue(processedValue)
        }
    }, [multiple, defaultValue, name, engine, selectOptions])

    mmReactUseEffect(() => {
        if (selectOptions.length > 0) {
            const currentValue = engine ? engine.getFieldValue(name) : defaultValue;
            if (currentValue) {
                setSelectExistingValue(currentValue);
            }
        }
    }, [selectOptions, engine, name, defaultValue, setSelectExistingValue]);

    const onValueChange = mmReactUseCallback((newValue: SingleValue<any> | MultiValue<any>) => {
        if (isInternalUpdateHappen.current) {
            isInternalUpdateHappen.current = false
            return
        }

        let processedValue: any = "";
        let rawSelection: any = null;

        if (multiple) {
            const arr = newValue as MultiValue<any>;
            processedValue = arr.map(item => item.value);
            rawSelection = arr.map(item => item.raw);
        } else {
            const single = newValue as SingleValue<any>;
            processedValue = single ? single.value : "";
            rawSelection = single ? single.raw : null;
        }

        const event = {
            target: {name, value: processedValue} as HTMLSelectElement,
            currentTarget: {name, value: processedValue} as HTMLSelectElement,
            raw: rawSelection,
        } as unknown as MMReactChangeEvent<HTMLSelectElement>;
        handleChange(event);
    }, [name, multiple, handleChange])

    const onInputChange = mmReactUseCallback((inputValue: string) => {
        const trimmed = inputValue.trim();
        setSearchText(trimmed);

        if (loadNewItem && !isLoading && trimmed !== '') {
            let refinedSearchText = trimmed.toLowerCase();
            let willCall: boolean = !selectOptions.some((item: any) => (String(item?.[labelKey]).toLowerCase().includes(refinedSearchText)));
            if (!willCall) {
                return
            }
            loadNewItem((isLoading: boolean) => {
                setLoading(isLoading);
            }, (newOptions: Array<any>) => {
                setDynamicOptions(prev => [
                    ...prev,
                    ...newOptions
                ]);
                setLoading(false)
            })
        }

    }, [isLoading, loadNewItem])

    const getNoOptionsContent = mmReactUseCallback(() => {
        if (isTagMode) {
            return null
        }
        if (createNewItem) {
            return (
                <div className={"w-full cursor-pointer"} onClick={() => {
                    createNewItem(searchText, (newOptions: Array<any>) => {
                        setDynamicOptions(prev => [
                            ...prev,
                            ...newOptions
                        ]);
                    })
                }}>{emptyOptionContent}</div>
            )
        }
        return emptyOptionContent;
    }, [searchText, emptyOptionContent, createNewItem, isTagMode])


    const createNewTagModeSelectItem = mmReactUseCallback((event: any) => {
        if (!isTagMode) {
            return
        }
        if (event.key === 'Enter' || event.key === ',') {
            const trimmedSearch = searchText.trim();
            if (trimmedSearch && createNewItem) {
                event.preventDefault();
                createNewItem(trimmedSearch, (newOptions: Array<any>) => {
                    setDynamicOptions(prev => [...prev, ...newOptions])
                    const formattedNewOptions = newOptions.map(item => ({
                        value: item[valueKey],
                        label: customOption ? customOption(item, labelKey, valueKey, options) : String(item[labelKey]),
                        raw: item
                    }));
                    if (reactSelectRef.current) {
                        if (multiple) {
                            const currentSelection = reactSelectRef.current.getValue() || [];
                            reactSelectRef.current.setValue([...currentSelection, ...formattedNewOptions]);
                        } else {
                            if (formattedNewOptions.length > 0) {
                                reactSelectRef.current.setValue(formattedNewOptions[0]);
                            }
                        }
                    }
                    setSearchText('');
                });
            }
        }
    }, [isTagMode, searchText, createNewItem, multiple, valueKey, labelKey, customOption, options])

    const handleKeyDown = mmReactUseCallback((event: any) => {
        createNewTagModeSelectItem(event)
    }, [createNewTagModeSelectItem])

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
                <Select
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    menuPlacement="auto"
                    ref={reactSelectRef}
                    id={labelId}
                    isMulti={multiple}
                    isClearable={showClear}
                    isLoading={isLoading}
                    placeholder={placeholder ? placeholder : _t("Select an option")}

                    options={selectOptions}
                    onChange={onValueChange}
                    onInputChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    noOptionsMessage={getNoOptionsContent}
                    components={{ DropdownIndicator, ClearIndicator, MultiValueRemove, LoadingMessage }}
                    unstyled={true}
                    classNames={{
                        control: ({isFocused}) => mergeWind(
                            "flex min-h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                            isFocused && "border-muted-foreground/40 shadow-sm outline-none ring-0",
                            isError && "border-danger focus-within:ring-danger border-danger"
                        ),
                        valueContainer: () => "flex flex-wrap gap-1 items-center gap-1.5",
                        placeholder: () => "text-muted-foreground text-sm",
                        input: () => "text-foreground text-sm outline-none",
                        singleValue: () => "text-foreground text-sm",
                        multiValue: () => "flex items-center gap-1 rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground",
                        multiValueLabel: () => "truncate max-w-[100px]",
                        indicatorsContainer: () => "flex items-center gap-1 ml-auto text-muted-foreground",
                        menuPortal: () => "z-50",
                        menu: () => "mt-2 relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
                        menuList: () => "p-1 no-scrollbar max-h-72 overflow-y-auto overscroll-contain",
                        option: ({isSelected, isFocused}) => mergeWind(
                            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                            isFocused && "bg-accent text-accent-foreground cursor-pointer",
                            isSelected && "bg-accent text-accent-foreground font-medium"
                        ),
                        noOptionsMessage: () => "text-sm text-muted-foreground text-center py-2",
                        loadingMessage: () => "text-sm text-muted-foreground text-center py-2"
                    }}
                    styles={{
                        control: (base) => ({
                            ...base,
                            minHeight: '2rem',
                        }),
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 99999,
                            pointerEvents: 'auto'
                        }),
                    }}
                />
            )}/>
    )
}

const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
        <ChevronDownIcon className="h-4 w-4 opacity-50"/>
    </components.DropdownIndicator>
)

const ClearIndicator = (props: any) => (
    <components.ClearIndicator {...props}>
        <XIcon className="h-3 w-3 opacity-50 hover:opacity-100 transition-opacity"/>
    </components.ClearIndicator>
)

const MultiValueRemove = (props: any) => (
    <components.MultiValueRemove {...props}>
        <XIcon className="h-3 w-3 text-muted-foreground hover:text-foreground"/>
    </components.MultiValueRemove>
)

const LoadingMessage = (props: any) => {
    return (
        <components.LoadingMessage {...props}>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Loader size={"sm"} speed={1} icon={LoaderIcon}/>
                <span>{_t("Loading...")}</span>
            </div>
        </components.LoadingMessage>
    )
}


