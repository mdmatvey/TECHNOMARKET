import React from 'react'
import { Card, Col } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonItem = ({ items }) => {
  return (
    Array(items).fill(0).map(item =>
            <Col
                className={'mt-5 mb-4'}
            >
                <Card
                    style={{ display: 'block', margin: '0 auto', width: 250, height: 260, textAlign: 'center', border: 'none', boxShadow: '0px 0px 8px 3px rgba(99, 99, 99, 0.2)' }}
                    border={'light'}
                >
                    <Skeleton style={{ top: -4, margin: 0, padding: 0, height: '80%', width: '100%' }} />
                    <h4 style={{ marginTop: 10 }}><Skeleton style={{ width: '50%' }} /></h4>
                </Card>
            </Col>
    )
  )
}

export default SkeletonItem
