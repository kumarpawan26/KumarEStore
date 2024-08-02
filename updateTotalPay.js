import { getCartProductFromLS } from "./getCartProducts"

export const updateTotalPay = () => {

    let productSubTotal = document.querySelector(".productSubTotal");
    let productFinalTotal = document.querySelector(".productFinalTotal");

    let lsProducts = getCartProductFromLS();
    let initialValue = 0;

    let totalProdPrice = lsProducts.reduce((accmulator, currEle) => {
        let productPrice = parseInt(currEle.price) || 0;
        return accmulator + productPrice;
    }, initialValue);

    productSubTotal.textContent = totalProdPrice;
    productFinalTotal.textContent = totalProdPrice + 50;

}