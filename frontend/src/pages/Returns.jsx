import React from 'react'
import GenericPage from './GenericPage'

const sections = [
  { title: 'Return Window', content: 'Report issues within 24 hours of delivery.' },
  { title: 'Refunds', content: 'Approved refunds will be processed to the original payment method.' },
  { title: 'Non‑returnable Items', content: 'Perishables may be replaced or refunded case-by-case.' },
]

const Returns = () => <GenericPage title="Return & Refund Policy" sections={sections} />

export default Returns

