export const createCategory = async (category) => {
  fetch('https://api.storerestapi.com/categories',
    {
      method: 'POST',
      body: JSON.stringify({
        name: category.name
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

export const fetchCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories')
  const responseJSON = await response.json()

  responseJSON.push('category5', 'category6', 'category7', 'category8')

  const responseObj = []
  responseJSON.map((category, index) => {
    responseObj[index] = {
      id: index,
      name: category,
      image: 'http://via.placeholder.com/640x360'
    }
  })

  return responseObj
}

export const createBrand = async (brand) => {
  fetch('https://api.storerestapi.com/categories',
    {
      method: 'POST',
      body: JSON.stringify({
        name: brand.name
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => {
      json.message = 'Success! Brand created'
      console.log(json)
    })
}

export const fetchBrands = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories')
  let responseJSON = await response.json()

  responseJSON = ['brand1', 'brand2', 'brand3', 'brand4', 'brand5', 'brand6', 'brand7', 'brand8']

  const responseObj = []
  responseJSON.map((category, index) => {
    responseObj[index] = {
      id: index,
      name: category,
      image: 'http://via.placeholder.com/640x360'
    }
  })

  return responseObj
}

export const createProduct = async (product) => {
  fetch('https://api.storerestapi.com/products',
    {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))
}

export const fetchProducts = async (categoryId, brandId, page, limit = 8) => {
  const response = await fetch('https://fakestoreapi.com/products?limit=' + limit)
  const responseJSON = await response.json()
  responseJSON.map(product => {
    product.count = 1
    product.brand = 'brand1'
  })

  return responseJSON
}

export const fetchOneProduct = async (id) => {
  const response = await fetch('https://fakestoreapi.com/products/' + id)
  const responseJSON = await response.json()
  responseJSON.count = 1

  return responseJSON
}

export const fetchSortProductsPrice = async (order) => {
  const response = await fetch(`https://fakestoreapi.com/products?sort=${order}`)
  const responseJSON = await response.json()

  return responseJSON
}

export const fetchSortProductsPopularity = async (order) => {
  const response = await fetch(`https://fakestoreapi.com/products?sort=${order}`)
  const responseJSON = await response.json()

  return responseJSON
}

export const searchProducts = async (searchQuery) => {
  const response = await fetch('https://fakestoreapi.com/products?query=' + searchQuery)
  const responseJSON = await response.json()

  return responseJSON
}
