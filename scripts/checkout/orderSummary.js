import { cart, removeFromCart } from "../../data/cart.js";
import {products} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addDaysToTheCurrentDate } from "../utils/date.js";
import { paymentSummary } from "./paymentSummary.js";

export function orderSummary(){
    let cartItemHTML = ``;
    cart.forEach((cartItem) => {

        let matchingProduct;
        let deliveryOptionIdCheckup;
        deliveryOptions.forEach((deliveryItem) => {
            if(deliveryItem.deliveryOptionId === cartItem.deliveryOptionId){
                deliveryOptionIdCheckup = deliveryItem.deliveryDate;
            }
        });
        //findin the product from the product store
        products.forEach((productItem) => {
            if(productItem.id === cartItem.productId){
                matchingProduct = productItem;
            }
        });
        cartItemHTML += `
            <div class="cart-item-container js-item-container-${matchingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${addDaysToTheCurrentDate(deliveryOptionIdCheckup)}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src=${matchingProduct.image}>

                <div class="cart-item-details">
                    <div class="product-name">
                        Black and Gray Athletic Cotton Socks - 6 Pairs
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${generateRadioButtons(cartItem)}
              </div>
            </div>
          </div>
        </div>
        `;
    });

    document.querySelector('.js-order-summary').innerHTML = cartItemHTML;

    document.querySelectorAll('.js-delete-quantity').forEach((link) => {
        link.addEventListener('click', () => {
            const clickedLinkId = link.dataset.productId;
            removeFromCart(clickedLinkId);
            const container = document.querySelector(`.js-item-container-${clickedLinkId}`)
            container.remove();
            paymentSummary();
        });
    });
    
    document.querySelectorAll('.js-delivery-option').forEach(
        (clickedRadioButton) => {
            clickedRadioButton.addEventListener('click', () => {
                const clickedProductId = clickedRadioButton.dataset.productId;
                const clcikedDeliveryOptionId = clickedRadioButton.dataset.deliveryIndex;
                cart.forEach((item) => {
                    if(item.productId === clickedProductId){
                        item.deliveryOptionId = clcikedDeliveryOptionId;
                    }
                });
                orderSummary();
                paymentSummary();
            });
        }
    );
}

function generateRadioButtons(cartItem){
    let radioButtonHTML = ``;
    deliveryOptions.forEach((deliveryOption, deliveryIndex) => {
        const isChecked = cartItem.deliveryOptionId === deliveryIndex.toString() ? "checked" : "";
        radioButtonHTML += 
            `
                <div class="delivery-option js-delivery-option" data-product-id="${(cartItem.productId).toString()}" data-delivery-index="${deliveryIndex}">
                    <input type="radio" ${isChecked}
                        class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                    <div>
                        <div class="delivery-option-date">
                            ${addDaysToTheCurrentDate(deliveryOption.deliveryDate)}
                        </div>
                        <div class="delivery-option-price">
                            ${deliveryOption.priceCents === 0 ? "FREE Shipping" : "$" + formatCurrency(deliveryOption.priceCents) + " - Shipping"}
                        </div>
                    </div>
                </div>
            `;
    });
    
    return radioButtonHTML;
}