import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from '@tanstack/react-router'

const products = [
  { id: 1, name: "Farm Fresh Eggs", price: 4.99, category: "Dairy", image: "/placeholder.svg" },
  { id: 2, name: "Organic Honey", price: 8.50, category: "Sweeteners", image: "/placeholder.svg" },
  { id: 3, name: "Artisan Bread", price: 5.99, category: "Bakery", image: "/placeholder.svg" },
  { id: 4, name: "Fresh Spinach", price: 3.99, category: "Vegetables", image: "/placeholder.svg" },
  { id: 5, name: "Grass-fed Beef", price: 12.99, category: "Meat", image: "/placeholder.svg" },
  { id: 6, name: "Organic Apples", price: 6.99, category: "Fruits", image: "/placeholder.svg" },
]

export function Products() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("All")

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === "All" || product.category === categoryFilter)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Label htmlFor="search">Search Products</Label>
          <Input
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Label htmlFor="category">Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Dairy">Dairy</SelectItem>
              <SelectItem value="Sweeteners">Sweeteners</SelectItem>
              <SelectItem value="Bakery">Bakery</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Meat">Meat</SelectItem>
              <SelectItem value="Fruits">Fruits</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>
                <Link to="/products/$productId" params={{ productId: product.id.toString() }} className="hover:underline">
                  {product.name}
                </Link>
              </CardTitle>
              <CardDescription>{product.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              </Link>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}