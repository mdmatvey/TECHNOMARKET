import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Card, Col, Container, Row, Image } from 'react-bootstrap'
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
  const [md2, setMd2] = useState(8)

  useEffect(() => {
    fetchOneProduct(id)
      .then(data => {
        product.setProducts(data)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (user.userWidth < 992) {
      setMd1(12)
      setMd2(12)
    } else if (user.userWidth >= 992) {
      setMd1(4)
      setMd2(8)
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
                          : <Image style={{ objectFit: 'contain', display: 'block', margin: '0 auto' }} width={300} height={300} src={product.products.image} />
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
                                    {product.products.description}
                                </>
                        }
                    </Card>
                </Col>
                <Col md={md1}>
                    <Card
                        className="d-flex flex-column"
                        style={{ width: '100%', height: '100%', fontSize: 30, border: 'none', borderRadius: 0, background: '#ededed', padding: 10 }}
                    >
                        {
                            isLoading
                              ? <>
                                    <h3 style={{ marginBottom: 0 }}><Skeleton style={{ width: '15%' }} /></h3>
                                    <span><Skeleton style={{ width: '30%' }} /></span>
                                    <Skeleton style={{ width: '30%' }} />
                                    <Skeleton style={{ width: '30%' }} />
                                    <Skeleton style={{ width: '50%' }} />
                                    <Skeleton />
                                    <Skeleton style={{ width: '80%' }} />
                                </>
                              : <>
                                    <h3 style={{ marginBottom: 0 }}>Цена</h3>
                                    <span>{(product.products.price * product.products.count).toFixed(2)}₽</span>
                                    Срок: 1 д.<br/>
                                    Наличие: 1 шт.
                                    Картой онлайн, наличными
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
