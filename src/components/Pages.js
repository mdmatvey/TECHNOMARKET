import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'

const Pages = observer(() => {
  const { user, product } = useContext(Context)

  const [paginationStyle, setPaginationStyle] = useState({});

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

  useEffect(() => {
    if (user.userWidth < 768) {
      setPaginationStyle({
        justifyContent: 'center'
      })
    } else if (user.userWidth >= 768) {
      setPaginationStyle({})
    }
  }, [user.userWidth])

  return (
        <Pagination className='mt-5' style={paginationStyle}>
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
