import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { Context } from '../..'
import { PRIMARY_COLOR } from '../../utils/uiConsts'

function BrandCard (props) {
  const { user } = useContext(Context)

  const [gridTemplate, setGridTemplate] = useState('1fr 3fr')

  useEffect(() => {
    if (user.userWidth < 992) {
      setGridTemplate('1fr')
    } else if (user.userWidth >= 992) {
      setGridTemplate('1fr 3fr')
    }
  }, [user.userWidth])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.path.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: 'grid', gap: 30, gridTemplateColumns: gridTemplate }}>
        <div>
            <Image style={{ objectFit: 'contain', marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '100%' }} fluid src={props.path.image} />
        </div>
        <div>
            <h4>Brand description</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.followBrand} style={{ background: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}>Перейти в каталог бренда</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BrandCard
