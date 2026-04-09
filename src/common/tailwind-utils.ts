import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {cva as makeClassVariance} from "class-variance-authority"

export {
    makeClassVariance
}


export function mergeWind(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
