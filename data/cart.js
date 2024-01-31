export let cart = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        quantity: 2, 
        deliveryOptionId: '0'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
        quantity: 1, 
        deliveryOptionId: '2'
    }
];

//adding an item to the cart
export function addToCart(productId, quantity, deliveryOptionId){
    let matchingProduct;
    deliveryOptionId = deliveryOptionId ? '0' : deliveryOptionId;

    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingProduct = cartItem;
        }
    });
    if(!matchingProduct){
        cart.push({
            productId: productId, 
            quantity: quantity,
            deliveryOptionId: '0'
        });
    }
    else{
        matchingProduct.quantity += quantity;
    }
    console.log(cart);
}

//getting the cart quantity
export function getCartQuantity(){
    let quantityCount = 0; 
    cart.forEach((cartItem) => {
        quantityCount += cartItem.quantity;
    });
    return quantityCount;
}

//remove an item from the cart
export function removeFromCart(productId){
    let newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId != productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
}