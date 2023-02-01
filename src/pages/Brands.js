import { observer } from 'mobx-react-lite'
import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../index'
import { Breadcrumb, Row, Form, Container } from 'react-bootstrap'
import Item from '../components/Item'
import { fetchBrands } from '../components/http/productAPI'
import SkeletonItem from '../components/skeleton_components/SkeletonItem'
import { Link } from 'react-router-dom'
import { PRIMARY_COLOR } from '../utils/uiConsts'
import { ImHome3 } from 'react-icons/im'
import { TiThSmall } from 'react-icons/ti'

const Brands = observer(() => {
  const { product, user } = useContext(Context)

  const [isLoading, setIsLoading] = useState(true)

  const [md, setMd] = useState(4)

  const [query, setQuery] = useState('')
  const [brandsToDisplay, setBrandsToDisplay] = useState(product.brands)

  useEffect(() => {
    fetchBrands()
      .then(data => {
        product.setBrands(data)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    console.log(query)
    if (query.length !== 0) {
      setBrandsToDisplay(product.brands.filter(brand => brand.name.includes(query)))
    } else {
      setBrandsToDisplay(product.brands)
    }
  }, [query])

  useEffect(() => {
    if (user.userWidth < 992) {
      setMd(2)
    } else if (user.userWidth < 1200) {
      setMd(3)
    } else if (user.userWidth >= 1200) {
      setMd(4)
    }
  }, [user.userWidth])

  return (
        <>
          <Container>
            <Breadcrumb className="pt-3">
              <Breadcrumb.Item active>
                <Link
                  to="/"
                  className='d-flex align-items-center'
                  style={{ textDecoration: 'none', color: PRIMARY_COLOR }}
                >
                  <ImHome3 />&nbsp;Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                <Link
                  to=""
                  className='d-flex align-items-center'
                  style={{ textDecoration: 'none', color: 'gray', cursor: 'default' }}
                >
                  <TiThSmall />&nbsp;Brands
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Container>
          <Container className='pt-5 pb-5'>

              <h1 className='mb-3'>
                  Бренды:
              </h1>
              <Form className="d-flex" style={{ display: 'block', margin: '0 auto', width: '50%' }}>
                  <Form.Control
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      type="search"
                      placeholder={'Поиск по брендам'}
                      className="me-2"
                      aria-label="Search"
                  />
              </Form>
              <Row md={md}>
                  {
                      isLoading
                        ? <SkeletonItem items={8} />
                        : brandsToDisplay.map(item =>
                            <Item key={item.key} path={item} />
                        )
                  }
              </Row>
          </Container>
        </>
  )
})

export default Brands
