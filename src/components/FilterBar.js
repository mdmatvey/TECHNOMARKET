import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { Form } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FilterBar = observer(({ isCategoriesLoading, isBrandsLoading }) => {
  const { user, product } = useContext(Context)

  const [query, setQuery] = useState('')

  const [columns, setColumns] = useState(2)

  useEffect(() => {
    if (user.userWidth < 360) {
      setColumns(1)
    } else if (user.userWidth < 768) {
      setColumns(2)
    } else if (user.userWidth < 992) {
      setColumns(1)
    } else if (user.userWidth >= 992) {
      setColumns(2)
    }
  }, [user.userWidth])

  // const [brands, setBrands] = useState([]);
  // useEffect(() => {
  //     setBrands(product.brands)
  // }, [product.brands])

  useEffect(() => {
    if (document.getElementsByClassName('filterBarChecked')[0]) {
      document.getElementsByClassName('filterBarChecked')[0].children[0].checked = true
    }
  }, [product.categories])

  const chooseCategory = (e, category) => {
    if (e.target.checked) {
      product.setCategoriesToDisplay([...product.categoriesToDisplay, category])
    } else {
      product.setCategoriesToDisplay(product.categoriesToDisplay.filter(categoryToDisplay => category.id !== categoryToDisplay.id))
    }
  }

  return (
        <div style={{ background: '#fff', width: '100%', padding: 4 }}>
            Бренды:
            <Form style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, width: '100%', background: '#fff' }}>
                {
                    isBrandsLoading
                      ? <>
                            <Skeleton count={4} style={{ width: '80%' }} />
                            <Skeleton count={4} style={{ width: '80%' }} />
                        </>
                      : product.brands.filter(brand => {
                        if (brand.name.toLowerCase().includes(query.toLowerCase())) {
                          return true
                        }

                        return false
                      }).map(brand => <Form.Check key={brand.id} label={brand.name} />)
                }
            </Form>
            <Form className="d-inline-flex">
                <Form.Control
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    placeholder="Поиск по брендам"
                    className="me-2"
                    aria-label="Search"
                />
            </Form><br/>
            Категории:
            <Form style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, width: '100%', background: '#fff' }}>
                {
                    isCategoriesLoading
                      ? <>
                            <Skeleton count={4} style={{ width: '80%' }} />
                            <Skeleton count={4} style={{ width: '80%' }} />
                        </>
                      : product.categories.map(category => {
                        return (
                          product.categoriesToDisplay.map(category => category.name).includes(category.name)
                            ? <Form.Check onClick={(e) => chooseCategory(e, category)} key={category.id} label={category.name} className="filterBarChecked" />
                            : <Form.Check onClick={(e) => chooseCategory(e, category)} key={category.id} label={category.name} />
                        )
                      })
                }
            </Form>
        </div>
  )
})

export default FilterBar
