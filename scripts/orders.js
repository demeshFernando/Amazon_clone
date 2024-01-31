import { cart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { getMonthDate } from "./utils/date.js";
import { formatCurrency } from "./utils/money.js";
import { products } from "../data/products.js";

document.querySelector('.js-cart-quantity').innerHTML = cart.length;

let ordersHTML = ``;

for(let i = orders.length - 1; i > -1; i--) {
    const orderItem = orders[i];
    const orderedDate = getMonthDate(new Date(`${orderItem.date.ordererdMonth}/${orderItem.date.orderedDay}/${orderItem.date.orderedYear}`));
    let orderTotal = 0, totalBeforeTax = 0, totalDeliveryCharges = 0;

    orderItem.products.forEach((productItem) => {
        totalBeforeTax += productItem.priceCents * productItem.quantity;
        totalDeliveryCharges += productItem.deliveryPriceCents;
    });
    orderTotal = (totalBeforeTax + totalDeliveryCharges);
    orderTotal += (orderTotal * orderItem.tax);

    ordersHTML += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderedDate}</div>
                    </div>
                    <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(orderTotal)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderItem.orderId}</div>
                </div>
            </div>

            `;
            
            orderItem.products.forEach(productItem => {
                //getting the matchingproduct details from products container
                let matchingProduct;

                products.forEach(prodcutStorageItem => {
                    if(prodcutStorageItem.id === productItem.productId){
                        matchingProduct = prodcutStorageItem;
                    }
                });
                ordersHTML += `
                    <div class="order-details-grid">
                    <div class="product-image-container">
                        <img src=${matchingProduct.image}>
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                        ${matchingProduct.name}
                        </div>
                        <div class="product-delivery-date">
                        Arriving on: ${getMonthDate(new Date(`${orderItem.date.ordererdMonth}/${orderItem.date.orderedDay}/${orderItem.date.orderedYear}`), productItem.deliveryDay)}
                        </div>
                        <div class="product-quantity">
                        Quantity: ${productItem.quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                        </a>
                    </div>
                </div>
                `;
            });

            ordersHTML += `
        </div>
    `;
}

document.querySelector('.js-orders-grid').innerHTML = ordersHTML;


