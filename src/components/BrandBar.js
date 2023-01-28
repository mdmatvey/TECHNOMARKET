import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Form, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Logo from '../logo.svg'

const BrandBar = observer(() => {
  return (
        <Container className='d-flex align-items-center justify-content-between pt-5'>
            <Image src={Logo} />
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
  )
})

export default BrandBar
