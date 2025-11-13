import React from 'react'
import GenericPage from './GenericPage'

const sections = [
  { title: 'Areas We Serve', content: 'We deliver across major city centers and expanding weekly.' },
  { title: 'Delivery Slots', content: 'Standard and express delivery options, shown at checkout.' },
  { title: 'Fees', content: 'Most deliveries are free above minimum order; otherwise nominal charges apply.' },
]

const DeliveryInfo = () => <GenericPage title="Delivery Information" sections={sections} />

export default DeliveryInfo

