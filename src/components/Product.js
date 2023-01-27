import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Image } from 'react-bootstrap'
import { PRODUCT_ROUTE } from '../utils/routeConsts'

const Product = ({ item }) => {
  const navigate = useNavigate()

  return (
        <Col className='m-3'>
            <div style={{ background: '#fff', height: '100%', position: 'relative' }}>
                <Card
                    className='pb-5'
                    style={{ cursor: 'pointer', border: 'none', borderRadius: 0, padding: 5 }}
                    onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id)}
                >
                    <Image style={{ objectFit: 'contain', marginLeft: 'auto', marginRight: 'auto' }} width={150} height={150} src={item.image} />
                    <div style={{ fontSize: '1.7rem', display: 'block', marginLeft: 'auto' }}><strong>{item.price.toFixed(2)}₽</strong></div>
                    <div>
                        <div style={{ fontSize: '1rem' }}><strong>Brand </strong>{item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title}</div>
                        <div style={{ color: '#808080', marginTop: '5px' }}>4UP03831</div>
                    </div>
                </Card>
                <div className="d-flex" style={{ position: 'absolute', bottom: 0, right: 0 }}>
                </div>
            </div>
        </Col>
  )
}

export default Product
