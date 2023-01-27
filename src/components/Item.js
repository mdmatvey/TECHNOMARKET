import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Image } from 'react-bootstrap'
import { CATEGORIES_ROUTE, BRANDS_ROUTE, SHOP_ROUTE } from '../utils/routeConsts'
import { Context } from '..'

const Item = ({ path, purpose }) => {
  const navigate = useNavigate()
  const { product } = useContext(Context)

  let route

  if (purpose === 'categories') {
    route = CATEGORIES_ROUTE
  } else if (purpose === 'brands') {
    route = BRANDS_ROUTE
  }

  return (
        <Col
            className={'mt-5 mb-4'}
        >
            <Card
                style={{ display: 'block', margin: '0 auto', width: 250, height: 260, cursor: 'pointer', textAlign: 'center', boxShadow: '0px 0px 8px 3px rgba(99, 99, 99, 0.2)' }}
                border={'light'}
                onClick={() => {
                  if (!product.categoriesToDisplay.map(category => category.name).includes(path.name)) {
                    product.setCategoriesToDisplay([])
                    product.setCategoriesToDisplay([...product.categoriesToDisplay, path])
                  }

                  navigate(SHOP_ROUTE)
                }}
            >
                <Image width={'100%'} height={'80%'} style={{ objectFit: 'cover', marginLeft: 'auto', marginRight: 'auto' }} src={path.image} />
                <h4 style={{ marginTop: 10 }}>{path.name}</h4>
            </Card>
        </Col>
  )
}

export default Item
