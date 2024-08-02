import products from "./api/products.json";  //api product -->apiProd
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { homeQuantityToggle } from "./homeQuantityToggle";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateTotalPay } from "./updateTotalPay";

let cartProdcts = getCartProductFromLS(); //localstorage add product-> lsProd

// get id match apiData and  apiData_id match cartData quantity merge with id_match apiData
// let filterProducts =  products 
// .filter(apiProd => cartProdcts.some(lsPord => lsPord.id === apiProd.id))
// .map(lsProd => {
//     let productDetails = cartProdcts.find(apiProd => apiProd.id === lsProd.id);
//     return { ...lsProd, quantity: productDetails.quantity };
// });

// only filter apiData
let filterProducts = products.filter((apiProd) => {
    return cartProdcts.some((lsPord) => lsPord.id === apiProd.id);
});

console.log(filterProducts, "<---match api prod and localStorage Prod");

const cartContainer = document.querySelector("#productCartContainer");
const cartTemplateCont = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
    filterProducts.forEach((curProd) => {
        const { category, id, image, name, price, stock } = curProd;

        let productClone = document.importNode(cartTemplateCont.content, true);

        let lsActualData = fetchQuantityFromCartLS(id);
        let quantity = lsActualData.quantity;

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`)
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productPrice").textContent = Number((price * quantity).toFixed(2));
        productClone.querySelector(".productQuantity").textContent = quantity;
        productClone.querySelector(".productQuantity").setAttribute("data-quantity", quantity);

        // eventlistener onClick on increment and decrement and update match id price,quantity on localstorage 
        productClone.querySelector(".stockElement").addEventListener('click', (event) => {
            // use homeQuantityToggle comman function on addToCart and showAddToCartCard inc/dec
            let quantity = homeQuantityToggle(event, id, stock);
            const currentCardElement = document.querySelector(`#card${id}`);
            currentCardElement.querySelector(".productPrice").textContent = Number((price * quantity).toFixed(2));
            // Find the product id in the array and update the quantity
            const newArray = cartProdcts.map(exitProd => {
                if (exitProd.id === id) {
                    // Update the product's quantity
                    return { ...exitProd, quantity: quantity, price: Number((price * quantity).toFixed(2)) }; // Using spread syntax to clone and update 
                }
                return exitProd;
            });
            // Update the localStorage with the modified array
            localStorage.setItem('cartProductLS', JSON.stringify(newArray));

            // updateTotalPay
            updateTotalPay();
        });

        // remove cart item
        productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => removeProdFromCart(id));

        cartContainer.append(productClone);
    });
}

showCartProduct();

updateTotalPay();