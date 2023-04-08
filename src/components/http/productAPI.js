// ПОЛУЧИТЬ ВСЕ КАТЕГОРИИ
export const fetchCategories = async () => {
  const response = await fetch('https://technomarket-spb.ru/api/categories/') // URL API ЗАПРОСА
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ ВСЕ БРЕНДЫ
export const fetchBrands = async () => {
  const response = await fetch('https://technomarket-spb.ru/api/brands/') // URL API ЗАПРОСА
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ ПРОДУКТЫ
export const fetchProducts = async (query, subCategoryID, brands, page, limit) => {
  let string = `https://technomarket-spb.ru/api/products/?page=${page}&page_size=${limit}`

  if (query) {
    string += `&search=${query}`
  }

  if (subCategoryID) {
    string += `&category_id__in=${subCategoryID}`
  }

  if (brands) {
    string += `&brand__in=${brands}`
  }

  const response = await fetch(string) // URL API АДРЕСА
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ КОНКРЕТНЫЙ ПРОДУКТ
export const fetchOneProduct = async (id) => {
  const response = await fetch(`https://technomarket-spb.ru/api/product/${id}`) // URL API АДРЕСА + ID ТОВАРА
  const responseJSON = await response.json()

  return responseJSON
}

// ПОЛУЧИТЬ СОРТИРОВКУ ПО ЦЕНЕ
export const fetchSortProductsPrice = async (order) => {
  // const response = await fetch(`https://fakestoreapi.com/products?sort=${order}`) // order === 'asc / 'desc'
  // const responseJSON = await response.json()

  // return responseJSON
}

// ПОЛУЧИТЬ СОРТИРОВКУ ПО ПОПУЛЯРНОСТИ
export const fetchSortProductsPopularity = async (order) => {
  // const response = await fetch(`https://fakestoreapi.com/products?sort=${order}`) // order === 'asc / 'desc'
  // const responseJSON = await response.json()

  // return responseJSON
}
