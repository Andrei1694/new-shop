import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Mock user data
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', isActive: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', isActive: true },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', isActive: false },
]

// Mock food data
const initialFoodItems = [
  { id: 1, name: 'Fresh Salad', category: 'Vegetarian', price: 9.99, inStock: true },
  { id: 2, name: 'Grilled Chicken', category: 'Meat', price: 14.99, inStock: true },
  { id: 3, name: 'Veggie Burger', category: 'Vegetarian', price: 11.99, inStock: false },
]

export function AdminPanel() {
  const [users, setUsers] = React.useState(initialUsers)
  const [foodItems, setFoodItems] = React.useState(initialFoodItems)
  const [editingUser, setEditingUser] = React.useState(null)
  const [editingFood, setEditingFood] = React.useState(null)
  const [isUserDialogOpen, setIsUserDialogOpen] = React.useState(false)
  const [isFoodDialogOpen, setIsFoodDialogOpen] = React.useState(false)

  const handleEditUser = (user) => {
    setEditingUser(user)
    setIsUserDialogOpen(true)
  }

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
    setIsUserDialogOpen(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleEditFood = (food) => {
    setEditingFood(food)
    setIsFoodDialogOpen(true)
  }

  const handleUpdateFood = (updatedFood) => {
    setFoodItems(foodItems.map(food => food.id === updatedFood.id ? updatedFood : food))
    setIsFoodDialogOpen(false)
    setEditingFood(null)
  }

  const handleDeleteFood = (foodId) => {
    setFoodItems(foodItems.filter(food => food.id !== foodId))
  }

  const handleAddFood = () => {
    const newFood = {
      id: foodItems.length + 1,
      name: '',
      category: '',
      price: 0,
      inStock: true,
    }
    setEditingFood(newFood)
    setIsFoodDialogOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="food">Food Management</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>Make changes to the user's information here.</DialogDescription>
              </DialogHeader>
              {editingUser && (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdateUser({
                    ...editingUser,
                    name: e.target.name.value,
                    email: e.target.email.value,
                    role: e.target.role.value,
                    isActive: e.target.isActive.checked,
                  })
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" defaultValue={editingUser.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" defaultValue={editingUser.email} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Input id="role" defaultValue={editingUser.role} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="isActive" className="text-right">
                        Active
                      </Label>
                      <Checkbox id="isActive" defaultChecked={editingUser.isActive} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
        <TabsContent value="food">
          <Button onClick={handleAddFood} className="mb-4">Add New Food Item</Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodItems.map((food) => (
                <TableRow key={food.id}>
                  <TableCell>{food.name}</TableCell>
                  <TableCell>{food.category}</TableCell>
                  <TableCell>${food.price.toFixed(2)}</TableCell>
                  <TableCell>{food.inStock ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => handleEditFood(food)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteFood(food.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={isFoodDialogOpen} onOpenChange={setIsFoodDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingFood?.id ? 'Edit Food Item' : 'Add New Food Item'}</DialogTitle>
                <DialogDescription>Make changes to the food item here.</DialogDescription>
              </DialogHeader>
              {editingFood && (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdateFood({
                    ...editingFood,
                    name: e.target.name.value,
                    category: e.target.category.value,
                    price: parseFloat(e.target.price.value),
                    inStock: e.target.inStock.checked,
                  })
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" defaultValue={editingFood.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Input id="category" defaultValue={editingFood.category} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input id="price" type="number" step="0.01" defaultValue={editingFood.price} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="inStock" className="text-right">
                        In Stock
                      </Label>
                      <Checkbox id="inStock" defaultChecked={editingFood.inStock} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}