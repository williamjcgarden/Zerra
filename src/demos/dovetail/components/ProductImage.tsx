import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./LogoMark";
import type { Product } from "@/demos/dovetail/data/nocturn";
export function ProductImage({
  product,
  eager = false,
  sizes = "(max-width: 639px) 46vw, (max-width: 1023px) 45vw, 30vw",
}: {
  product: Product;
  eager?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // An SSR image can fail before React attaches its error listener.
    if (image.current?.complete && image.current.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed)
    return (
      <div
        className="image-unavailable"
        role="img"
        aria-label={`${product.name}, image unavailable`}
      >
        <LogoMark />
        <span>Image unavailable</span>
      </div>
    );
  return (
    <img
      ref={image}
      src={product.image}
      srcSet={`${product.imageSmall} 480w, ${product.image} ${product.imageWidth}w`}
      sizes={sizes}
      alt={`${product.name} in ${product.colorways[0].name}`}
      width={960}
      height={1200}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
