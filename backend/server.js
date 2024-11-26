import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const products = [
	{ id: 1, name: "Farm Fresh Eggs", price: 4.99, category: "Dairy", image: 'https://picsum.photos/200/300', description: "Fresh eggs from free-range chickens, perfect for your breakfast or baking needs." },
	{ id: 2, name: "Organic Honey", price: 8.50, category: "Sweeteners", image: 'https://picsum.photos/200/300', description: "Pure, unprocessed honey from local beekeepers. A natural sweetener for your tea or toast." },
	{ id: 3, name: "Artisan Breadzz", price: 5.99, category: "Bakery", image: 'https://picsum.photos/200/300', description: "Freshly baked artisan bread, made with organic flour and traditional methods." },
	{ id: 4, name: "Fresh Spinach", price: 3.99, category: "Vegetables", image: 'https://picsum.photos/200/300', description: "Crisp, nutrient-rich spinach leaves, ideal for salads or cooking." },
	{ id: 5, name: "Grass-fed Beef", price: 12.99, category: "Meat", image: 'https://picsum.photos/200/300', description: "Premium grass-fed beef, raised without antibiotics or hormones." },
	{ id: 6, name: "Organic Apples", price: 6.99, category: "Fruits", image: 'https://picsum.photos/200/300', description: "Sweet and crisp organic apples, perfect for snacking or baking." },
]

// Test route
app.get('/api/test', (req, res) => {
	res.json({ message: 'Backend is working!' });
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});