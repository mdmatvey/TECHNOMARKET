import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/routeConsts'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { SECONDARY_COLOR, NAVLINK_STYLE } from '../utils/uiConsts'

const NavBar = observer(() => {
  const navigate = useNavigate()

  return (
        <Navbar
            bg="light"
            expand="lg"
            className="d-flex flex-column"
            style={{ padding: 0 }}
        >
            <Container
                className="pt-2 pb-2"
                style={{ background: SECONDARY_COLOR }}
                fluid
            >
                <Navbar.Brand onClick={() => navigate(SHOP_ROUTE)} style={{ cursor: 'pointer' }}>COMPANY NAME</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto">
                        <Button
                            className="ms-2 me-2"
                            style={NAVLINK_STYLE}
                        >
                            Адрес
                        </Button>
                        <Button
                            style={NAVLINK_STYLE}
                            lassName="ms-2 me-2"
                        >
                            Контакты
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
})

export default NavBar
