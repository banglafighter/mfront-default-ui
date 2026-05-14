import {WebTableGeneratorProps} from "mmcore-ui";
import {DefaultTable, DefaultTBody, DefaultTHead} from "./default-table";



export function DefaultTableGenerator({engine, enablePagination, onChangeItemPerPage, onChangePagination, itemPerPageOptions, onClickSort, ...props}: WebTableGeneratorProps) {
    return (
        <div {...props}>
            <DefaultTable>
                <DefaultTHead></DefaultTHead>
                <DefaultTBody></DefaultTBody>
            </DefaultTable>
        </div>
    )
}