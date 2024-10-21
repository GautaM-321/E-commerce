import {
        carttype,
        itemtype,
        logintype,
        userType,
        wishtype,
} from "../../interface/type";
export const setProducts = (products: itemtype) => {
        return {
                type: "Set_Product",
                payload: products,
        };
};
export const user_logout_status = (credential: userType) => {
        return {
                type: "user_logout_status",
                payload: credential,
        };
};

export const user_login_status = (credential: userType) => {
        return {
                type: "user_login_status",
                payload: credential,
        };
};

export const add_cart = (items: itemtype[]) => {
        return {
                type: "add-cart",
                payload: items,
        };
};

export const add_wishlist = (items: itemtype[]) => {
        return {
                type: "wishlist",
                payload: items,
        };
};

export const placeorder = (items: any) => {
        return {
                type: "placeorder",
                payload: items,
        };
};
