import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Spinner, Form, Modal, Row } from 'react-bootstrap'
import { Context } from '../../index'
import { createProduct, fetchBrands, fetchCategories } from '../http/productAPI'
import { PRIMARY_COLOR } from '../../utils/uiConsts'

const CreateProduct = observer(({ show, onHide }) => {
  const { product } = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [isBrandsLoading, setIsBrandsLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
      .then(data => {
        product.setCategories(data)
        setIsCategoriesLoading(false)
      })

    fetchBrands()
      .then(data => {
        product.setBrands(data)
        setIsBrandsLoading(false)
      })
  }, [])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addProduct = () => {
    // const formData = new FormData()
    // formData.append('title', name);
    // formData.append('price', price);
    // formData.append('description', `${info[0].title}: ${info[0].description}`);
    // formData.append('category', product.selectedCategory.name);

    // createProduct(formData)
    //     .then(data => onHide())

    const data = {
      title: name,
      price,
      description: `${info[0].title}: ${info[0].description}`,
      category: product.selectedCategory.name
    }

    createProduct(data)
      .then(data => onHide())

    product.setSelectedCategory({})
    product.setSelectedBrand({})
    setName('')
    setPrice('')
    setFile(null)
    setInfo([])
  }

  return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown
                        className="mt-2 mb-2"
                    >
                        <Dropdown.Toggle>{product.selectedCategory.name || 'Выберите категорию'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                isCategoriesLoading
                                  ? <Spinner style={{ display: 'block', margin: '0 auto', color: PRIMARY_COLOR }} />
                                  : product.categories.map(category =>
                                        <Dropdown.Item
                                            onClick={() => product.setSelectedCategory(category)}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </Dropdown.Item>
                                  )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{product.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                isBrandsLoading
                                  ? <Spinner style={{ display: 'block', margin: '0 auto', color: PRIMARY_COLOR }} />
                                  : product.brands.map(brand =>
                                        <Dropdown.Item
                                            onClick={() => product.setSelectedBrand(brand)}
                                            key={brand.id}
                                        >
                                            {brand.name}
                                        </Dropdown.Item>
                                  )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название товара"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость товара"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Добавить новую характеристику
                    </Button>
                    {
                        info.map(i =>
                            <Row className="mt-3" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder="Введите название характеристики"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder="Введите описание характеристики"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        onClick={() => removeInfo(i.number)}
                                        variant={'outline-danger'}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
  )
})

export default CreateProduct
