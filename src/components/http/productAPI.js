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
export const fetchProducts = async (subCategoryID, brands, page, limit = 8) => {
  const response = await fetch(`https://fakestoreapi.com/products/?subCategoryID=${subCategoryID}&brands=${brands}&limit=${limit}&page=${page}`) // URL API АДРЕСА
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
