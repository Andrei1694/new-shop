import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import FoodShopLanding from './FoodShopLanding.page'
import { Products } from './Products.page'
import { Layout } from './Layout'
import { ProductDetail } from './ProductDetail'
import {ShoppingCart} from './ShoppingCart.page'
import AdminProducts from './AdminPanel.page'
import { Login } from './Login.page'
import { Register } from './Register.page'
import { MyProfile } from './Myprofile.page'

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
  component: ShoppingCart,
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

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

const myProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/myprofile',
  component: MyProfile,
})

const routeTree = rootRoute.addChildren([indexRoute, productsRoute, productDetailRoute, cartDetailsRoute, adminPanelRoute, loginRoute, registerRoute, myProfileRoute])

export const router = createRouter({
  routeTree // Use routeTree instead of routeConfig
})

// Declare the router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}