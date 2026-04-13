import {WebGridItemProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "../common/tailwind-utils";

const gridItemVariants = makeClassVariance(
    "",
    {
        variants: {
            colSpan: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx", "full": "xxxx"},
            rowSpan: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx", "full": "xxxx"},
            colStart: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            colEnd: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            rowStart: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            rowEnd: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},

            colSpanMob: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx", "full": "xxxx"},
            colSpanTab: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx", "full": "xxxx"},
            colSpanLarge: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx", "full": "xxxx"},

            rowSpanMob: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx", "full": "xxxx"},
            rowSpanTab: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx", "full": "xxxx"},
            rowSpanLarge: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx", "full": "xxxx"},

            colStartMob: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            colStartTab: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            colStartLarge: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},

            colEndMob: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            colEndTab: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            colEndLarge: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},

            rowStartMob: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            rowStartTab: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            rowStartLarge: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},

            rowEndMob: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            rowEndTab: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
            rowEndLarge: {1: "xxx", 2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx", 11: "xxx", 12: "xxx"},
        }
    }
)

export function DefaultGridItem({className,
                                    colSpan,
                                    rowSpan,
                                    colStart,
                                    colEnd,
                                    rowStart,
                                    rowEnd,
                                    colSpanMob,
                                    colSpanTab,
                                    colSpanLarge,
                                    rowSpanMob,
                                    rowSpanTab,
                                    rowSpanLarge,
                                    colStartMob,
                                    colStartTab,
                                    colStartLarge,
                                    colEndMob,
                                    colEndTab,
                                    colEndLarge,
                                    rowStartMob,
                                    rowStartTab,
                                    rowStartLarge,
                                    rowEndMob,
                                    rowEndTab,
                                    rowEndLarge,
                                    ...props}: WebGridItemProps) {
    const GridItemTag = "div"
    return (
        <GridItemTag
            className={mergeWind(gridItemVariants({
                colSpan,
                rowSpan,
                colStart,
                colEnd,
                rowStart,
                rowEnd,
                colSpanMob,
                colSpanTab,
                colSpanLarge,
                rowSpanMob,
                rowSpanTab,
                rowSpanLarge,
                colStartMob,
                colStartTab,
                colStartLarge,
                colEndMob,
                colEndTab,
                colEndLarge,
                rowStartMob,
                rowStartTab,
                rowStartLarge,
                rowEndMob,
                rowEndTab,
                rowEndLarge,
                className}))}
            {...props}
        />
    )
}