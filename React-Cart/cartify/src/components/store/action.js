// actions/cartActions.js

export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATECARTCOUNT = "UPDATECARTCOUNT";
export const DELETECARTITEM = "DELETECARTITEM";
export const SETADMINTOKEN = "SETADMINTOKEN";


export const addToCart = (product) => {
    // console.warn("product--", product);
    return {
        type: ADD_TO_CART,
        payload: product,
    };
};

export const updateCartCount = (data) => {
    console.log("updateCartCount", data);
    return {
        type: UPDATECARTCOUNT,
        payload: {
            cartCount: data,
        },
    };
};

export const deleteCartItem = (productid) => {
    return {
        type: DELETECARTITEM,
        payload: productid,
    };
};

export const setAdminAuthToken = (token) => {
    return {
        type: SETADMINTOKEN,
        payload: token,
    };
};