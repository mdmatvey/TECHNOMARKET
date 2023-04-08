import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Card, Carousel, Col, Container, Row } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchOneProduct } from '../components/http/productAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { ImHome3 } from 'react-icons/im'
import { MdShoppingCart } from 'react-icons/md'
import { PRIMARY_COLOR } from '../utils/uiConsts'

const ProductPage = observer(() => {
  const { product, user } = useContext(Context)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [md1, setMd1] = useState(4)

  useEffect(() => {
    fetchOneProduct(id)
      .then(data => {
        product.setProducts(data)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (document.querySelector('#product_description')) {
      document.querySelector('#product_description').innerHTML = product.products.description
    }
  }, [product.products])

  useEffect(() => {
    if (user.userWidth < 992) {
      setMd1(12)
    } else if (user.userWidth >= 992) {
      setMd1(6)
    }
  }, [user.userWidth])

  return (
        <div className="pb-5 pt-">
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
                    style={{ textDecoration: 'none', color: 'gray', cursor: 'default' }}
                  >
                    <MdShoppingCart />&nbsp;{product.products.title}
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
          </Container>
          <Container className="p-4" style={{ background: '#fff' }}>
            <Row>
                {
                    isLoading
                      ? <h1><Skeleton style={{ width: '50%' }} /></h1>
                      : <h1 className="d-flex align-items-center">{product.products.title}</h1>
                }
            </Row>
            <Row className='pt-5'>
                <Col md={md1}>
                    {
                        isLoading
                          ? <Skeleton style={{ display: 'block', margin: '0 auto', width: 300, height: 300 }} />
                          : <Carousel variant="dark">
                              <Carousel.Item>
                                <img
                                  className="d-block w-100"
                                  src={'https://technomarket-spb.ru/static/images/' + product.products.image}
                                  style={{ objectFit: 'contain', display: 'block', margin: '0 auto', width: 300, height: 300 }}
                                />
                              </Carousel.Item>
                            </Carousel>
                    }
                </Col>
                <Col md={md1}>
                    <Card
                        className="d-flex flex-column"
                        style={{ width: '100%', height: '100%', fontSize: 24, border: 'none' }}
                    >
                        {
                            isLoading
                              ? <>
                                    <h3><Skeleton style={{ width: '55%' }} /></h3>
                                    <Skeleton />
                                    <Skeleton style={{ width: '90%' }} />
                                    <Skeleton style={{ width: '95%' }} />
                                    <Skeleton style={{ width: '40%' }} />
                                </>
                              : <>
                                    <h3>Описание товара:</h3>
                                    <div id="product_description"></div>
                                </>
                        }
                    </Card>
                </Col>
            </Row>
          </Container>
        </div>
  )
})

export default ProductPage
