import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Image } from 'react-bootstrap'
import { SHOP_ROUTE } from '../utils/routeConsts'
import { Context } from '../index'
import BrandCard from './modals/BrandCard'

const Item = ({ path }) => {
  const navigate = useNavigate()
  const { product } = useContext(Context)

  const [modalShow, setModalShow] = useState(false)

  const followBrand = () => {
    if (!product.selectedBrands.map(brand => brand.name).includes(path.name)) {
      product.setSelectedBrands([])
      product.setSelectedBrands([...product.selectedBrands, path])
    }

    navigate(SHOP_ROUTE)
  }

  return (
        <Col
            className={'mt-5 mb-4'}
        >
          <BrandCard
            show={modalShow}
            onHide={() => setModalShow(false)}
            path={path}
            followBrand={followBrand}
          />
            <Card
                style={{ display: 'block', margin: '0 auto', width: 250, height: 260, cursor: 'pointer', textAlign: 'center', boxShadow: '0px 0px 8px 3px rgba(99, 99, 99, 0.2)' }}
                border={'light'}
                onClick={() => {
                  setModalShow(true)
                }}
            >
                <Image width={'100%'} height={'80%'} style={{ objectFit: 'cover', marginLeft: 'auto', marginRight: 'auto' }} src={path.image} />
                <h4 style={{ marginTop: 10 }}>{path.name}</h4>
            </Card>
        </Col>
  )
}

export default Item
