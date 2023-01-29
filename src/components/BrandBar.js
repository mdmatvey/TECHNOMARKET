import React from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Logo from '../logo.svg'
import { useNavigate } from 'react-router-dom'
import { ABOUT_ROUTE, SHOP_ROUTE, BRANDS_ROUTE } from '../utils/routeConsts'
import { TEXTBUTTON_STYLE } from '../utils/uiConsts'

const BrandBar = observer(() => {
  const navigate = useNavigate()
  return (
        <>
            <Container className='d-flex align-items-center justify-content-between pt-5'>
                <Image src={Logo} onClick={() => navigate(SHOP_ROUTE)} style={{ cursor: 'pointer' }} />
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Container>
            <Container className='d-flex mt-3' style={{ border: '2px solid black', borderWidth: '1px 0px' }}>
                <Button onClick={() => navigate(ABOUT_ROUTE)} style={{ ...TEXTBUTTON_STYLE, color: '#000' }}>О нас</Button>
                <Button onClick={() => navigate(SHOP_ROUTE)} style={{ ...TEXTBUTTON_STYLE, color: '#000' }}>Каталог</Button>
                <Button onClick={() => navigate(BRANDS_ROUTE)} style={{ ...TEXTBUTTON_STYLE, color: '#000' }}>Бренды</Button>
            </Container>
        </>
  )
})

export default BrandBar
