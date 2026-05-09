import {WebSelectFieldProps} from "mmcore-ui";
import {MixType, mmReactUseMemo, mmReactUseState} from "mmcore";
// import { Combobox as BasicUICombobox } from "@base-ui/react"

const ComboboxPrimitive = BasicUICombobox.Root


export function DefaultSelectField({options, labelKey, valueKey, multiple, customOption, defaultValue, createNewItem, loadNewItem, placeholder, emptyOptionContent = "List is empty", ...props}: WebSelectFieldProps) {
    const [value, setValue] = mmReactUseState<Record<string, MixType>[]>([])
    const [dynamicOptions, setDynamicOptions] = mmReactUseState<Record<string, MixType>[]>([])
    const [showEmptyOption, setShowEmptyOption] = mmReactUseState<boolean>(true)
    const [isLoading, setLoading] = mmReactUseState<boolean>(false)
    const [searchText, setSearchText] = mmReactUseState('')


    const mergedItems = mmReactUseMemo(() => {
        const map = new Map();
        [...dynamicOptions, ...options].forEach(item => {
            map.set(item[valueKey], item);
        });
        return Array.from(map.values());
    }, [dynamicOptions, options, valueKey]);

    const selectedItemSet = mmReactUseMemo(() => {
        return new Set((Array.isArray(value) ? value : []).map(v => v[valueKey]));
    }, [value, valueKey]);

    // const getSingleInput = () => {
    //     return (<ComboboxInput placeholder={placeholder} showClear={true}/>)
    // }


    return (
        <></>
    )
}