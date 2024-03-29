import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Logo from '../logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { ABOUT_ROUTE, SHOP_ROUTE, BRANDS_ROUTE } from '../utils/routeConsts'
import { TEXTBUTTON_STYLE } from '../utils/uiConsts'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoIosMail } from 'react-icons/io'
import { Context } from '..'
import '../styles/BrandBarStyles.css'

const BrandBar = observer(() => {
  const { user, product } = useContext(Context)
  const navigate = useNavigate()

  const [outerFlexDirection, setOuterFlexDirection] = useState('flex-row')
  const [innerFlexDirection, setInnerFlexDirection] = useState('flex-row')

  const [query, setQuery] = useState('')

  const search = (e, searchParam) => {
    e.preventDefault()
    navigate(SHOP_ROUTE)
    product.setSearchQuery(searchParam)
    setQuery('')
  }

  useEffect(() => {
    if (user.userWidth < 992) {
      setOuterFlexDirection('flex-column-reverse')
    } else if (user.userWidth >= 992) {
      setOuterFlexDirection('flex-row')
    }
  }, [user.userWidth])

  useEffect(() => {
    if (user.userWidth < 500) {
      setInnerFlexDirection('flex-column')
    } else if (user.userWidth >= 500) {
      setInnerFlexDirection('flex-row')
    }
  }, [user.userWidth])

  useEffect(() => {
    if (document.URL[document.URL.length - 1] === '/') {
      choosePage(SHOP_ROUTE, document.getElementById('about'), document.getElementById('brands'), document.getElementById('catalog'))
    }
  }, [document.URL])

  const choosePage = (route, element1, element2, element3) => {
    navigate(route)
    user.setSelectedTab(element3.id)
    element1.style.fontWeight = 'normal'
    element2.style.fontWeight = 'normal'
    element3.style.fontWeight = 'bold'
  }

  return (
        <>
            <Container className={`d-flex ${outerFlexDirection} align-items-center justify-content-between pt-5`}>
                <Image src={Logo} onClick={() => navigate(SHOP_ROUTE)} id='logo' style={{ cursor: 'pointer' }} />
                <Form className="d-flex" id='searchbar' onSubmit={(e) => search(e, query)}>
                    <Form.Control
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="search"
                        placeholder="Название товара"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button
                        variant="outline-success"
                        type="submit"
                    >
                        Искать
                    </Button>
                </Form>
            </Container>
            <Container className={`d-flex ${outerFlexDirection} justify-content-between mt-3`}>
                <div className={`d-flex ${innerFlexDirection}`}>
                    <Button
                        onClick={(e) => choosePage(ABOUT_ROUTE, document.getElementById('catalog'), document.getElementById('brands'), e.target)}
                        className='me-3'
                        style={{ ...TEXTBUTTON_STYLE, color: '#000', fontWeight: user.selectedTab === 'about' ? 'bold' : 'normal', transition: '0.05s', fontSize: '1.5rem' }}
                        id='about'
                    >
                        О нас
                    </Button>
                    <Button
                        onClick={(e) => choosePage(SHOP_ROUTE, document.getElementById('about'), document.getElementById('brands'), e.target)}
                        className='me-3'
                        style={{ ...TEXTBUTTON_STYLE, color: '#000', fontWeight: user.selectedTab === 'catalog' ? 'bold' : 'normal', transition: '0.05s', fontSize: '1.5rem' }}
                        id='catalog'
                    >
                        Каталог
                    </Button>
                    <Button
                        onClick={(e) => choosePage(BRANDS_ROUTE, document.getElementById('about'), document.getElementById('catalog'), e.target)}
                        style={{ ...TEXTBUTTON_STYLE, color: '#000', fontWeight: user.selectedTab === 'brands' ? 'bold' : 'normal', transition: '0.05s', fontSize: '1.5rem' }}
                        id='brands'
                    >
                        Бренды
                    </Button>
                </div>
                <div className={`d-flex ${innerFlexDirection} align-items-center`}>
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
