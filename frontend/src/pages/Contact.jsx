import React from 'react'
import GenericPage from './GenericPage'

const sections = [
  { title: 'Email', content: 'support@ecogrocery.dev' },
  { title: 'Phone', content: '+1 (555) 012-3456' },
  { title: 'Hours', content: 'Mon–Sat 9:00–18:00' },
]

const Contact = () => <GenericPage title="Contact Us" sections={sections} />

export default Contact

