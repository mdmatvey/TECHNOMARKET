import { observer } from 'mobx-react-lite'
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../index'
import { Container, Row } from 'react-bootstrap'
import Product from './Product'
import SkeletonProduct from './skeleton_components/SkeletonProduct'

const ProductList = observer(({ isProductsLoading }) => {
  const { user, product } = useContext(Context)

  const [columns, setColumns] = useState(4)

  useEffect(() => {
    if (user.userWidth < 476) {
      setColumns(1)
    } else if (user.userWidth < 992) {
      setColumns(2)
    } else if (user.userWidth < 1200) {
      setColumns(3)
    } else if (user.userWidth >= 1200) {
      setColumns(4)
    }
  }, [user.userWidth])

  return (
    product.displayGrid
      ? <Container style={{ padding: 10 }}>
          <Row style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, width: '100%' }}>
              {
                  isProductsLoading
                    ? <SkeletonProduct products={4} />
                    : product.products.length !== undefined
                      ? product.products.map(product =>
                          <Product key={product.key} item={product} />
                      )
                      : null
              }
          </Row>
        </Container>
      : <Container style={{ padding: 10, overflow: 'auto' }}>
              {
                  isProductsLoading
                    ? <SkeletonProduct products={4} />
                    : product.products.length !== undefined
                      ? product.products.map(product =>
                          <Product key={product.key} item={product} />
                      )
                      : null
              }
        </Container>
  )
})

export default ProductList
