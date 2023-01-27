import { observer } from 'mobx-react-lite'
import React from 'react'
import Catalogs from '../components/Catalogs'

const Brands = observer(() => {
  return (
        <Catalogs
            purpose="brands"
        />
  )
})

export default Brands
