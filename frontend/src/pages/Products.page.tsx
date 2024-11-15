import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, ChevronDown } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useQuery } from '@tanstack/react-query'
import { productsRoute } from './routes'
import { useToast } from "../hooks/use-toast"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

const ITEMS_PER_PAGE = 12

type FilterValue = string | number | boolean;

interface Filter {
  [key: string]: FilterValue[];
}

type SortOption = {
  field: string;
  direction: 'asc' | 'desc';
}

export function Products() {
  const { queryKey } = productsRoute.useLoaderData()
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filter>({})
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'name', direction: 'asc' })
  const { toast } = useToast()

  const { data: products, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      return response.json()
    },
    staleTime: 1000 * 60,
  })

  const filterProducts = (products: any[]) => {
    return products.filter(product => 
      Object.entries(filters).every(([key, values]) => 
        values.length === 0 || values.includes(product[key])
      )
    )
  }

  const sortProducts = (products: any[]) => {
    return [...products].sort((a, b) => {
      if (a[sortOption.field] < b[sortOption.field]) return sortOption.direction === 'asc' ? -1 : 1
      if (a[sortOption.field] > b[sortOption.field]) return sortOption.direction === 'asc' ? 1 : -1
      return 0
    })
  }

  const filteredProducts = products ? filterProducts(products) : []
  const sortedProducts = sortProducts(filteredProducts)
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleFilterChange = (field: string, value: FilterValue) => {
    setFilters(prevFilters => {
      const fieldFilters = prevFilters[field] || []
      const updatedFilters = fieldFilters.includes(value)
        ? fieldFilters.filter(v => v !== value)
        : [...fieldFilters, value]
      
      return {
        ...prevFilters,
        [field]: updatedFilters
      }
    })
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-')
    setSortOption({ field, direction: direction as 'asc' | 'desc' })
    setCurrentPage(1)
  }

  const getUniqueValues = (field: string) => {
    if (!products) return []
    return Array.from(new Set(products.map(product => product[field])))
  }

  const filterableFields = products ? Object.keys(products[0]).filter(key => 
    typeof products[0][key] !== 'object' && key !== 'id' && key !== 'image'
  ) : []

  const sortableFields = filterableFields.filter(field => 
    typeof products?.[0][field] === 'string' || typeof products?.[0][field] === 'number'
  )

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        {filterableFields.map(field => (
          <Popover key={field}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="capitalize">
                {field} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <ScrollArea className="h-[200px]">
                {getUniqueValues(field).map(value => (
                  <div className="flex items-center space-x-2 p-2" key={`${field}-${value}`}>
                    <Checkbox
                      id={`${field}-${value}`}
                      checked={filters[field]?.includes(value)}
                      onCheckedChange={() => handleFilterChange(field, value)}
                    />
                    <Label htmlFor={`${field}-${value}`}>{value.toString()}</Label>
                  </div>
                ))}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        ))}
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortableFields.map(field => (
              <React.Fragment key={field}>
                <SelectItem value={`${field}-asc`}>{field} (Ascending)</SelectItem>
                <SelectItem value={`${field}-desc`}>{field} (Descending)</SelectItem>
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <CardFooter className="flex justify-between items-center">
              <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline">
                View Details
              </Link>
              <Button 
                onClick={() => handleAddToCart(product)}
                className="flex items-center"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
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