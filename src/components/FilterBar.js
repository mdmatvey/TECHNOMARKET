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

  const parentCategoryClick = () => {

  }

  return (
        <Card style={{ width: '100%', padding: 4, border: 'none', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }}>
            <Accordion className='p-3' flush>
              <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }} className='filterCategory'>Категории:</span>
                {
                  isCategoriesLoading
                    ? <Skeleton count={4} style={{ width: '80%' }} />
                    : product.categories.map(category =>
                        <Accordion.Item eventKey={category.id} key={category.id}>
                          <Accordion.Header onClick={(e) => {
                            e.stopPropagation()
                            console.log(category.id)
                          }}
                          >
                            {category.name}
                          </Accordion.Header>
                          {
                            // category.subcategories.map(subcategory =>
                            //   <Accordion.Body key={subcategory.subid}>
                            //     {subcategory.name}
                            //   </Accordion.Body>
                            // )
                          }
                        </Accordion.Item>
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
                            product.catalogToDisplay.map(brand => brand.name).includes(brand.name)
                              ? <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name} className="filterBarChecked" style={{ fontSize: '1.1rem' }} />
                              : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name} />
                          )
                        })
                  }
              </Form>
            </div>
        </Card>
  )
})

export default FilterBar
