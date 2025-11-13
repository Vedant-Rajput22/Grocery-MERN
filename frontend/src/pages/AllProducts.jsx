import React, { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard.jsx'

const AllProducts = () => {
  const ctx = useAppContext?.()
  const products = Array.isArray(ctx?.products) ? ctx.products : []
  const searchQuery = typeof ctx?.searchQuery === 'string' ? ctx.searchQuery : ''
  const allTags = useMemo(() => {
    const set = new Set()
    products.forEach(p => (p?.tags || []).forEach(t => set.add(t)))
    return Array.from(set)
  }, [products])

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedTags, setSelectedTags] = useState([])
  const [sortMode, setSortMode] = useState('relevance')

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase()
    let list = products
    if (q) list = list.filter(p => (p?.name ?? '').toLowerCase().includes(q))
    if (selectedTags.length) {
      const tagSet = new Set(selectedTags.map(t => t.toLowerCase()))
      list = list.filter(p => (p?.tags || []).some(t => tagSet.has(String(t).toLowerCase())))
    }
    if (sortMode === 'price-asc') list = [...list].sort((a,b)=> (a.offerPrice ?? a.price ?? 0) - (b.offerPrice ?? b.price ?? 0))
    if (sortMode === 'price-desc') list = [...list].sort((a,b)=> (b.offerPrice ?? b.price ?? 0) - (a.offerPrice ?? a.price ?? 0))
    if (sortMode === 'tag-match') list = [...list].sort((a,b)=> ((b.tags||[]).filter(t=>selectedTags.includes(t)).length) - ((a.tags||[]).filter(t=>selectedTags.includes(t)).length))
    setFilteredProducts(list)
  }, [products, searchQuery, selectedTags, sortMode])

  const visible = useMemo(
    () => filteredProducts.filter(p => !!p?.inStock),
    [filteredProducts]
  )

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-green-600/40 rounded-full"></div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTags(s => s.includes(tag) ? s.filter(t=>t!==tag) : [...s, tag])}
              className={`px-3 py-1 rounded-full text-sm border ${selectedTags.includes(tag) ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button onClick={()=>setSelectedTags([])} className="ml-2 text-sm text-green-700 underline">Clear</button>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">Sort by:</span>
          <select value={sortMode} onChange={e=>setSortMode(e.target.value)} className="border border-gray-300 rounded px-2 py-1">
            <option value="relevance">Relevance</option>
            <option value="tag-match">Best tag match</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <span className="text-gray-500 ml-auto">Showing {visible.length} of {filteredProducts.length} matches</span>
        </div>
      </div>

      <div className="grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6 ">
        {visible.map((product, idx) => (
          <div key={product?._id ?? idx} className="force-compact">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts
