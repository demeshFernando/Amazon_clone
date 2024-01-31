import { cart, getCartQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addNewOrder } from "../../data/orders.js";

export function paymentSummary(){
    let totalItemCost = 0, shippingAndHandlingCost = 0, totalBeforeCost = 0;

    //going through cart items
    cart.forEach((cartItem) => {
        //finding the matching prduct
        products.forEach((productItem) => {
            if(cartItem.productId === productItem.id){
                totalItemCost += productItem.priceCents * cartItem.quantity;
            }
        });

        //calculating the shipping cost
        deliveryOptions.forEach((deliveryItem) => {
            if(cartItem.deliveryOptionId === deliveryItem.deliveryOptionId){
                shippingAndHandlingCost += deliveryItem.priceCents;
            }
        });
    });
    totalBeforeCost += totalItemCost + shippingAndHandlingCost;
    let orderSummaryHTML = 
    `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${getCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalItemCost)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingAndHandlingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeCost)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeCost * 0.1)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeCost + (totalBeforeCost * 0.1))}</div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
        Place your order
    </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = orderSummaryHTML;
    document.querySelector('.js-place-order-button').addEventListener('click', () => {
        const orderId = 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d';
        const orderingYear = new Date().getFullYear();
        const orderingMonth = new Date().getMonth() + 1;
        const orderingDay = new Date().getDate();
        let productDetails = [];
        let matchingProductPriceCents, deliveryDate, deliveryPriceCents, tax;

        cart.forEach((cartItem) => {
            products.forEach((productItem) => {
                if(productItem.id === cartItem.productId){
                    matchingProductPriceCents = productItem.priceCents;
                }
            });

            deliveryOptions.forEach((deliveryItem) => {
                if(cartItem.deliveryOptionId === deliveryItem.deliveryOptionId){
                    deliveryDate = deliveryItem.deliveryDate;
                    deliveryPriceCents = deliveryItem.priceCents;
                }
            });

            productDetails.push({
                productId: cartItem.productId, 
                quantity: cartItem.quantity, 
                priceCents: matchingProductPriceCents,
                deliveryDay: deliveryDate, 
                deliveryPriceCents: deliveryPriceCents
            });
            tax = 0.1;
        });

        addNewOrder(orderId, orderingYear, orderingMonth, orderingDay, productDetails, tax);
    });
}