import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'

const Pages = observer(() => {
  const { product } = useContext(Context);

  (async function getTotalProductCount () {
    const response = await fetch('https://fakestoreapi.com/products')
    const responseJSON = await response.json()

    product.setTotalCount(responseJSON.length)
  })()

  const pageCount = Math.ceil(product.totalCount / product.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
        <Pagination className='mt-5'>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={product.page === page}
                    onClick={() => product.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
  )
})

export default Pages
