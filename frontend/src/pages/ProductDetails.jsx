import React, { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { assets } from '../assets/assets'

const ProductDetails = () => {
  let ctx = {}
  try { ctx = useAppContext() || {} } catch { ctx = {} }
  const { products = [], navigate, addToCart = () => {} } = ctx

  const { id } = useParams()
  const product = useMemo(
    () => (Array.isArray(products) ? products.find(item => item?._id === id) : undefined),
    [products, id]
  )

  // Normalize images into an array
  const imagesArray = useMemo(() => {
    if (!product) return []
    if (Array.isArray(product.images)) return product.images.filter(Boolean)
    if (Array.isArray(product.image)) return product.image.filter(Boolean)
    if (typeof product.image === 'string' && product.image.trim()) return [product.image.trim()]
    return []
  }, [product])

  const [relatedProducts, setRelatedProducts] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [footprint, setFootprint] = useState(null)
  const { axios } = useAppContext()

  useEffect(() => {
    if (product && Array.isArray(products) && products.length > 0) {
      const sameCat = products.filter((item) => item?.category === product?.category && item?._id !== product?._id)
      setRelatedProducts(sameCat.slice(0, 5))
    } else {
      setRelatedProducts([])
    }
  }, [product, products])

  useEffect(() => {
    setThumbnail(imagesArray[0] ?? assets.upload_area)
  }, [imagesArray])

  useEffect(() => {
    const fetchFootprint = async () => {
      try {
        if (!product?._id) return
        const { data } = await axios.get(`/api/product/${product._id}/footprint`)
        if (data?.success) setFootprint(data.kgCO2e)
      } catch {}
    }
    fetchFootprint()
  }, [product?._id])

  if (!product) {
    return (
      <div className="mt-12">
        <p className="text-gray-600">Product not found.</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          onClick={() => (typeof navigate === 'function' ? navigate('/products') : null)}
        >
          Back to products
        </button>
      </div>
    )
  }

  const rating = 4 // hardcoded
  const category = (product?.category ?? 'Products').toString()
  const categorySlug = category.toLowerCase()
  const name = product?.name ?? 'Untitled'

  const price = Number(product?.price ?? 0)
  const offerPrice = Number(product?.offerPrice ?? price)

  // Description can be array or single string (split on newline)
  const descriptionList = Array.isArray(product?.description)
    ? product.description
    : typeof product?.description === 'string'
      ? product.description.split('\n').filter(Boolean)
      : []

  const goToProducts = () => {
    if (typeof navigate === 'function') {
      navigate('/products')
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') window.scrollTo(0, 0)
    }
  }

  return (
    <div className="mt-12">
      <p>
        <Link to="/">Home</Link> /
        <Link to="/products"> Products</Link> /
        <Link to={`/products/${categorySlug}`}> {category}</Link> /
        <span className="text-[var(--color-green-600)]"> {name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Left: images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {imagesArray.map((img, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setThumbnail(img)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-[400px] rounded overflow-hidden">
            {thumbnail ? (
              <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
            ) : (
              <div className="w-[320px] h-[320px] flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Right: details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5).fill('').map((_, i) =>
              rating > i ? (
                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                    fill="currentColor" className="text-yellow-500" />
                </svg>
              ) : (
                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                    fill="currentColor" className="text-yellow-500/40" />
                </svg>
              )
            )}
            <p className="text-base ml-2">({rating})</p>
          </div>

          {/* Pricing */}
          <div className="mt-6">
            {price > offerPrice ? (
              <>
                <p className="text-gray-500/70 line-through">MRP: ${price}</p>
                <p className="text-2xl font-medium">Price: ${offerPrice}</p>
              </>
            ) : (
              <p className="text-2xl font-medium">Price: ${price}</p>
            )}
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {descriptionList.length > 0
              ? descriptionList.map((desc, index) => <li key={index}>{desc}</li>)
              : <li>No description provided.</li>}
          </ul>

          {Array.isArray(product?.tags) && product.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-green-600/10 text-green-700 border border-green-600/30 text-xs">{t}</span>
              ))}
            </div>
          )}

          {footprint != null && (
            <div className="mt-6 text-gray-700">
              <p className="text-sm">Estimated CO₂ footprint per unit</p>
              <p className="text-xl font-semibold text-green-700">{footprint} kg CO₂e</p>
            </div>
          )}

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product?._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product?._id)
                if (typeof navigate === 'function') {
                  navigate('/cart')
                  if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') window.scrollTo(0, 0)
                }
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-[var(--color-green-600)] text-white hover:bg-[var(--color-green-600-hover)] transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-green-600 rounded-full mt-2"></div>
        </div>

        <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 w-full">
          {relatedProducts.filter((p) => p?.inStock).map((p, i) => (
            <div key={p?._id ?? i} className="force-compact">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <button
          onClick={goToProducts}
          className="mt-5 mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-green-600 hover:bg-green-600/10 transition"
        >
          See More
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
