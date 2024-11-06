import { ShoppingCart, Menu, X, Facebook, Twitter, Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function FoodShopLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Fresh, Organic, Delicious</h1>
            <p className="text-xl mb-8">Discover the best local produce and artisanal foods</p>
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Farm Fresh Eggs", price: "$4.99", image: "/placeholder.svg" },
                { name: "Organic Honey", price: "$8.50", image: "/placeholder.svg" },
                { name: "Artisan Bread", price: "$5.99", image: "/placeholder.svg" },
              ].map((product, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">About FreshEats</h2>
              <p className="text-muted-foreground mb-6">
                We're passionate about bringing the freshest, locally-sourced produce and artisanal foods right to your doorstep.
                Our mission is to support local farmers and provide our community with the healthiest, most delicious foods available.
              </p>
              <Button variant="link">Learn More About Us</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">FreshEats</h3>
              <p className="mb-4">Bringing fresh, local goodness to your table.</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon"><Facebook /></Button>
                <Button variant="ghost" size="icon"><Twitter /></Button>
                <Button variant="ghost" size="icon"><Instagram /></Button>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="text-primary-foreground p-0 h-auto">Home</Button></li>
                <li><Button variant="link" className="text-primary-foreground p-0 h-auto">Products</Button></li>
                <li><Button variant="link" className="text-primary-foreground p-0 h-auto">About Us</Button></li>
                <li><Button variant="link" className="text-primary-foreground p-0 h-auto">Contact</Button></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p>123 Fresh Street, Foodville, FK 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@fresheats.com</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} FreshEats. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}