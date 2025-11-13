import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  // Guard against missing provider / values
  let ctx = {};
  try { ctx = useAppContext() || {}; } catch { ctx = {}; }

  const {
    addToCart = () => {},
    removeFromCart = () => {},
    cartItems = {},
    navigate,                // may be undefined
    currency = "$",
  } = ctx;

  if (!product) return null;

  // Safe category + route
  const categorySlug = (product?.category ?? "misc").toString().toLowerCase();
  const productId = product?._id ?? "";

  // Robust image selection: handles images[], image[], image (string), or fallback
  const imgSrc =
    (Array.isArray(product?.images) && product.images[0]) ? product.images[0] :
    (Array.isArray(product?.image)  && product.image[0])  ? product.image[0]  :
    (typeof product?.image === "string" && product.image) ? product.image     :
    assets?.upload_area;

  // Prices (numbers; with fallback)
  const listPrice   = Number(product?.price ?? 0);
  const discounted  = Number(product?.offerPrice ?? listPrice);

  const handleCardClick = () => {
    if (typeof navigate === "function" && productId) {
      navigate(`/products/${categorySlug}/${productId}`);
      // Avoid crashing on servers/SSR; scrollTo exists in browsers
      if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
        window.scrollTo(0, 0);
      }
    }
  };

  const inCartQty = cartItems[productId] ?? 0;

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") handleCardClick(); }}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
    >
      <div className="group cursor-pointer flex items-center justify-center px-2">
        {imgSrc ? (
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36 object-contain"
            src={imgSrc}
            alt={product?.name || "Product"}
            loading="lazy"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-100" />
        )}
      </div>

      <div className="text-gray-500/60 text-sm">
        <p>{product?.category ?? 'Misc'}</p>

        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product?.name ?? "Untitled"}
        </p>

        {Array.isArray(product?.tags) && product.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {product.tags.slice(0,3).map((t, i) => (
              <span key={i} className="px-2 py-0.5 text-[11px] rounded-full bg-green-600/10 text-green-700 border border-green-600/30">{t}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-0.5" aria-label="Product rating">
          {Array(5).fill("").map((_, i) => (
            <img
              key={i}
              className="md:w-3.5 w-3"
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt={i < 4 ? "star" : "star (empty)"}
              loading="lazy"
            />
          ))}
          <p>(4)</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-[var(--color-green-600)]">
            {currency}{discounted}{" "}
            {listPrice > discounted && (
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}{listPrice}
              </span>
            )}
          </p>

          {/* Stop click bubbling so buttons don't trigger card navigation */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="text-[var(--color-green-600)]"
          >
            {!inCartQty ? (
              <button
                type="button"
                className="flex items-center justify-center gap-1 bg-green-100 hover:bg-green-200 border border-green-300 md:w-[80px] w-[64px] h-[34px] rounded text-green-700 font-medium transition"
                onClick={() => productId && addToCart(productId)}
              >
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  xmlns="http://www.w3.org/2000/svg" className="text-green-700"
                >
                  <path
                    d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-green-600/25 rounded select-none">
                <button
                  type="button"
                  onClick={() => productId && removeFromCart(productId)}
                  className="cursor-pointer text-md px-2 h-full"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-5 text-center">{inCartQty}</span>
                <button
                  type="button"
                  onClick={() => productId && addToCart(productId)}
                  className="cursor-pointer text-md px-2 h-full"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
