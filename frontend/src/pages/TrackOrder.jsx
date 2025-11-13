import React from 'react'
import GenericPage from './GenericPage'

const sections = [
  { title: 'Track by Order ID', content: 'You can view your orders and statuses on the My Orders page once logged in.' },
  { title: 'Live Updates', content: 'We’re working on real-time tracking. For now, check status in My Orders.' },
]

const TrackOrder = () => <GenericPage title="Track your Order" sections={sections} />

export default TrackOrder

