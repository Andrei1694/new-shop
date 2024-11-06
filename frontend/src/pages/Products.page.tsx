import React, { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useQuery } from '@tanstack/react-query'
import { productsRoute } from './routes'

// Mock product data
const allProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `This is a description for Product ${i + 1}`,
  price: (Math.random() * 100 + 1).toFixed(2),
  image: `/placeholder.svg?height=200&width=200&text=Product+${i + 1}`,
}))

const ITEMS_PER_PAGE = 12

export function Products() {
	const { queryKey } = productsRoute.useLoaderData()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [paginatedProducts, setPaginatedProducts] = React.useState<any[]>([])
  const { data: products } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      return response.json()
    },
    staleTime: 1000 * 60,
  })

  const totalPages = products ? Math.ceil(products.length / ITEMS_PER_PAGE) : 0

  useEffect(() => {
    if (products) {
      setPaginatedProducts(products.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ))
    }
  }, [currentPage, products])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Link to={`/products/${product.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}