import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import SortBar from '../components/SortBar'
import { fetchBrands, fetchCategories, fetchProducts } from '../components/http/productAPI'
import Pages from '../components/Pages'
import ProductList from '../components/ProductList'
import FilterBar from '../components/FilterBar'
import { ImHome3 } from 'react-icons/im'

let firstRender

const Shop = observer(() => {
  const location = useLocation()

  useEffect(() => {
    firstRender = location.state ? location.state.firstRender : true
  }, [])

  const { user, product } = useContext(Context)
  const [isCategoriesLoading, setIsCategoriesIsLoading] = useState(true)
  const [isBrandsLoading, setIsBrandsIsLoading] = useState(true)

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

    if (firstRender) {
      fetchProducts(null, null, null, product.page, product.limit)
        .then(data => {
          product.setProducts(data.results)
          product.setIsProductsLoading(false)
          product.setTotalCount(data.count)
        })
    }
  }, [])

  useEffect(() => {
    let category = null
    let brands = null

    if (product.selectedCategory.length > 0) {
      category = product.selectedCategory
    }

    if (product.selectedBrands.length > 0) {
      brands = product.selectedBrands.map(brand => brand.name)
    }

    fetchProducts(null, category, brands, product.page, product.limit)
      .then(data => {
        product.setProducts(data.results)
        product.setTotalCount(data.count)
      })
  }, [product.page, product.limit, product.selectedCategory, product.selectedBrands])

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
                      <SortBar setIsProductsLoading={product.setIsProductsLoading} />
                      <ProductList isProductsLoading={product.isProductsLoading} />
                      <Pages />
                  </Col>
              </Row>
          </Container>
        </div>
  )
})

export default Shop
