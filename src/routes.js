import { BRANDS_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE, ABOUT_ROUTE } from './utils/routeConsts'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Brands from './pages/Brands'
import About from './pages/About'

export const publicRoutes = [
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
  },
  {
    path: ABOUT_ROUTE,
    Component: About
  }
]
