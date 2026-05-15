import {SortDirection, WebTableGeneratorColumnProps, WebTableGeneratorProps} from "mmcore-ui";
import {DefaultTable, DefaultTBody, DefaultTD, DefaultTH, DefaultTHead, DefaultTR} from "./default-table";
import {mmReactUseCallback, mmReactUseRef, mmReactUseState, UINode} from "mmcore";
import {mergeWind} from "mfront-default-ui";
import {ArrowDownNarrowWide, ArrowDownUp, ArrowUpWideNarrow} from "lucide-react";

function SortableTH({sortable, headerContent, columnName, sortIcon, sortAscIcon, sortDescIcon, onClickSort, columnClassName, currentlySortingColumn}: WebTableGeneratorColumnProps & WebTableGeneratorProps & {currentlySortingColumn: string}) {
    const [sortDirection, setSortDirection] = mmReactUseState<string>("")

    if (!sortable) {
        return (<DefaultTH className={columnClassName}>{headerContent}</DefaultTH>)
    }

    const handleOnClickSort = mmReactUseCallback(() => {
        let _sortDirection: string = "asc";
        if (sortDirection === "asc") {
            _sortDirection = "desc"
        } else {
            _sortDirection = "asc"
        }

        setSortDirection(_sortDirection)
        if (onClickSort) {
            onClickSort(_sortDirection as SortDirection, columnName)
        }

    }, [sortDirection, currentlySortingColumn, onClickSort])

    const getSortIcon = mmReactUseCallback(() => {
        if (currentlySortingColumn !== columnName) {
            return sortIcon
        }

        if (sortDirection === "asc") {
            return sortAscIcon
        } else if (sortDirection === "desc") {
            return sortDescIcon
        }
        return sortIcon
    }, [sortDirection, currentlySortingColumn, onClickSort])


    return (
        <DefaultTH className={mergeWind("cursor-pointer", columnClassName)} onClick={handleOnClickSort}>
            <div className="flex items-center gap-1">
                <span>{getSortIcon()}</span>
                {headerContent}
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
        skipRenderedRow,
        ...props
    }: WebTableGeneratorProps) {
    const currentlySortingColumn = mmReactUseRef<string>("")

    const _sortIcon: UINode = sortIcon ?? <ArrowDownUp size={14}/>
    const _sortAscIcon: UINode = sortAscIcon ?? <ArrowDownNarrowWide size={14}/>
    const _sortDescIcon: UINode = sortDescIcon ?? <ArrowUpWideNarrow  size={14}/>

    const getTableBody = mmReactUseCallback(() => {
        if (isExternalRow) {
            return
        }

        const dataList: Record<string, UINode>[] = engine.dataList
        const columns: WebTableGeneratorColumnProps[] = engine.getColumns()
        return (
            <DefaultTBody>
                {dataList.map((row: Record<string, UINode>, index: number) => {
                    if (renderRow) {
                        return renderRow(row, dataList, columns, index)
                    }
                    return (
                        <DefaultTR key={index}>
                            {columns.map((column: WebTableGeneratorColumnProps, index: number) => {
                                if (column.isHidden) {
                                    return
                                }

                                let value: UINode = ""
                                if (row[column.columnName] !== undefined){
                                    value = row[column.columnName]
                                }

                                if (column.customize) {
                                    value = column.customize(row, dataList, column.columnName, column.headerContent)
                                }
                                return (
                                    <DefaultTD key={index} className={column.columnClassName}>
                                        {value}
                                    </DefaultTD>
                                )
                            })}
                        </DefaultTR>
                    )
                })}
            </DefaultTBody>
        )
    }, [engine.dataList])

    return (
        <div {...props}>
            <DefaultTable>
                <DefaultTHead>
                    <DefaultTR>
                        {engine.getColumns().map((column: WebTableGeneratorColumnProps, index: number) => {
                            if (column.isHidden) {
                                return
                            }

                            const key = `${index}`
                            return (
                                <SortableTH
                                    key={key}
                                    sortIcon={_sortIcon}
                                    sortAscIcon={_sortAscIcon}
                                    sortDescIcon={_sortDescIcon}
                                    headerContent={column.headerContent}
                                    sortable={column.sortable}
                                    columnName={column.columnName}
                                    engine={engine}
                                    onClickSort={(sortDirection: SortDirection, columnName: string) => {
                                        currentlySortingColumn.current = columnName
                                        if (onClickSort) {
                                            onClickSort(sortDirection, columnName)
                                        }
                                    }}
                                    columnClassName={column.columnClassName}
                                    currentlySortingColumn={currentlySortingColumn.current}
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