import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { Accordion, Card, Dropdown, Form } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FilterBarStyles from '../styles/FilterBarStyles.css'
import { PRIMARY_COLOR } from '../utils/uiConsts'

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
  }, [product.categories])

  const chooseCategory = (e, category) => {
    if (e.target.checked) {
      product.setCategoriesToDisplay([...product.categoriesToDisplay, category])
    } else {
      product.setCategoriesToDisplay(product.categoriesToDisplay.filter(categoryToDisplay => category.id !== categoryToDisplay.id))
    }
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
                          <Accordion.Header>{category.name}</Accordion.Header>
                          <Accordion.Body>
                            Подкатегория
                          </Accordion.Body>
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
                        : product.brands.map(brand => <Form.Check key={brand.id} label={brand.name} style={{ fontSize: '1.1rem' }} />)
                  }
              </Form>
            </div>
        </Card>
  )
})

export default FilterBar
