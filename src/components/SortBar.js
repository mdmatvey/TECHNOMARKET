import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import { Context } from '..'
import { TEXTBUTTON_STYLE } from '../utils/uiConsts'
import { TiThList, TiThLarge } from 'react-icons/ti'

const SortdBar = observer(() => {
  const { user, product } = useContext(Context)

  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    if (user.userWidth < 992) {
      setDropdown(true)
    } else if (user.userWidth >= 992) {
      setDropdown(false)
    }
  }, [user.userWidth])

  const itemsOnPage = (e, num) => {
    product.setLimit(num)
    document.getElementById('four').style.fontWeight = 'normal'
    document.getElementById('eight').style.fontWeight = 'normal'
    document.getElementById('twelve').style.fontWeight = 'normal'
    document.getElementById('all').style.fontWeight = 'normal'
    e.target.style.fontWeight = 'bold'
  }

  const listType = (bool, element1, element2) => {
    product.setDisplayGrid(bool)
    element1.style.color = '#fff'
    element2.style.color = 'gray'
  }

  return (
        <Row className="d-flex" style={{ background: '#000', color: '#fff', fontSize: '1.1rem', width: '100%', margin: '0 auto', padding: '4px 8px', borderRadius: 5 }}>
            <div className="d-flex align-items-center col-md-6" style={{ width: '100%' }}>
                {
                    dropdown
                      ? <div className='d-flex justify-content-between' style={{ width: '100%' }}>
                            <DropdownButton variant="secondary" title="Сортировать по">
                                <Dropdown.Item>
                                    <Button style={TEXTBUTTON_STYLE}>наличие</Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button style={TEXTBUTTON_STYLE}>цена</Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button style={TEXTBUTTON_STYLE}>срок</Button>
                                </Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton variant="secondary" title="На странице">
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 4)}
                                        id="four"
                                        style={TEXTBUTTON_STYLE}
                                    >
                                        4
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 8)}
                                        id="eight"
                                        style={{ ...TEXTBUTTON_STYLE, color: '#fff', fontSize: 'bold' }}
                                    >
                                        8
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 12)}
                                        id="twelve"
                                        style={{ ...TEXTBUTTON_STYLE, color: '#fff' }}
                                    >
                                        12
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 20)}
                                        id="all"
                                        style={{ ...TEXTBUTTON_STYLE, color: '#fff' }}
                                    >
                                        Все
                                    </Button>
                                </Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton variant="secondary" title="Вид">
                                <Dropdown.Item>
                                    <Button onClick={(e) => listType(true, document.getElementById('grid'), document.getElementById('list'))} style={TEXTBUTTON_STYLE}>
                                        <TiThLarge id="grid" />
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
                                <Button style={TEXTBUTTON_STYLE}>наличие</Button>
                                <Button style={TEXTBUTTON_STYLE}>цена</Button>
                                <Button style={TEXTBUTTON_STYLE}>срок</Button>
                            </span>
                            <span className="d-flex align-items-center">
                                На странице:
                                <Button
                                    onClick={(e) => itemsOnPage(e, 4)}
                                    id="four"
                                    style={TEXTBUTTON_STYLE}
                                >
                                    4
                                </Button>
                                <Button
                                    onClick={(e) => itemsOnPage(e, 8)}
                                    id="eight"
                                    style={{ ...TEXTBUTTON_STYLE, fontWeight: 'bold' }}
                                >
                                    8
                                </Button>
                                <Button
                                    onClick={(e) => itemsOnPage(e, 12)}
                                    id="twelve"
                                    style={TEXTBUTTON_STYLE}
                                >
                                    12
                                </Button>
                                <Button
                                    onClick={(e) => itemsOnPage(e, 20)}
                                    id="all"
                                    style={TEXTBUTTON_STYLE}
                                >
                                    Все
                                </Button>
                            </span>
                            <span className='d-flex align-items-baseline'>
                                Вид:
                                <Button onClick={(e) => listType(true, document.getElementById('grid'), document.getElementById('list'))} style={TEXTBUTTON_STYLE}>
                                    <TiThLarge id="grid" />
                                </Button>
                                <Button onClick={(e) => listType(false, document.getElementById('list'), document.getElementById('grid'))} style={TEXTBUTTON_STYLE}>
                                    <TiThList id="list" style={{ color: 'gray' }} />
                                </Button>
                            </span>
                        </div>
                }
            </div>
        </Row>
  )
})

export default SortdBar
