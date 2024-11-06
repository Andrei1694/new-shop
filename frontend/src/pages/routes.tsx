import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import FoodShopLanding from './FoodShopLanding.page'
import { Products } from './Products.page'
import { Layout } from './Layout'
import { ProductDetail } from './ProductDetail'
import {ShoppingCart} from './ShoppingCart.page'
import {AdminPanel} from './AdminPanel.page'
import { Login } from './Login.page'
import { Register } from './Register.page'
import { MyProfile } from './Myprofile.page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const rootRoute = createRootRoute({
	component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: FoodShopLanding,
})

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
  loader: async () => {
    // Prefetch the query
    await queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: async () => {
        const response = await fetch('http://localhost:5000/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
		console.log(response)
        return response.json()
      }
    })

    // Return the query options to be used in the component
    return {
      queryKey: ['products']
    }
  },
})

const cartDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: ShoppingCart,
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
const adminPanelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPanel,
})
const routeTree = rootRoute.addChildren([indexRoute, productsRoute, productDetailRoute, cartDetailsRoute, adminPanelRoute, loginRoute, registerRoute, myProfileRoute])

export const router = createRouter({
  routeTree,
context: {
    queryClient,
  },
})

// Declare the router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}