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

  const [p, setP] = useState(3)

  useEffect(() => {
    product.setIsProductsLoading(true)

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
  }, [])

  useEffect(() => {
    product.setIsProductsLoading(true)

    let query = null
    let category = null
    let brands = null

    if (product.searchQuery.length > 0) {
      query = product.searchQuery
    }

    if (product.selectedCategory.length > 0) {
      category = product.selectedCategory
    }

    if (product.selectedBrands.length > 0) {
      brands = product.selectedBrands.map(brand => brand.name)
    }

    fetchProducts(query, category, brands, product.page, product.limit)
      .then(data => {
        product.setProducts(data.results)
        product.setIsProductsLoading(false)
        product.setTotalCount(data.count)
      })
  }, [product.searchQuery, product.selectedCategory, product.selectedBrands, product.page, product.limit])

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
