// reducers/cartReducer.js

import { ADD_TO_CART, DELETECARTITEM, SETADMINTOKEN, UPDATECARTCOUNT } from "../action.js";

const initialState = {
    items: [],
    cartCount: 0,
    adminToken: "",
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const itemID = [];
            state.items.map((item) => {
                itemID.push(item.id);
            });
            const isTrue = itemID.includes(action.payload.id);
            console.log("action.payload.id--->>", action.payload.id);
            console.log("itemID--->>", itemID);
            console.log("isTrue--->>", isTrue);

            return {
                ...state,
                items: isTrue ? updateItems(action.payload.id, state.items) : [...state.items, action.payload], // if true the item already exist in the cart list so that only update the quantity else the product should add to cart
            };

        case UPDATECARTCOUNT:
            return {
                ...state,
                cartCount: action.payload.cartCount,
            };

        case DELETECARTITEM:
            return {
                ...state,
                items: deleteItem(action.payload, state.items),
            };
        case SETADMINTOKEN:
            return {
                ...state,
                adminToken: action.payload,
            };
        default:
            return state;
    }
};

// Function to update the items array by incrementing quantity
function updateItems(itemId, items) {
    return items.map((item) => {
        if (item.id === itemId) {
            return {
                ...item,
                quantity: item.quantity + 1,
            };
        }
        return item;
    });
}

// Function to delete the item from the items array based on itemId
function deleteItem(itemId, items) {
    return items.filter((item) => item.id !== itemId);
}
export default cartReducer;
