import React from 'react'
import GenericPage from './GenericPage'

const sections = [
  { title: 'Ordering', content: 'Add items to cart, choose a delivery address, and place order via COD or Online.' },
  { title: 'Delivery', content: 'Most orders arrive within 30–90 minutes depending on your location.' },
  { title: 'Payments', content: 'We support secure card payments and cash on delivery.' },
]

const FAQs = () => <GenericPage title="FAQs" sections={sections} />

export default FAQs

