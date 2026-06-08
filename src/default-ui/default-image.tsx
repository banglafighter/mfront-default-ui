import {WebImageProps} from "mmcore-ui";
import {makeClassVariance, mergeWind} from "../common/tailwind-utils";
import {mmReactUseEffect, mmReactUseState} from "mmcore";

const imageVariations = makeClassVariance(
    "aspect-square object-cover",
    {
        variants: {
            shape: {
                circle: "rounded-full",
                rounded: "rounded-lg",
                square: "rounded-none",
            }
        }
    }
)

const imageWrapperVariations = makeClassVariance(
    "flex shrink-0 relative",
    {
        variants: {
            avatar: {
                default: "size-8",
                small: "size-6",
                medium: "size-10",
                large: "size-12",
            },
            thumb: {
                card: "w-[150px] h-[150px]",
                blog: "w-[320px] h-[180px]",
                gallery: "w-[200px] h-[200px]",
                product: "w-[300px] h-[300px]",
            }
        }
    }
)

function getPlaceholder(text: string, width = 400, height = 400) {
    const fontSize = Math.floor(
        Math.min(width, height) * 0.4
    );

    const svg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    viewBox="0 0 ${width} ${height}"
  >
    <rect
      width="100%"
      height="100%"
      fill="#e2e8f0"
    />

    <foreignObject
      width="100%"
      height="100%"
    >
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style="
          width:100%;
          height:100%;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:${fontSize}px;
          font-family:sans-serif;
          color:#94a3b8;
          font-weight:600;
          line-height:1;
        "
      >
        ${text}
      </div>
    </foreignObject>
  </svg>  `
        .replace(/\n/g, "")
        .replace(/"/g, "'");
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}


export function DefaultImage({className, src, alt, loading = "lazy", decoding = "async", ratio, height, width, shape = "rounded", fallbackSrc, fallback, isDirectLoading, avatar, thumb, ...props}: WebImageProps) {
    const [onLoading, setOnLoading] = mmReactUseState(true)

    const style: Record<string, any> = {}
    if (ratio) {
        style.aspectRatio = ratio
    }

    mmReactUseEffect(() => {
        if (!isDirectLoading) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                setOnLoading(false);
            };
            img.src = src;
        }
    }, [src]);

    const getImageSource = () => {
        if (isDirectLoading) {
            return src
        }
        const placeholder = fallbackSrc ? fallbackSrc : getPlaceholder(fallback || "")
        return onLoading ? placeholder : src
    }

    const getSizeClass = () => {
        if (!height && !width) {
            return "size-full"
        }
        return ""
    }

    return (
        <span className={mergeWind(imageWrapperVariations({avatar, thumb}), className)}>
            <img
                loading={loading}
                src={getImageSource()}
                alt={alt}
                decoding={decoding}
                style={style}
                height={height}
                width={width}
                className={mergeWind(
                    imageVariations({shape}),
                    getSizeClass(),
                )}
            />
        </span>
    )
}