import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import FoodShopLanding from './FoodShopLanding.page'
import { Products } from './Products.page'
import { Layout } from './Layout'
import { ProductDetail } from './ProductDetail'
import CartDetails from './ShoppingCartDetail.page'
import AdminProducts from './AdminPanel.page'

const rootRoute = createRootRoute({
	component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: FoodShopLanding,
})

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
})

const cartDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartDetails,
})

const adminPanelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminProducts,
})

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$productId',
  component: ProductDetail,
})

const routeTree = rootRoute.addChildren([indexRoute, productsRoute, productDetailRoute, cartDetailsRoute, adminPanelRoute])

export const router = createRouter({
  routeTree // Use routeTree instead of routeConfig
})

// Declare the router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}