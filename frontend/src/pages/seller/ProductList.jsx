// src/pages/seller/ProductList.jsx
import React from 'react'
import { useAppContext } from '../../context/AppContext.jsx'
import { assets } from '../../assets/assets.js'
import toast from 'react-hot-toast'

function ProductList() {
  // Safe defaults so we never crash if context isn't populated yet
  const {
    products = [],
    currency = '$',
    axios,
    fetchProducts,
  } = useAppContext() || {}

  const toggleStock = async (id, inStock) => {
    try {
      if (!axios) {
        toast.error('Backend not available yet')
        return
      }
      const { data } = await axios.post('/api/product/stock', { id, inStock })
      if (data?.success) {
        toast.success(data.message || 'Updated')
        typeof fetchProducts === 'function' && fetchProducts()
      } else {
        toast.error(data?.message || 'Failed to update stock')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Failed to update stock')
    }
  }

  const deleteProduct = async (id) => {
    try {
      if (!axios) return toast.error('Backend not available yet')
      const { data } = await axios.delete(`/api/product/${id}`)
      if (data?.success) {
        toast.success('Deleted')
        typeof fetchProducts === 'function' && fetchProducts()
      } else {
        toast.error(data?.message || 'Failed to delete')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Failed to delete')
    }
  }

  const hasProducts = Array.isArray(products) && products.length > 0

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <div className="flex items-center justify-between">
          <h2 className="pb-4 text-lg font-medium">All Products</h2>
          {!hasProducts && <span className="text-sm text-gray-500">0 items</span>}
        </div>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>

            {hasProducts ? (
              <tbody className="text-sm text-gray-600">
                {products.map((product, i) => {
                  const imgSrc =
                    product?.images?.[0] ??
                    product?.image?.[0] ??
                    assets?.upload_area /* small placeholder you already have */

                  return (
                    <tr key={product?._id || i} className="border-t border-gray-500/20">
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <div className="border border-gray-300 rounded overflow-hidden w-16 h-16 bg-gray-50">
                          {imgSrc ? (
                            <img src={imgSrc} alt="Product" className="w-16 h-16 object-cover" />
                          ) : null}
                        </div>
                        <span className="truncate max-sm:hidden w-full">
                          {product?.name || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{product?.category || '—'}</td>
                      <td className="px-4 py-3 max-sm:hidden">
                        {currency}
                        {product?.offerPrice ?? product?.price ?? 0}
                      </td>
                      <td className="px-4 py-3">
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!product?.inStock}
                            onChange={() => toggleStock(product?._id, !product?.inStock)}
                            disabled={!axios || typeof fetchProducts !== 'function'}
                          />
                          <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="px-3 py-1.5 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-sm"
                          onClick={() => deleteProduct(product?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={4} className="p-8">
                    <div className="flex flex-col items-center justify-center text-center text-gray-600">
                      <img src={assets.box_icon} alt="empty" className="w-12 h-12 opacity-60 mb-3" />
                      <p className="text-base font-medium">No products yet</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Start your backend or add a product to see it here.
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <a
                          href="/seller"
                          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Add Product
                        </a>
                        <button
                          className="px-4 py-2 rounded border hover:bg-gray-50"
                          onClick={() => {
                            if (typeof fetchProducts === 'function') fetchProducts()
                            else toast('fetchProducts not available yet')
                          }}
                        >
                          Refresh
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductList
