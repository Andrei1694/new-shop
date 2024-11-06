import React from 'react'
import { useParams } from '@tanstack/react-router'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from '@tanstack/react-router'
import { faker } from '@faker-js/faker';

// This would typically come from an API or database
const products = [
  { id: 1, name: "Farm Fresh Eggs", price: 4.99, category: "Dairy", image: faker.image.urlLoremFlickr({ category: 'food' }), description: "Fresh eggs from free-range chickens, perfect for your breakfast or baking needs." },
  { id: 2, name: "Organic Honey", price: 8.50, category: "Sweeteners", image: faker.image.urlLoremFlickr({ category: 'food' }), description: "Pure, unprocessed honey from local beekeepers. A natural sweetener for your tea or toast." },
  { id: 3, name: "Artisan Bread", price: 5.99, category: "Bakery", image: faker.image.urlLoremFlickr({ category: 'food' }), description: "Freshly baked artisan bread, made with organic flour and traditional methods." },
  { id: 4, name: "Fresh Spinach", price: 3.99, category: "Vegetables", image: faker.image.urlLoremFlickr({ category: 'food' }), description: "Crisp, nutrient-rich spinach leaves, ideal for salads or cooking." },
  { id: 5, name: "Grass-fed Beef", price: 12.99, category: "Meat", image: faker.image.urlLoremFlickr({ category: 'food' }), description: "Premium grass-fed beef, raised without antibiotics or hormones." },
  { id: 6, name: "Organic Apples", price: 6.99, category: "Fruits", image: faker.image.urlLoremFlickr({ category: 'food' }), description: "Sweet and crisp organic apples, perfect for snacking or baking." },
]

export function ProductDetail() {
  const { productId } = useParams({ from: '/products/$productId' })
  console.log(productId)
  const product = products.find(p => p.id === Number(productId))

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }
console.log('here')
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center mb-4 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{product.name}</CardTitle>
          <CardDescription>{product.category}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-md" />
          <p className="text-lg">{product.description}</p>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}