import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import { Context } from '..'
import { TEXTBUTTON_STYLE } from '../utils/uiConsts'
import { fetchSortProductsPrice, fetchSortProductsPopularity } from './http/productAPI'
import { TiThList, TiThLarge } from 'react-icons/ti'
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'
import SortBarStyles from '../styles/SortBarStyles.css'

let i = 1
let j = 1

const SortdBar = observer(({ setIsProductsLoading }) => {
  const { user, product } = useContext(Context)

  const [dropdown, setDropdown] = useState(false)

  const [flexDirection, setFlexDirection] = useState('flex-row')

  useEffect(() => {
    if (user.userWidth < 1200) {
      setDropdown(true)
    } else if (user.userWidth >= 1200) {
      setDropdown(false)
    }
  }, [user.userWidth])

  useEffect(() => {
    if (user.userWidth < 500) {
      setFlexDirection('flex-column')
    } else if (user.userWidth >= 500) {
      setFlexDirection('flex-row')
    }
  }, [user.userWidth])

  const itemsOnPage = (e, num) => {
    product.setLimit(num)
    document.getElementById('twelve').style.color = 'gray'
    document.getElementById('twenty_four').style.color = 'gray'
    document.getElementById('forty_eight').style.color = 'gray'
    e.target.style.color = '#fff'
  }

  const listType = (bool, element1, element2) => {
    product.setDisplayGrid(bool)
    element2.style.color = 'gray'
    if (dropdown) {
      element1.style.color = '#000'
    } else {
      element1.style.color = '#fff'
    }
  }

  const [priceCaretUpDisplay, setPrcieCaretUpDisplay] = useState({ display: 'none' })
  const [priceCaretDownDisplay, setPrcieCaretDownDisplay] = useState({ display: 'none' })
  const [popularityCaretUpDisplay, setPopularityCaretUpDisplay] = useState({ display: 'none' })
  const [popularityCaretDownDisplay, setPopularityCaretDownDisplay] = useState({ display: 'inline-block' })

  const priceSort = () => {
    if (dropdown) {
      document.getElementById('popularity-dropdown').style.color = 'gray'
      document.getElementById('price-dropdown').style.color = '#000'
    } else {
      document.getElementById('popularity').style.color = 'gray'
      document.getElementById('price').style.color = '#fff'
    }

    if (i + 1 === 2) {
      i++
      setIsProductsLoading(true)
      fetchSortProductsPrice('desc')
        .then(data => {
          product.setProducts(data)
          setIsProductsLoading(false)
        })
      setPrcieCaretDownDisplay({ display: 'inline-block' })
      setPrcieCaretUpDisplay({ display: 'none' })
      setPopularityCaretDownDisplay({ display: 'none' })
      setPopularityCaretUpDisplay({ display: 'none' })
    } else if (i + 1 === 3) {
      i = 1
      setIsProductsLoading(true)
      fetchSortProductsPrice('asc')
        .then(data => {
          product.setProducts(data)
          setIsProductsLoading(false)
        })
      setPrcieCaretDownDisplay({ display: 'none' })
      setPrcieCaretUpDisplay({ display: 'inline-block' })
      setPopularityCaretDownDisplay({ display: 'none' })
      setPopularityCaretUpDisplay({ display: 'none' })
    }
  }

  const popularitySort = () => {
    if (dropdown) {
      document.getElementById('popularity-dropdown').style.color = '#000'
      document.getElementById('price-dropdown').style.color = 'gray'
    } else {
      document.getElementById('popularity').style.color = '#fff'
      document.getElementById('price').style.color = 'gray'
    }

    if (j + 1 === 2) {
      j++
      setIsProductsLoading(true)
      fetchSortProductsPopularity('desc')
        .then(data => {
          product.setProducts(data)
          setIsProductsLoading(false)
        })
      setPrcieCaretDownDisplay({ display: 'none' })
      setPrcieCaretUpDisplay({ display: 'none' })
      setPopularityCaretDownDisplay({ display: 'inline-block' })
      setPopularityCaretUpDisplay({ display: 'none' })
    } else if (j + 1 === 3) {
      j = 1
      setIsProductsLoading(true)
      fetchSortProductsPopularity('asc')
        .then(data => {
          product.setProducts(data)
          setIsProductsLoading(false)
        })
      setPrcieCaretDownDisplay({ display: 'none' })
      setPrcieCaretUpDisplay({ display: 'none' })
      setPopularityCaretDownDisplay({ display: 'none' })
      setPopularityCaretUpDisplay({ display: 'inline-block' })
    }
  }

  return (
        <Row className="d-flex" style={{ background: '#000', color: '#fff', fontSize: '1.1rem', width: '100%', margin: '0 auto', padding: '4px 8px', borderRadius: 5 }} id='brandbar'>
            <div className="d-flex align-items-center col-md-6" style={{ width: '100%' }}>
                {
                    dropdown
                      ? <div className={`d-flex ${flexDirection} justify-content-between`} style={{ width: '100%' }}>
                            <DropdownButton title="Сортировать по">
                                <Dropdown.Item>
                                    <Button
                                        onClick={() => priceSort()}
                                        style={{ ...TEXTBUTTON_STYLE, color: 'gray' }}
                                        id='price-dropdown'
                                    >
                                        цена <BsCaretDownFill style={{ ...priceCaretDownDisplay, fontSize: '1rem' }} /> <BsCaretUpFill style={{ ...priceCaretUpDisplay, fontSize: '1rem' }} />
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button
                                        onClick={() => popularitySort()}
                                        style={{ ...TEXTBUTTON_STYLE, color: '#000' }}
                                        id='popularity-dropdown'
                                    >
                                        популярность <BsCaretDownFill style={{ ...popularityCaretDownDisplay, fontSize: '1rem' }} /> <BsCaretUpFill style={{ ...popularityCaretUpDisplay, fontSize: '1rem' }} />
                                    </Button>
                                </Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton title="На странице">
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 12)}
                                        id="twelve"
                                        style={{ ...TEXTBUTTON_STYLE, color: '#000' }}
                                    >
                                        12
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 24)}
                                        id="twenty_four"
                                        style={{ ...TEXTBUTTON_STYLE, color: '#000', fontWeight: 'bold' }}
                                    >
                                        24
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 48)}
                                        id="forty_eight"
                                        style={{ ...TEXTBUTTON_STYLE, color: '#000' }}
                                    >
                                        48
                                    </Button>
                                </Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton title="Вид">
                                <Dropdown.Item>
                                    <Button onClick={(e) => listType(true, document.getElementById('grid'), document.getElementById('list'))} style={TEXTBUTTON_STYLE}>
                                        <TiThLarge id="grid" style={{ color: 'black' }} />
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button onClick={(e) => listType(false, document.getElementById('list'), document.getElementById('grid'))} style={TEXTBUTTON_STYLE}>
                                        <TiThList id="list" style={{ color: 'gray' }} />
                                    </Button>
                                </Dropdown.Item>
                        </DropdownButton>
                        </div>
                      : <div className='d-flex justify-content-between w-100'>
                            <span className='d-flex align-items-baseline'>
                                Сортировать по:
                                <Button
                                    onClick={() => priceSort()}
                                    style={{ ...TEXTBUTTON_STYLE, color: 'gray' }}
                                    id='price'
                                >
                                    цена <BsCaretDownFill style={{ ...priceCaretDownDisplay, fontSize: '1rem' }} /> <BsCaretUpFill style={{ ...priceCaretUpDisplay, fontSize: '1rem' }} />
                                </Button>
                                <Button
                                    onClick={() => popularitySort()}
                                    style={TEXTBUTTON_STYLE}
                                    id='popularity'
                                >
                                    популярность <BsCaretDownFill style={{ ...popularityCaretDownDisplay, fontSize: '1rem' }} /> <BsCaretUpFill style={{ ...popularityCaretUpDisplay, fontSize: '1rem' }} />
                                </Button>
                            </span>
                            <span className="d-flex align-items-center">
                                На странице:
                                <Button
                                    onClick={(e) => itemsOnPage(e, 12)}
                                    id="twelve"
                                    style={{ ...TEXTBUTTON_STYLE, color: 'gray' }}
                                >
                                    12
                                </Button>
                                <Button
                                    onClick={(e) => itemsOnPage(e, 24)}
                                    id="twenty_four"
                                    style={{ ...TEXTBUTTON_STYLE, color: '#fff' }}
                                >
                                    24
                                </Button>
                                <Button
                                    onClick={(e) => itemsOnPage(e, 48)}
                                    id="forty_eight"
                                    style={{ ...TEXTBUTTON_STYLE, color: 'gray' }}
                                >
                                    48
                                </Button>
                            </span>
                            <span className='d-flex align-items-baseline'>
                                Вид:
                                <Button onClick={(e) => listType(true, document.getElementById('grid'), document.getElementById('list'))} style={TEXTBUTTON_STYLE}>
                                    <TiThLarge id="grid" style={{ transition: '0.25s' }} />
                                </Button>
                                <Button onClick={(e) => listType(false, document.getElementById('list'), document.getElementById('grid'))} style={TEXTBUTTON_STYLE}>
                                    <TiThList id="list" style={{ color: 'gray', transition: '0.25s' }} />
                                </Button>
                            </span>
                        </div>
                }
            </div>
        </Row>
  )
})

export default SortdBar
