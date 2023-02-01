// ПОЛУЧИТЬ ВСЕ КАТЕГОРИИ
export const fetchCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories') // URL API ЗАПРОСА
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ ВСЕ БРЕНДЫ
export const fetchBrands = async () => {
  const response = await fetch('https://fakestoreapi.com/products/brands') // URL API ЗАПРОСА
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ ПРОДУКТЫ
export const fetchProducts = async (categoryID, brands, page, limit = 8) => {
  const data = {
    categoryID, // [number] - id категории товары которой нужно получить
    brands, // [array] - массив из id брендов товары которых нужно получить
    page, // [number] - текущая страница
    limit // [number] - количество товаров на странице пагинации
  }

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch('https://fakestoreapi.com/products/', options) // URL API АДРЕСА
  const responseJSON = await response.json()

  return responseJSON
}

// ПОИСК ПО ПРОДУКТАМ
export const fetchFoundProducts = async (query) => {
  const response = await fetch(`https://fakestoreapi.com/products/search?query=${query}`) // URL API АДРЕСА + ПОИСКОВОЙ ЗАПРОС
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ КОНКРЕТНЫЙ ПРОДУКТ
export const fetchOneProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`) // URL API АДРЕСА + ID ТОВАРА
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ СОРТИРОВКУ ПО ЦЕНЕ
export const fetchSortProductsPrice = async (order) => {
  const response = await fetch(`https://fakestoreapi.com/products?sort=${order}`) // order === 'asc / 'desc'
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ СОРТИРОВКУ ПО ПОПУЛЯРНОСТИ
export const fetchSortProductsPopularity = async (order) => {
  const response = await fetch(`https://fakestoreapi.com/products?sort=${order}`) // order === 'asc / 'desc'
  const responseJSON = await response.json()

  return responseJSON
}
