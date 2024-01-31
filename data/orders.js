export let orders = [
    {
        orderId: '27cba69d-4c3d-4098-b42d-ac7fa62b7664', 
        date: {
            orderedYear: 2024, 
            ordererdMonth: 9, 
            orderedDay: 15
        }, 
        products: [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 2, 
                priceCents: 1090, 
                deliveryDay: 7, 
                deliveryPriceCents: 0
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
                quantity: 1, 
                priceCents: 2095, 
                deliveryDay: 1, 
                deliveryPriceCents: 999
            }
        ], 
        tax: 0.1
    }
];

export function addNewOrder(orderId, orderingYear, orderingMonth, orderingDay, productDetails, tax){
    let newProductDetails = [];

    productDetails.forEach(productItem => {
        newProductDetails.push({
            productId: productItem.productId, 
            quantity: productItem.quantity, 
            priceCents: productItem.priceCents, 
            deliveryDay: productItem.deliveryDay, 
            deliveryPriceCents: productItem.deliveryPriceCents 
        });
    });

    orders.push({
        orderId: orderId, 
        date: {
            orderedYear: orderingYear, 
            ordererdMonth: orderingMonth, 
            orderedDay: orderingDay
        }, 
        products: newProductDetails, 
        tax: tax
    });
}