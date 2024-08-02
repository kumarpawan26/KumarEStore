import { getCartProductFromLS } from "./getCartProducts";

// fatch data from localstorage and add to api fatch to data in showAddToCartCard
export const  fetchQuantityFromCartLS = (id) =>{
    let cardProducts = getCartProductFromLS();
    let existingProduct = cardProducts.find((currProd) => currProd.id === id);

    let quantity = 0;
    let price = 0;

    if (existingProduct) {
        quantity = existingProduct.quantity;
        price = existingProduct.price;
    }

    return {quantity , price};

}; 