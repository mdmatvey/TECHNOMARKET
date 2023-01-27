import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { PRIMARY_COLOR } from '../utils/uiConsts'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoIosMail } from 'react-icons/io'
import NavBarStyles from '../styles/NavBarStyles.css'

const NavBar = observer(() => {
  return (
        <Navbar
            bg="light"
            expand="lg"
            className="d-flex flex-column"
            style={{ padding: 0, margin: 0 }}
            id="nav"
        >
            <Container
                className="d-flex pt-2 pb-2"
                style={{ background: PRIMARY_COLOR }}
            >
                <div style={{ width: '40%', marginLeft: 0, marginRight: 'auto' }}>
                    <Nav className='d-inline-flex w-100 justify-content-between'>
                        <div
                            className='d-flex align-items-baseline'
                            style={{ color: '#fff' }}
                        >
                            <BsFillTelephoneFill className='me-2' />
                            <span style={{ fontSize: '1.25rem' }}>Номер телефона</span>
                        </div>
                        <div
                            className='d-flex align-items-end'
                            style={{ color: '#fff' }}
                        >
                            <IoIosMail className='me-2' fontSize={'1.75rem'} />
                            <Link
                                to="mailto:info@Technomarket.com"
                                style={{ color: '#fff', textDecoration: 'none' }}
                            >
                                <span style={{ fontSize: '1.25rem' }} >info@Technomarket.com</span>
                            </Link>
                        </div>
                    </Nav>
                </div>
            </Container>
        </Navbar>
  )
})

export default NavBar
