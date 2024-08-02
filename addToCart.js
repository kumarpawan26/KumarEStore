import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

// call this function to show existing localStorage cartValue
getCartProductFromLS();

export const addToCart = (event, id, stock) => {

    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElemet = document.querySelector(`#card${id}`);
    let quantity = currentProdElemet.querySelector(".productQuantity").innerText;
    let price = currentProdElemet.querySelector(".productPrice").innerText;

    quantity = Number(quantity);
    price = Number((price * quantity).toFixed(2));
    console.log(typeof(price),price);

    let updateCart = { id, quantity, price };


    let existingProd = arrLocalStorageProduct.find((product) => product.id === id);
    // console.log('existing product in localStorage->',existingProd);
    if (existingProd === undefined) {
        arrLocalStorageProduct.push(updateCart);
        localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
    } else {
        // Find the product id in the array and update the quantity
        const newArray = arrLocalStorageProduct.map(exitProd => {
            if (exitProd.id === id) {
                // Update the product's quantity
                console.log("update quantity and prices--->",{...exitProd, quantity: quantity, price: price});
                return { ...exitProd, quantity: quantity, price: price }; // Using spread syntax to clone and update 
            }
            console.log("update exit value-->",exitProd);
            return exitProd;
        });
        // Update the localStorage with the modified array
        localStorage.setItem('cartProductLS', JSON.stringify(newArray));
    }
    // update the cart button value
    updateCartValue(arrLocalStorageProduct);
    showToast("add",id);

}