import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { PRODUCT_ROUTE } from '../utils/routeConsts'
import { observer } from 'mobx-react-lite'
import { Context } from '..'

const Product = observer(({ item }) => {
  const navigate = useNavigate()
  const { user, product } = useContext(Context)

  const [m, setM] = useState(3)

  useEffect(() => {
    if (user.userWidth < 1200) {
      setM(3)
    } else if (user.userWidth < 1400) {
      setM(2)
    } else if (user.userWidth >= 1400) {
      setM(3)
    }
  }, [user.userWidth])

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {item.title}
    </Tooltip>
  )

  return (
    product.displayGrid
      ? <Col className={`m-${m}`}>
            <div style={{ height: '100%', position: 'relative', borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }}>
                  <Card
                      className='pb-4'
                      style={{ cursor: 'pointer', border: 'none', borderRadius: 5, padding: 5 }}
                      onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id)}
                  >
                    <Image style={{ objectFit: 'contain', marginLeft: 'auto', marginRight: 'auto' }} width={150} height={150} src={'https://technomarket-spb.ru/static/images/' + item.image} />
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <div className='mt-3'>
                            <div style={{ fontSize: '1.1rem' }}><strong>{item.brand} </strong>{item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title}</div>
                        </div>
                      </OverlayTrigger>
                  </Card>
            </div>
          </Col>
      : <Card
            style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '3fr 7fr 4fr 1fr', gridTemplateRows: 170, width: '100%', marginBottom: 10, cursor: 'pointer', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px', border: 'none' }}
            onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id)}
        >
            <Card.Img style={{ height: '80%', width: '80%', objectFit: 'contain', marginLeft: 'auto', marginRight: 'auto' }} src={'https://technomarket-spb.ru/static/images/' + item.image} />
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Card.Body>
                  <Card.Title style={{ fontSize: '1.1rem' }}><strong>{item.brand} </strong>{user.userWidth < 575 ? item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title : item.title}</Card.Title>
                  <Card.Subtitle>{item.category}</Card.Subtitle>
              </Card.Body>
            </OverlayTrigger>
        </Card>
  )
})

export default Product
