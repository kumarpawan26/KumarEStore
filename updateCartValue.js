const cartValue = document.querySelector("#cartValue");

export const updateCartValue = (cartProducts) =>{
    return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping" style="display: inline-flex;">&nbsp;${cartProducts.length} </i>`);
} 