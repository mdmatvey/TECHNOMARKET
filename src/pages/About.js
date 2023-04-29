import React, { useContext } from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PRIMARY_COLOR } from '../utils/uiConsts'
import { ImHome3, ImInfo } from 'react-icons/im'
import { Context } from '..'

const About = () => {
  const { user } = useContext(Context)
  user.setSelectedTab('about')

  return (
        <>
          <Container>
            <Breadcrumb className="pt-3">
              <Breadcrumb.Item active>
                <Link
                  to="/"
                  className='d-flex align-items-center'
                  style={{ textDecoration: 'none', color: PRIMARY_COLOR }}
                >
                  <ImHome3 />&nbsp;Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                <Link
                  to=""
                  className='d-flex align-items-center'
                  style={{ textDecoration: 'none', color: 'gray', cursor: 'default' }}
                >
                  <ImInfo />&nbsp;About
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Container>
           About
        </>
  )
}

export default About
