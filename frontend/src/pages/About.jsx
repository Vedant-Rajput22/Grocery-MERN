import React from 'react'
import { assets } from '../assets/assets'

const Pill = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-green-600/10 text-green-700 border border-green-600/30 text-xs">
    {children}
  </span>
)

const About = () => {
  return (
    <div className="mt-12 pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-white to-green-100 border border-green-200">
        <div className="p-10 md:p-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">About EcoGrocery</h1>
          <p className="mt-4 max-w-2xl text-gray-700 text-lg">
            We’re on a mission to make everyday groceries better for you and the planet—
            prioritizing fresh, local, and low‑impact choices.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>Local</Pill>
            <Pill>Plastic Free</Pill>
            <Pill>Organic</Pill>
            <Pill>High Protein</Pill>
            <Pill>Sugar Free</Pill>
          </div>
        </div>
      </div>

      {/* Story Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="card card-hover p-6">
          <h3 className="text-xl font-semibold text-gray-900">Our Story</h3>
          <p className="mt-2 text-gray-600">
            Started by a small team of growers and engineers, EcoGrocery brings seasonal staples
            and everyday essentials right to your door—reliably and responsibly.
          </p>
        </div>
        <div className="card card-hover p-6">
          <h3 className="text-xl font-semibold text-gray-900">What We Value</h3>
          <ul className="mt-2 text-gray-600 list-disc ml-5">
            <li>Freshness and nutrition</li>
            <li>Transparent sourcing</li>
            <li>Lower packaging and waste</li>
          </ul>
        </div>
        <div className="card card-hover p-6">
          <h3 className="text-xl font-semibold text-gray-900">Impact</h3>
          <p className="mt-2 text-gray-600">
            We highlight CO₂e estimates on products and encourage local choices to cut down
            transport emissions and packaging.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-12 card p-6">
        <h3 className="text-2xl font-semibold text-gray-900">Milestones</h3>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold text-green-700">2019</p>
            <p className="text-gray-600 mt-1">Prototype and early customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-700">2021</p>
            <p className="text-gray-600 mt-1">Expanded local network</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-700">2024+</p>
            <p className="text-gray-600 mt-1">CO₂e estimates and eco‑filters</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

