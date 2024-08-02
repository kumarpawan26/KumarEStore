import './style.css'

import products from "./api/products.json"
import { showProductContainer } from './homeProductCards';

// console.log("product api data get-->",products);

// function call to take an array of products as input
showProductContainer(products);