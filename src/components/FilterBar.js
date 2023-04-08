import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { Accordion, Card, Form } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/FilterBarStyles.css'

const FilterBar = observer(({ isCategoriesLoading, isBrandsLoading }) => {
  const { user, product } = useContext(Context)

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

  useEffect(() => {
    if (document.getElementsByClassName('filterBarChecked')[0]) {
      document.getElementsByClassName('filterBarChecked')[0].children[0].checked = true
    }
  }, [product.brands])

  const checkBrand = (e, brand) => {
    if (e.target.checked) {
      product.setSelectedBrands([...product.selectedBrands, brand])
    } else {
      product.setSelectedBrands(product.selectedBrands.filter(brandToDisplay => brand.id !== brandToDisplay.id))
    }
  }

  const categoryClick = (id) => {
    product.setSelectedCategory(id)
  }

  return (
        <Card style={{ width: '100%', padding: 4, border: 'none', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }}>
            <Accordion className='p-3' flush>
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }} className='filterCategory'>Категории:</span>
                {
                  isCategoriesLoading
                    ? <Skeleton count={4} style={{ width: '80%' }} />
                    : product.categories.map((category, index) =>
                      category.subcategories
                        ? <Accordion.Item eventKey={index} key={category.id}>
                            <Accordion.Header
                              onClick={(e) => {
                                e.stopPropagation()
                                if (category.subcategories) {
                                  categoryClick(category.subcategories.map(subcategory => subcategory.id))
                                } else {
                                  categoryClick(category.id)
                                }
                              }}
                            >
                              {category.name}
                            </Accordion.Header>
                            <Accordion.Body>
                              {
                                category.subcategories.map(subcategory =>
                                    <div
                                      key={subcategory.id}
                                      onClick={() => categoryClick([subcategory.id])}
                                      style={{ margin: '4px 0', padding: '6px 0', cursor: 'pointer' }}
                                    >
                                      {subcategory.name}
                                    </div>
                                )
                              }
                            </Accordion.Body>
                          </Accordion.Item>
                        : <div
                              key={category.id}
                              onClick={() => categoryClick([category.id])}
                              style={{ padding: 7, fontSize: '1.1rem', cursor: 'pointer' }}
                            >
                            {category.name}
                          </div>
                    )
                }
            </Accordion>
            <hr />
            <div className='p-3'>
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }} className='filterCategory'>Бренды:</span>
              <Form className='mt-2' style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, width: '100%', background: '#fff' }}>
                  {
                      isBrandsLoading
                        ? <>
                              <Skeleton count={4} style={{ width: '80%' }} />
                              <Skeleton count={4} style={{ width: '80%' }} />
                          </>
                        : product.brands.map(brand => {
                          return (
                            product.selectedBrands
                              ? product.selectedBrands.map(brand => brand.name).includes(brand.name)
                                ? <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 7 ? brand.name.slice(0, 7) + '...' : brand.name} className="filterBarChecked" style={{ fontSize: '1.1rem' }} />
                                : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 7 ? brand.name.slice(0, 7) + '...' : brand.name} />
                              : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 7 ? brand.name.slice(0, 7) + '...' : brand.name} />
                          )
                        })
                  }
              </Form>
            </div>
        </Card>
  )
})

export default FilterBar
