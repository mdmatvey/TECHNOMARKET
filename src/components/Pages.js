import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'

const Pages = observer(() => {
  const { product } = useContext(Context)

  const pageCount = Math.ceil(product.totalCount / product.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  const midLow = Math.ceil(pageCount / 2) - 1
  const mid = Math.ceil(pageCount / 2)
  const midHigh = Math.ceil(pageCount / 2) + 1

  return (
    Math.ceil(product.totalCount / product.limit) > 10
      ? <Pagination className='mt-5' style={{ justifyContent: 'center' }}>
          <Pagination.Prev
            onClick={() => {
              if (product.page !== 1) { product.setPage(product.page - 1) }
            }}
          />
          <Pagination.Item
            key={1}
            active={product.page === 1}
            onClick={() => product.setPage(1)}
          >
            {1}
          </Pagination.Item>
          <Pagination.Ellipsis disabled />

          <Pagination.Item
            key={midLow}
            active={product.page === midLow}
            onClick={() => product.setPage(midLow)}
          >
            {midLow}
          </Pagination.Item>
          <Pagination.Item
            key={mid}
            active={product.page === mid}
            onClick={() => product.setPage(mid)}
          >
            {mid}
          </Pagination.Item>
          <Pagination.Item
            key={midHigh}
            active={product.page === midHigh}
            onClick={() => product.setPage(midHigh)}
          >
            {midHigh}
          </Pagination.Item>

          <Pagination.Ellipsis disabled />
          <Pagination.Item
            key={pageCount}
            active={product.page === pageCount}
            onClick={() => product.setPage(pageCount)}
          >
            {pageCount}
          </Pagination.Item>
          <Pagination.Next
            onClick={() => {
              if (product.page !== pageCount) { product.setPage(product.page + 1) }
            }}
          />
        </Pagination>
      : <Pagination className='mt-5' style={{ justifyContent: 'center' }}>
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
