import React from 'react'
import { useNavigate } from '@tanstack/react-router'
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MyProfile() {
  const navigate = useNavigate()
  const [name, setName] = React.useState('John Doe')
  const [email, setEmail] = React.useState('john.doe@example.com')
  const [phone, setPhone] = React.useState('(123) 456-7890')
  const [address, setAddress] = React.useState('123 Main St, Anytown, AN 12345')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the profile update logic
    console.log('Profile update attempt with:', { name, email, phone, address })
    // For now, we'll just show an alert
    alert('Profile updated successfully!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg" alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">My Profile</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">Update Profile</Button>
          </form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter>
          <div className="flex flex-col space-y-2 w-full">
            <Button variant="outline" className="w-full" onClick={() => navigate({ to: '/change-password' })}>
              Change Password
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate({ to: '/order-history' })}>
              View Order History
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}