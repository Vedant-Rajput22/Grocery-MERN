import React from 'react'

const Section = ({ title, children }) => (
  <div className="card p-6 card-hover">
    <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
    <div className="mt-3 text-gray-700">{children}</div>
  </div>
)

const GenericPage = ({ title, sections = [] }) => {
  return (
    <div className="mt-12 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700">{title}</h1>
      <div className="mt-8 grid gap-6">
        {sections.map((s, i) => (
          <Section key={i} title={s.title}>{s.content}</Section>
        ))}
      </div>
    </div>
  )
}

export default GenericPage

