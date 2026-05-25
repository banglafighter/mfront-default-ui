import {itemPerPageDefaultOptions, WebPaginationProps} from "mmcore-ui";
import {mergeWind} from "mfront-default-ui";
import {MmReactFragment, mmReactUseEffect, mmReactUseMemo, mmReactUseState, UINode} from "mmcore";
import {DefaultButtonGroup} from "./default-button-group";
import {DefaultButton} from "./default-button";
import {ArrowBigLeft, ArrowBigRight, Ellipsis} from "lucide-react";
import {DefaultSelectField} from "./default-select-field";

const PAGE_DOTS = "...";

export function DefaultPagination({className, currentPage, totalPage, itemPerPage, previousIcon, nextIcon, onChangeItemPerPage, itemPerPageOptions, onChangePagination, siblingCount = 1, ellipsisIcon, ...props}: WebPaginationProps) {
    const [_currentPage, _setCurrentPage] = mmReactUseState(currentPage)
    const [_itemPerPage, _setItemPerPage] = mmReactUseState(itemPerPage)

    mmReactUseEffect(() => {
        _setCurrentPage(currentPage);
    }, [currentPage]);

    mmReactUseEffect(() => {
        _setItemPerPage(itemPerPage);
    }, [itemPerPage]);

    const range = (start: number, end: number) => {
        return Array.from(
            {length: end - start + 1},
            (_, index) => start + index
        );
    };

    const paginationItems = mmReactUseMemo(() => {
        const totalVisiblePages = siblingCount + 5;

        if (totalVisiblePages >= totalPage) {
            return range(1, totalPage);
        }

        const leftSibling = Math.max(currentPage - siblingCount, 1);
        const rightSibling = Math.min(
            currentPage + siblingCount,
            totalPage
        );

        const showLeftDots = leftSibling > 2;
        const showRightDots = rightSibling < totalPage - 2;

        // Left side only
        if (!showLeftDots && showRightDots) {
            const leftRange = range(1, 3 + siblingCount * 2);

            return [...leftRange, PAGE_DOTS, totalPage];
        }

        // Right side only
        if (showLeftDots && !showRightDots) {
            const rightRange = range(
                totalPage - (3 + siblingCount * 2) + 1,
                totalPage
            );

            return [1, PAGE_DOTS, ...rightRange];
        }

        // Both side dots
        if (showLeftDots && showRightDots) {
            const middleRange = range(leftSibling, rightSibling);

            return [
                1,
                PAGE_DOTS,
                ...middleRange,
                PAGE_DOTS,
                totalPage,
            ];
        }
        return [];
    }, [currentPage, siblingCount, totalPage]);

    const renderButton = (label: UINode, page: number, disabled = false, active = false) => {
        return (
            <DefaultButton
                variant={active ? "primary" : "outline"}
                className={mergeWind("h-8", "cursor-pointer")}
                disabled={disabled || active}
                onClick={() => {
                    if (!disabled && !active && onChangePagination) {
                        onChangePagination(page)
                    }
                }}
            >
                {label}
            </DefaultButton>
        );
    };

    if (totalPage <= 1) {
        return null;
    }

    let _nextIcon: UINode = nextIcon
    if (!_nextIcon) {
        _nextIcon = (<ArrowBigLeft/>)
    }

    let _previousIcon: UINode = previousIcon
    if (!_previousIcon) {
        _previousIcon = (<ArrowBigRight/>)
    }

    let _ellipsisIcon: UINode = ellipsisIcon
    if (!_ellipsisIcon) {
        _ellipsisIcon = (<Ellipsis/>)
    }

    return (
        <div className={mergeWind("flex gap-2", className)} {...props}>
            <DefaultSelectField
                options={itemPerPageOptions ? itemPerPageOptions : itemPerPageDefaultOptions}
                labelKey={"label"}
                valueKey={"value"}
                name={"country"}
                className={"w-15"}
                showClear={false}
            />
            <DefaultButtonGroup orientation={"horizontal"} className={"h-8"}>
                {_currentPage > 1 && renderButton(_nextIcon, _currentPage - 1)}
                {paginationItems.map((page: number | string, index: number) =>
                    <MmReactFragment key={index}>
                        {renderButton(
                            page !== PAGE_DOTS ? page : _ellipsisIcon,
                            Number(page),
                            page === PAGE_DOTS,
                            page === currentPage)
                        }
                    </MmReactFragment>
                )}
                {_currentPage < totalPage && renderButton(_previousIcon, _currentPage + 1)}
            </DefaultButtonGroup>
        </div>
    )
}


