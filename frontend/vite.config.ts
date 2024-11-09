import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()], // Remove the TanStack Router plugin since you're using programmatic routing
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})