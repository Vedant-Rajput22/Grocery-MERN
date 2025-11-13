import React from 'react'

const Sustainability = () => {
  return (
    <div className="mt-12 pb-16 max-w-4xl">
      <h1 className="text-3xl font-semibold text-green-700">Sustainability at EcoGrocery</h1>
      <p className="mt-4 text-gray-700">
        We are committed to helping you shop better for the planet. Look for tags like
        Local, Plastic Free, Organic, High Protein and Sugar Free. These highlight products
        with reduced packaging, shorter supply chains, and better nutritional balance.
      </p>
      <h2 className="text-2xl font-semibold mt-8">Carbon Footprint Estimates</h2>
      <p className="mt-2 text-gray-700">
        On each product page you’ll find an estimated CO₂e footprint per unit. These are heuristic
        estimates based on product category and tags (e.g., Local and Plastic Free often reduce emissions).
        As we expand, we’ll integrate verified Life Cycle Assessment (LCA) data.
      </p>
      <h2 className="text-2xl font-semibold mt-8">How You Can Help</h2>
      <ul className="mt-2 text-gray-700 list-disc ml-5">
        <li>Prefer local and seasonal products</li>
        <li>Choose plastic-free or reusable packaging</li>
        <li>Consolidate orders to reduce deliveries</li>
        <li>Try plant-forward alternatives where possible</li>
      </ul>
    </div>
  )
}

export default Sustainability

