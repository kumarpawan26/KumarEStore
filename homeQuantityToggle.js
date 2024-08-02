export const homeQuantityToggle = (event, id, stock) => {
    const currentCardElement = document.querySelector(`#card${id}`);

    const productQuantity = currentCardElement.querySelector(".productQuantity");
    
    let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

    if ((event.target.className === "cartIncrement")) {
        if (quantity < stock) {
            // alert("stock available")
            quantity += 1;
        }
        else {
            quantity = stock;           
            alert("stock is over")
        }
    }

    if ((event.target.className === "cartDecrement")) {
        if (quantity > 1) {
            quantity -= 1;
        }
        else {
            alert("please select atleast 1 item")
        }
    }

    productQuantity.innerText = quantity;
    productQuantity.setAttribute("data-quantity", quantity);
    
    return quantity;
};