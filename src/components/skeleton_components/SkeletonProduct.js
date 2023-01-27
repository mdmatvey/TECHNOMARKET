import React from 'react'
import { Card, Col } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Product = ({ products }) => {
  return (
    Array(products).fill(0).map(product =>
            <Col className='m-3'>
                <div style={{ background: '#fff', height: '100%', position: 'relative' }}>
                    <Card
                        className='pb-5'
                        style={{ border: 'none', borderRadius: 0, padding: 5 }}
                    >
                        <Skeleton style={{ width: '100%', height: 150 }} />
                        <div style={{ display: 'block' }}><Skeleton style={{ width: '50%', height: 35, margin: '10px 0px 10px 50%' }} /></div>
                        <Skeleton style={{ width: '90%' }} />
                        <Skeleton style={{ width: '75%' }} />
                        <Skeleton style={{ width: '25%', marginBottom: 10 }} />
                        <Skeleton style={{ width: '40%' }} />
                    </Card>
                </div>
            </Col>
    )
  )
}

export default Product
