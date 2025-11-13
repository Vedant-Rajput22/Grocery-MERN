import React from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const BestSellers = () => {
  const { products = [] } = useAppContext()
  const top = products.slice(0, 12)
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-green-700">Best Sellers</h1>
      <div className="grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
        {top.map((p, i) => (
          <div key={p?._id ?? i} className="force-compact">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestSellers

