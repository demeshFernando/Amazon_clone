import { orderSummary } from "./checkout/orderSummary.js";
import { cart } from "../data/cart.js";
import { paymentSummary } from "./checkout/paymentSummary.js";

document.querySelector('.js-return-to-home-link').innerHTML = cart.length + ' items';

paymentSummary();
orderSummary();