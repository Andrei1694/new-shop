import { Link, Outlet } from '@tanstack/react-router'
import { ShoppingCart, Menu, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">FreshEats</Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/">
              <Button variant="link" className="text-primary-foreground">Home</Button>
            </Link>
            <Link to="/products">
              <Button variant="link" className="text-primary-foreground">Products</Button>
            </Link>
            <Button variant="link" className="text-primary-foreground">About</Button>
            <Button variant="link" className="text-primary-foreground">Contact</Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/myprofile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through our delicious offerings
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                  <Link to="/">
                    <Button variant="ghost" className="w-full justify-start">Home</Button>
                  </Link>
                  <Link to="/products">
                    <Button variant="ghost" className="w-full justify-start">Products</Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start">About</Button>
                  <Button variant="ghost" className="w-full justify-start">Contact</Button>
                  <Link to="/cart">
                    <Button variant="ghost" className="w-full justify-start">Cart</Button>
                  </Link>
                  <Link to="/myprofile">
                    <Button variant="ghost" className="w-full justify-start">My Profile</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="ghost" className="w-full justify-start">Register</Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">FreshEats</h3>
              <p className="mb-4">Bringing fresh, local goodness to your table.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/"><Button variant="link" className="text-primary-foreground p-0 h-auto">Home</Button></Link></li>
                <li><Link to="/products"><Button variant="link" className="text-primary-foreground p-0 h-auto">Products</Button></Link></li>
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