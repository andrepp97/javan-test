import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        name: 'Blue Denim Shirt',
        category: 'Shirt - Blue',
        color: 'Blue',
        size: 'M',
        qty: 1,
        price: 17.99,
        note: '1 piece',
        image:
            'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/af89f674492f1c55c54a653980b8e2dd104695af_xxl-1.jpg',
    },
    {
        id: 2,
        name: 'Red Hoodie',
        category: 'Hoodie - Red',
        color: 'Red',
        size: 'M',
        qty: 1,
        price: 35.99,
        note: '',
        image:
            'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fbd%2F9b%2Fbd9b6bc43a79f0f4cc53b8a5cf013b1b2938d498.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_hoodiessweatshirts%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
    },
];


const addTodoReducer = createSlice({
    name: "products",
    initialState,
    reducers: {
        increaseQty: (state, action) => {
            const idx = action.payload;
            const product = state[idx];
            product.qty = product.qty + 1;
            state[idx] = product;
            return state;
        },

        decreaseQty: (state, action) => {
            const idx = action.payload;
            console.log(idx)
            const product = state[idx];
            product.qty = product.qty - 1;
            state[idx] = product;
            return state;
        },

        removeItem: (state, action) => {
            let temp = [...state];
            temp = temp.filter(item => item.id !== action.payload);
            return temp;
        },
    },

});

export const {
    increaseQty,
    decreaseQty,
    removeItem,
} = addTodoReducer.actions;

export const reducer = addTodoReducer.reducer;