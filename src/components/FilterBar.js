import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { Accordion, Button, Card, Form, Modal } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/FilterBarStyles.css'
import { TEXTBUTTON_STYLE } from '../utils/uiConsts'

const FilterBar = observer(({ isCategoriesLoading, isBrandsLoading }) => {
  const { user, product } = useContext(Context)

  useEffect(() => {
    if (document.getElementsByClassName('filterBarChecked')[0]) {
      document.getElementsByClassName('filterBarChecked')[0].children[0].checked = true
    }
  }, [product.brands])

  const checkBrand = (e, brand) => {
    if (e.target.checked) {
      product.setSelectedBrands([...product.selectedBrands, brand])
    } else {
      product.setSelectedBrands(product.selectedBrands.filter(brandToDisplay => brand.id !== brandToDisplay.id))
    }
  }

  const [activeKey, setActiveKey] = useState()

  const categoryClick = (e, index, id) => {
    product.setSelectedCategoryIndex(index)
    const HTMLCollection = document.getElementsByClassName('categorybutton')
    // eslint-disable-next-line prefer-const
    for (let button of HTMLCollection) {
      button.style.fontWeight = 'normal'
    }
    e.target.style.fontWeight = 'bold'
    product.setSelectedCategory(id)
  }

  const [showCategories, setShowCategories] = useState(false)
  const [showBrands, setShowBrands] = useState(false)

  const handleShowCategories = () => setShowCategories(true)
  const handleCloseCategories = () => setShowCategories(false)

  const handleShowBrands = () => setShowBrands(true)
  const handleCloseBrands = () => setShowBrands(false)

  return (
    user.userWidth < 426
      ? <div className='d-flex inline-flex justify-content-between' style={{ margin: '0 40px', background: '#000', borderRadius: 5 }}>
          <Button onClick={() => handleShowCategories()} style={{ ...TEXTBUTTON_STYLE, width: '48%' }} className='filterbuttons'>Категории</Button>
            <Modal show={showCategories} onHide={handleCloseCategories} centered>
              <Modal.Header closeButton>
                <Modal.Title>Категории</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Accordion className='p-3' flush defaultActiveKey={product.selectedCategoryIndex} activeKey={activeKey}>
                    {
                      isCategoriesLoading
                        ? <Skeleton count={4} style={{ width: '80%' }} />
                        : product.categories.map((category, index) =>
                          category.subcategories
                            ? <Accordion.Item eventKey={index} key={category.id}>
                                <Accordion.Header
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveKey(index)
                                    if (category.subcategories) {
                                      categoryClick(e, index, category.subcategories.map(subcategory => subcategory.id))
                                    } else {
                                      categoryClick(e, index, category.id)
                                      handleCloseCategories()
                                    }
                                  }}
                                >
                                  <div
                                    className='categorybutton'
                                    style={{ width: '100%', height: '100%', fontWeight: product.selectedCategory.toString() === category.subcategories.map(subcategory => subcategory.id).toString() ? 'bold' : 'normal' }}
                                  >
                                    {category.name}
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {
                                    category.subcategories.map((subcategory, index1) =>
                                      subcategory.subcategories
                                        ? <Accordion.Item eventKey={index + '.' + index1} key={subcategory.id}>
                                          <Accordion.Header
                                            style={{ width: '90%', marginLeft: 'auto' }}
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              setActiveKey([index, index + '.' + index1])
                                              if (subcategory.subcategories) {
                                                categoryClick(e, index, subcategory.subcategories.map(subcategory => subcategory.id))
                                              } else {
                                                categoryClick(e, index, subcategory.id)
                                                handleCloseCategories()
                                              }
                                            }}
                                          >
                                            <div
                                              className='categorybutton'
                                              style={{ width: '100%', height: '100%', fontWeight: product.selectedCategory.toString() === subcategory.id.toString() ? 'bold' : 'normal' }}
                                            >
                                              {subcategory.name}
                                              </div>
                                          </Accordion.Header>
                                          <Accordion.Body>
                                            {
                                              subcategory.subcategories.map(subsubcategory =>
                                                  <div
                                                    className='categorybutton'
                                                    key={subsubcategory.id}
                                                    onClick={(e) => {
                                                      categoryClick(e, [index, index + '.' + index1], [subsubcategory.id])
                                                      handleCloseCategories()
                                                    }}
                                                    style={{ width: '80%', marginLeft: 'auto', padding: '6px 0 6px 8px', cursor: 'pointer', fontWeight: product.selectedCategory.length === 1 && product.selectedCategory[0] === subsubcategory.id ? 'bold' : 'normal' }}
                                                  >
                                                    {subsubcategory.name}
                                                  </div>
                                              )
                                            }
                                          </Accordion.Body>
                                        </Accordion.Item>
                                        : <div
                                          className='categorybutton'
                                          key={subcategory.id}
                                          onClick={(e) => {
                                            categoryClick(e, index, [subcategory.id])
                                            handleCloseCategories()
                                          }}
                                          style={{ width: '90%', marginLeft: 'auto', padding: '6px 0 6px 8px', cursor: 'pointer', fontWeight: product.selectedCategory.length === 1 && product.selectedCategory[0] === subcategory.id ? 'bold' : 'normal' }}
                                        >
                                          {subcategory.name}
                                        </div>
                                    )
                                  }
                                </Accordion.Body>
                              </Accordion.Item>
                            : <div
                                  className='categorybutton'
                                  key={category.id}
                                  onClick={(e) => categoryClick(e, index, [category.id])}
                                  style={{ padding: 7, fontSize: '1.1rem', cursor: 'pointer', fontWeight: product.selectedCategory.length === 1 && product.selectedCategory[0] === category.id ? 'bold' : 'normal' }}
                                >
                                {category.name}
                              </div>
                        )
                    }
                </Accordion>
              </Modal.Body>
            </Modal>
          <Button onClick={() => handleShowBrands()} style={{ ...TEXTBUTTON_STYLE, width: '48%' }} className='filterbuttons'>Бренды</Button>
            <Modal show={showBrands} onHide={handleCloseBrands} centered>
              <Modal.Header closeButton>
                <Modal.Title>Бренды</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className='mt-2' style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%', height: 285, overflowY: 'scroll', background: '#fff' }}>
                    {
                        isBrandsLoading
                          ? <>
                                <Skeleton count={12} style={{ width: '80%' }} />
                            </>
                          : product.brands.map(brand => {
                            return (
                              <>
                                {
                                  product.selectedBrands
                                    ? product.selectedBrands.map(brand => brand.name).includes(brand.name)
                                      ? <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} className="filterBarChecked" style={{ fontSize: '1.1rem' }} />
                                      : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} />
                                    : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} />
                                }
                              </>
                            )
                          })
                    }
                </Form>
              </Modal.Body>
            </Modal>
        </div>
      : <Card className='filterbar' style={{ width: '100%', padding: 4, border: 'none', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }}>
          <Accordion className='p-3' flush defaultActiveKey={product.selectedCategoryIndex} activeKey={activeKey}>
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }} className='filterCategory'>Категории:</span>
              {
                isCategoriesLoading
                  ? <Skeleton count={4} style={{ width: '80%' }} />
                  : product.categories.map((category, index) =>
                    category.subcategories
                      ? <Accordion.Item eventKey={index} key={category.id} id={`accordionitem${index}`}>
                          <Accordion.Header
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveKey(index)
                              if (category.subcategories) {
                                categoryClick(e, index, category.subcategories.map(subcategory => subcategory.id))
                              } else {
                                categoryClick(e, index, category.id)
                              }
                            }}
                          >
                            <div
                              className='categorybutton'
                              style={{ width: '100%', height: '100%', fontWeight: product.selectedCategory.toString() === category.subcategories.map(subcategory => subcategory.id).toString() ? 'bold' : 'normal' }}
                            >
                              {category.name}
                              </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            {
                              category.subcategories.map((subcategory, index1) =>
                                subcategory.subcategories
                                  ? <Accordion.Item eventKey={index + '.' + index1} key={subcategory.id}>
                                      <Accordion.Header
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setActiveKey([index, index + '.' + index1])
                                          if (subcategory.subcategories) {
                                            categoryClick(e, index, subcategory.subcategories.map(subcategory => subcategory.id))
                                          } else {
                                            categoryClick(e, index, subcategory.id)
                                          }
                                        }}
                                      >
                                        <div
                                          className='categorybutton'
                                          style={{ width: '100%', height: '100%', fontWeight: product.selectedCategory.toString() === subcategory.id.toString() ? 'bold' : 'normal' }}
                                        >
                                          {subcategory.name}
                                          </div>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        {
                                          subcategory.subcategories.map(subsubcategory =>
                                              <div
                                                className='categorybutton'
                                                key={subsubcategory.id}
                                                onClick={(e) => {
                                                  categoryClick(e, [index, index + '.' + index1], [subsubcategory.id])
                                                }}
                                                style={{ margin: '4px 0', padding: '6px 0', cursor: 'pointer', fontWeight: product.selectedCategory.length === 1 && product.selectedCategory[0] === subsubcategory.id ? 'bold' : 'normal' }}
                                              >
                                                {subsubcategory.name}
                                              </div>
                                          )
                                        }
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  : <div
                                      className='categorybutton'
                                      key={subcategory.id}
                                      onClick={(e) => {
                                        categoryClick(e, index, [subcategory.id])
                                      }}
                                      style={{ margin: '4px 0', padding: '6px 0', cursor: 'pointer', fontWeight: product.selectedCategory.length === 1 && product.selectedCategory[0] === subcategory.id ? 'bold' : 'normal' }}
                                    >
                                      {subcategory.name}
                                    </div>
                              )
                            }
                          </Accordion.Body>
                        </Accordion.Item>
                      : <div
                            className='categorybutton'
                            key={category.id}
                            onClick={(e) => {
                              categoryClick(e, index, [category.id])
                            }}
                            style={{ padding: 7, fontSize: '1.1rem', cursor: 'pointer', fontWeight: product.selectedCategory.length === 1 && product.selectedCategory[0] === category.id ? 'bold' : 'normal' }}
                          >
                          {category.name}
                        </div>
                  )
              }
          </Accordion>
          <hr />
          <div className='p-3'>
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }} className='filterCategory'>Бренды:</span>
            <Form className='mt-2' style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%', height: 300, overflowY: 'scroll', background: '#fff' }}>
                {
                    isBrandsLoading
                      ? <>
                            <Skeleton count={4} style={{ width: '80%' }} />
                        </>
                      : product.brands.map(brand => {
                        return (
                          <>
                            {
                              product.selectedBrands
                                ? product.selectedBrands.map(brand => brand.name).includes(brand.name)
                                  ? <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} className="filterBarChecked" style={{ fontSize: '1.1rem' }} />
                                  : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} />
                                : <Form.Check onClick={(e) => checkBrand(e, brand)} key={brand.id} label={brand.name.length > 20 ? brand.name.slice(0, 20) + '...' : brand.name} />
                            }
                          </>
                        )
                      })
                }
            </Form>
          </div>
        </Card>
  )
})

export default FilterBar
