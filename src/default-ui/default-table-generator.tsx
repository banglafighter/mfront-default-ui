import {SortDirection, WebTableGeneratorColumnProps, WebTableGeneratorProps} from "mmcore-ui";
import {DefaultTable, DefaultTBody, DefaultTD, DefaultTH, DefaultTHead, DefaultTR} from "./default-table";
import {MmReactFragment, mmReactUseState, UINode} from "mmcore";
import {mergeWind} from "mfront-default-ui";
import {ArrowDownNarrowWide, ArrowDownUp, ArrowUpWideNarrow} from "lucide-react";


function SortableTH({sortable, label, name, sortIcon, sortAscIcon, sortDescIcon, onClickSort, columnClassName, sortDirection}: WebTableGeneratorColumnProps & WebTableGeneratorProps & {sortDirection?: SortDirection}) {

    if (!sortable) {
        return (<DefaultTH className={columnClassName}>{label}</DefaultTH>)
    }

    const handleOnClickSort = () => {
        let _sortDirection: SortDirection = "asc";
        if (sortDirection === "asc") {
            _sortDirection = "desc"
        } else {
            _sortDirection = "asc"
        }

        if (onClickSort) {
            onClickSort(_sortDirection, name)
        }
    }

    const getSortIcon = () => {
        if (sortDirection === "asc") {
            return sortAscIcon
        } else if (sortDirection === "desc") {
            return sortDescIcon
        }
        return sortIcon
    }


    return (
        <DefaultTH className={mergeWind("cursor-pointer", columnClassName)} onClick={handleOnClickSort}>
            <div className="flex items-center gap-1">
                <span>{getSortIcon()}</span>
                {label}
            </div>
        </DefaultTH>
    )

}


export function DefaultTableGenerator(
    {
        engine,
        enablePagination,
        onChangeItemPerPage,
        onChangePagination,
        itemPerPageOptions,
        onClickSort,
        sortIcon,
        sortAscIcon,
        sortDescIcon,
        isExternalRow,
        renderRow,
        rowWrapper,
        skipRenderedRow,
        externalRowWrapperClassName,
        ...props
    }: WebTableGeneratorProps) {
    const [sortingState, setSortingState] = mmReactUseState<{column: string, direction: SortDirection} | null>(null)

    const _sortIcon: UINode = sortIcon ?? <ArrowDownUp size={14}/>
    const _sortAscIcon: UINode = sortAscIcon ?? <ArrowDownNarrowWide size={14}/>
    const _sortDescIcon: UINode = sortDescIcon ?? <ArrowUpWideNarrow size={14}/>

    const renderExternalRow = () => {
        if (!isExternalRow || !renderRow) {
            return
        }
        const dataList: Record<string, UINode>[] = engine.dataList
        const columns: WebTableGeneratorColumnProps[] = engine.getColumns()
        return (
            <div className={externalRowWrapperClassName}>
                {dataList.map((row: Record<string, UINode>, index: number) => {
                    return (
                        <MmReactFragment key={index}>
                            {renderRow(row, dataList, columns, index)}
                        </MmReactFragment>
                    )
                })}
            </div>
        )
    }

    const getTableBody = () => {
        if (isExternalRow) {
            return
        }

        const dataList: Record<string, UINode>[] = engine.dataList
        const columns: WebTableGeneratorColumnProps[] = engine.getColumns()
        return (
            <DefaultTBody>
                {dataList.map((row: Record<string, UINode>, index: number) => {
                    if (renderRow) {
                        return (
                            <MmReactFragment key={index}>
                                {renderRow(row, dataList, columns, index)}
                            </MmReactFragment>
                        )
                    }

                    const tableRow = (
                        <DefaultTR>
                            {columns.map((column: WebTableGeneratorColumnProps, index: number) => {
                                if (column.isHidden) {
                                    return
                                }

                                let value: UINode = ""
                                if (row[column.name] !== undefined){
                                    value = row[column.name]
                                }

                                if (column.customize) {
                                    value = column.customize(row, dataList, column.name, column.label)
                                }
                                return (
                                    <DefaultTD key={column.name || index} className={column.columnClassName}>
                                        {value}
                                    </DefaultTD>
                                )
                            })}
                        </DefaultTR>
                    )

                    return (
                        <MmReactFragment key={index}>
                            {rowWrapper
                                ? rowWrapper(row, index, tableRow)
                                : tableRow
                            }
                        </MmReactFragment>
                    )
                })}
            </DefaultTBody>
        )
    }

    return (
        <div {...props}>
            <DefaultTable containerContent={renderExternalRow()}>
                <DefaultTHead>
                    <DefaultTR>
                        {engine.getColumns().map((column: WebTableGeneratorColumnProps, index: number) => {
                            if (column.isHidden) {
                                return
                            }

                            const key = column.name || `${index}`
                            const sortDirection = sortingState?.column === column.name
                                ? sortingState.direction
                                : undefined

                            return (
                                <SortableTH
                                    key={key}
                                    sortIcon={_sortIcon}
                                    sortAscIcon={_sortAscIcon}
                                    sortDescIcon={_sortDescIcon}
                                    label={column.label}
                                    sortable={column.sortable}
                                    name={column.name}
                                    engine={engine}
                                    onClickSort={(sortDirection: SortDirection, columnName: string) => {
                                        setSortingState({
                                            column: columnName,
                                            direction: sortDirection
                                        })
                                        if (onClickSort) {
                                            onClickSort(sortDirection, columnName)
                                        }
                                    }}
                                    columnClassName={column.columnClassName}
                                    sortDirection={sortDirection}
                                />
                            )
                        })}
                    </DefaultTR>
                </DefaultTHead>
                {!skipRenderedRow ? getTableBody() : ""}
            </DefaultTable>
        </div>
    )
}