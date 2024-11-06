import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './pages/routes'

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}