import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { createCategory } from '../http/productAPI';

const CreateCategory = ({show, onHide}) => {
    const [value, setValue] = useState('');

    const addCategory = () => {
        createCategory({name: value})
            .then(data => {
                setValue('');
                onHide();
            })
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
                    Добавить новую категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название категории"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addCategory}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;