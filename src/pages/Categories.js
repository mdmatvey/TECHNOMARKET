import { observer } from 'mobx-react-lite'
import React from 'react'
import Catalogs from '../components/Catalogs'

const Categories = observer(() => {
  return (
        <Catalogs
            purpose="categories"
        />
  )
})

export default Categories
