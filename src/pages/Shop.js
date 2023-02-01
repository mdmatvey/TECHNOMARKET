import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import SortBar from '../components/SortBar'
import { fetchBrands, fetchCategories, fetchProducts } from '../components/http/productAPI'
import Pages from '../components/Pages'
import ProductList from '../components/ProductList'
import FilterBar from '../components/FilterBar'
import { ImHome3 } from 'react-icons/im'

const Shop = observer(() => {
  const { user, product } = useContext(Context)
  const [isCategoriesLoading, setIsCategoriesIsLoading] = useState(true)
  const [isBrandsLoading, setIsBrandsIsLoading] = useState(true)
  const [isProductsLoading, setIsProductsLoading] = useState(true)

  const [p, setP] = useState(3)

  useEffect(() => {
    fetchCategories()
      .then(data => {
        product.setCategories(data)
        setIsCategoriesIsLoading(false)
      })

    fetchBrands()
      .then(data => {
        product.setBrands(data)
        setIsBrandsIsLoading(false)
      })

    fetchProducts(null, null, 1, product.limit)
      .then(data => {
        product.setProducts(data)
        setIsProductsLoading(false)
        // product.setTotalCount(data.length)
      })
  }, [])

  useEffect(() => {
    fetchProducts(product.selectedCategory.id, product.selectedBrand.id, product.page, product.limit)
      .then(data => {
        product.setProducts(data)
        // product.setTotalCount(data.length)
      })
  }, [product.page, product.limit, product.selectedCategory, product.selectedBrand])

  useEffect(() => {
    if (user.userWidth < 768) {
      setP(0)
    } else if (user.userWidth >= 768) {
      setP(3)
    }
  }, [user.userWidth])

  return (
        <div>
          <Container>
            <Breadcrumb className="pt-3">
              <Breadcrumb.Item active>
                <Link
                  className='d-flex align-items-center'
                  style={{ textDecoration: 'none', color: 'gray', cursor: 'default' }}
                >
                  <ImHome3 />&nbsp;Home
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Container>
          <Container>
              <Row>
                  <Col md={3} className={`p-${p}`}>
                      <FilterBar isCategoriesLoading={isCategoriesLoading} isBrandsLoading={isBrandsLoading} />
                  </Col>
                  <Col md={9} className={`p-${p}`}>
                      <SortBar setIsProductsLoading={setIsProductsLoading} />
                      <ProductList isProductsLoading={isProductsLoading} />
                      <Pages />
                  </Col>
              </Row>
          </Container>
        </div>
  )
})

export default Shop
