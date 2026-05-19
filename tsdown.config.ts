import {defineConfig} from 'tsdown'
import {baseConfig} from '../../tsdown.base.mjs'

export default defineConfig({
    ...baseConfig,
    entry: ['src/index.ts'],
    outDir: 'dist',

    deps: {
        alwaysBundle: [
            /^@radix-ui\//,

            "clsx",
            "tailwind-merge",
            "class-variance-authority",

            "date-fns",
            "@date-fns/tz",

            "react-day-picker",
            "react-dropzone",
            "react-toastify",

            "attr-accept",
            "file-selector",
            "object-assign",
            "prop-types",
            "react-is",
            "tw-animate-css",
            "use-sync-external-store",
            "reselect",
            "aria-hidden",
            "react-remove-scroll",
            "tslib",
            "use-sidecar",
            "react-style-singleton",
            "get-nonce",
            "use-callback-ref",
            "detect-node-es"
        ]
    }

})