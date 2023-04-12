import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import { Accordion, Card, Form } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/FilterBarStyles.css'

const FilterBar = observer(({ isCategoriesLoading, isBrandsLoading }) => {
  const { product } = useContext(Context)

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

  const categoryClick = (e, id) => {
    const HTMLCollection = document.getElementsByClassName('categorybutton')
    // eslint-disable-next-line prefer-const
    for (let button of HTMLCollection) {
      button.style.fontWeight = 'normal'
    }
    e.target.style.fontWeight = 'bold'
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
                                  categoryClick(e, category.subcategories.map(subcategory => subcategory.id))
                                } else {
                                  categoryClick(e, category.id)
                                }
                              }}
                            >
                              <div
                                className='categorybutton'
                              >
                                {category.name}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              {
                                category.subcategories.map(subcategory =>
                                    <div
                                      className='categorybutton'
                                      key={subcategory.id}
                                      onClick={(e) => categoryClick(e, [subcategory.id])}
                                      style={{ margin: '4px 0', padding: '6px 0', cursor: 'pointer' }}
                                    >
                                      {subcategory.name}
                                    </div>
                                )
                              }
                            </Accordion.Body>
                          </Accordion.Item>
                        : <div
                              className='categorybutton'
                              key={category.id}
                              onClick={(e) => categoryClick(e, [category.id])}
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
              <Form className='mt-2' style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%', height: 300, overflowY: 'scroll', background: '#fff' }}>
                  {
                      isBrandsLoading
                        ? <>
                              <Skeleton count={4} style={{ width: '80%' }} />
                          </>
                        : product.brands.map(brand => {
                          return (
                            <>
                              {
                                product.selectedBrands
                                  ? product.selectedBrands.map(brand => brand.name).includes(brand.name)
                                    ? <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} className="filterBarChecked" style={{ fontSize: '1.1rem' }} />
                                    : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} />
                                  : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} />
                              }
                            </>
                          )
                        })
                  }
              </Form>
            </div>
        </Card>
  )
})

export default FilterBar
