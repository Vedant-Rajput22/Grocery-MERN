import React from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const Offers = () => {
  const { products = [] } = useAppContext()
  const discounted = products.filter(p => (p.offerPrice ?? p.price) < (p.price ?? p.offerPrice)).slice(0, 24)
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-green-700">Offers & Deals</h1>
      <div className="grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
        {discounted.map((p, i) => (
          <div key={p?._id ?? i} className="force-compact">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Offers

