
// used by the reducer to upate the state in store
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_PRICE = "ADD_PRICE";

export function addToCart(item) {
    let items = JSON.parse(localStorage.getItem('cart'));
    items.push(item)
    localStorage.setItem('cart', JSON.stringify(items));
    return {
        type: ADD_TO_CART,
        item
    }
}

export function addPrice(price) {
    return {
        type: ADD_PRICE,
        value: price
    }
}