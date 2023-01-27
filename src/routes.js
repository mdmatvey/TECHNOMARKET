import { CATEGORIES_ROUTE, BRANDS_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE } from './utils/routeConsts'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Categories from './pages/Categories'
import Brands from './pages/Brands'

export const publicRoutes = [
  {
    path: CATEGORIES_ROUTE,
    Component: Categories
  },
  {
    path: BRANDS_ROUTE,
    Component: Brands
  },
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: ProductPage
  }
]
