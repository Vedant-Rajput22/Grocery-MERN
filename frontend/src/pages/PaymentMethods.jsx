import React from 'react'
import GenericPage from './GenericPage'

const sections = [
  { title: 'Online Payments', content: 'We accept major cards via secure checkout.' },
  { title: 'Cash on Delivery', content: 'Pay with cash upon delivery in supported areas.' },
  { title: 'Wallets', content: 'Support for popular wallets coming soon.' },
]

const PaymentMethods = () => <GenericPage title="Payment Methods" sections={sections} />

export default PaymentMethods

