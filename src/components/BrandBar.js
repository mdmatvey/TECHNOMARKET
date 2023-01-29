import React from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Logo from '../logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { ABOUT_ROUTE, SHOP_ROUTE, BRANDS_ROUTE } from '../utils/routeConsts'
import { TEXTBUTTON_STYLE } from '../utils/uiConsts'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoIosMail } from 'react-icons/io'

const BrandBar = observer(() => {
  const navigate = useNavigate()

  const choosePage = (e, route, element1, element2) => {
    navigate(route)
    element1.style.fontWeight = 'normal'
    element2.style.fontWeight = 'normal'
    e.target.style.fontWeight = 'bold'
  }

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
            <Container className='d-flex justify-content-between mt-3'>
                <div>
                    <Button
                        onClick={(e) => choosePage(e, ABOUT_ROUTE, document.getElementById('catalog'), document.getElementById('brands'))}
                        className='me-3'
                        style={{ ...TEXTBUTTON_STYLE, color: '#000', transition: '0.05s', fontSize: '1.5rem' }}
                        id='about'
                    >
                        О нас
                    </Button>
                    <Button
                        onClick={(e) => choosePage(e, SHOP_ROUTE, document.getElementById('about'), document.getElementById('brands'))}
                        className='me-3'
                        style={{ ...TEXTBUTTON_STYLE, color: '#000', fontWeight: 'bold', transition: '0.05s', fontSize: '1.5rem' }}
                        id='catalog'
                    >
                        Каталог
                    </Button>
                    <Button
                        onClick={(e) => choosePage(e, BRANDS_ROUTE, document.getElementById('about'), document.getElementById('catalog'))}
                        style={{ ...TEXTBUTTON_STYLE, color: '#000', transition: '0.05s', fontSize: '1.5rem' }}
                        id='brands'
                    >
                        Бренды
                    </Button>
                </div>
                <div className='d-inline-flex align-items-center'>
                    <div
                        className='d-flex align-items-baseline me-4'
                        style={{ color: '#000' }}
                    >
                        <BsFillTelephoneFill className='me-2' />
                        <Link
                            callto="tel:+79991234567"
                            style={{ color: '#000', textDecoration: 'none' }}
                        >
                            <span style={{ fontSize: '1.25rem' }}>+7 (999) 123-45-67</span>
                        </Link>
                    </div>
                    <div
                        className='d-flex align-items-end'
                        style={{ color: '#000' }}
                    >
                        <IoIosMail className='me-2' fontSize={'1.75rem'} />
                        <Link
                            to="mailto:info@Technomarket.com"
                            style={{ color: '#000', textDecoration: 'none' }}
                        >
                            <span style={{ fontSize: '1.25rem' }} >info@Technomarket.com</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </>
  )
})

export default BrandBar
