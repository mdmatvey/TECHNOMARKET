import { observer } from 'mobx-react-lite'
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../index'
import { Container, Row } from 'react-bootstrap'
import Product from './Product'
import SkeletonProduct from './skeleton_components/SkeletonProduct'
import { BsSearch } from 'react-icons/bs'
import '../styles/animate.css'

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
    !isProductsLoading && product.totalCount === 0
      ? <>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '10% 0' }}>
              <BsSearch style={{ fontSize: '10rem' }} id="mag" />
          </div>
          <h2 style={{ textAlign: 'center' }}>По вашему запросу ничего не найдено</h2>
        </>
      : product.displayGrid
        ? <Container style={{ padding: 10 }}>
            <Row style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, width: '100%' }}>
                {
                    isProductsLoading
                      ? <SkeletonProduct products={12} />
                      : product.products !== undefined
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
                      ? <SkeletonProduct products={12} />
                      : product.products !== undefined
                        ? product.products.map(product =>
                            <Product key={product.key} item={product} />
                        )
                        : null
                }
          </Container>
  )
})

export default ProductList
