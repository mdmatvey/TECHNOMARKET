import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Image } from 'react-bootstrap'
import { PRODUCT_ROUTE } from '../utils/routeConsts'

const Product = ({ item }) => {
  const navigate = useNavigate()

  return (
        <Col className='m-3'>
            <div style={{ height: '100%', position: 'relative', borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }}>
                <Card
                    className='pb-4'
                    style={{ cursor: 'pointer', border: 'none', borderRadius: 5, padding: 5 }}
                    onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id)}
                >
                    <Image style={{ objectFit: 'contain', marginLeft: 'auto', marginRight: 'auto' }} width={150} height={150} src={item.image} />
                    <div className='mt-3'>
                        <div style={{ fontSize: '1.1rem' }}><strong>Brand </strong>{item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title}</div>
                    </div>
                </Card>
                <div style={{ position: 'absolute', bottom: 0, right: 10, fontSize: '1.7rem', display: 'block', marginLeft: 'auto' }}>
                        <strong>{item.price.toFixed(2)}₽</strong>
                </div>
            </div>
        </Col>
  )
}

export default Product
