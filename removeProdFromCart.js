import { getCartProductFromLS } from "./getCartProducts"
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";
import { updateTotalPay } from "./updateTotalPay";

export const removeProdFromCart = (id) => {
    let cartProducts = getCartProductFromLS();
    cartProducts = cartProducts.filter((currProd) => currProd.id !== id);
localStorage.setItem("cartProductLS",JSON.stringify(cartProducts));

let removeDiv = document.getElementById(`card${id}`);
if (removeDiv) {
    removeDiv.remove();
    showToast("delete",id);
}

updateTotalPay();
updateCartValue(cartProducts);

}

