import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import { Context } from '..'
import { TEXTBUTTON_STYLE } from '../utils/uiConsts'

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

  return (
        <Row className="d-flex" style={{ background: '#a8a8a8', width: '100%', margin: '0 auto' }}>
            <div className="d-flex align-items-center col-md-6" style={{ width: '100%' }}>
                {
                    dropdown
                      ? <div className='d-flex justify-content-between' style={{ width: '100%' }}>
                        <DropdownButton variant="secondary" title="Сортировать по">
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Button style={TEXTBUTTON_STYLE}>наличие</Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button style={TEXTBUTTON_STYLE}>цена</Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button style={TEXTBUTTON_STYLE}>срок</Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </DropdownButton>

                        <DropdownButton variant="secondary" title="На странице">
                            <Dropdown.Menu>
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
                                        style={{ color: '#000', background: 'none', border: 'none', borderRadius: '0', fontWeight: 'bold' }}
                                    >
                                        8
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 12)}
                                        id="twelve"
                                        style={TEXTBUTTON_STYLE}
                                    >
                                        12
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Button
                                        onClick={(e) => itemsOnPage(e, 20)}
                                        id="all"
                                        style={TEXTBUTTON_STYLE}
                                    >
                                        Все
                                    </Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                         </DropdownButton>
                    </div>
                      : <>
                        Сортировать по:
                        <Button style={TEXTBUTTON_STYLE}>наличие</Button>
                        <Button style={TEXTBUTTON_STYLE}>цена</Button>
                        <Button style={TEXTBUTTON_STYLE}>срок</Button>
                        <span className="d-flex align-items-center" style={{ display: 'block', marginLeft: 'auto' }}>
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
                                style={{ color: '#000', background: 'none', border: 'none', borderRadius: '0', fontWeight: 'bold' }}
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
                    </>
                }
            </div>
        </Row>
  )
})

export default SortdBar
