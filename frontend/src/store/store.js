import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import {productApi} from "../services/productApi.js";
import {categoryApi} from "../services/categoryApi.js";
import {blogApi} from "../services/blogApi.js";
import {adminApi} from "../services/adminApi.js";
import {basketApi} from "../services/basketApi.js";
import {wishlistApi} from "../services/wishlistApi.js";
import sellerApi from "../services/sellerApi.js";
import authReducer from '../services/authSlice';
import {blogCategoryApi} from "../services/blogCategoryApi.js";
import {servicesApi} from "../services/servicesApi.js";
import {contactApi} from "../services/contactApi.js";
import {trackingApi} from "../services/trackingApi.js";
import {petAPI} from "../services/petApi.js";
import {adoptionApi} from "../services/adoptionApi.js";
import {contactUsApi} from "../services/contactUsApi.js";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [blogCategoryApi.reducerPath]: blogCategoryApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer,
        [sellerApi.reducerPath]: sellerApi.reducer,
        [servicesApi.reducerPath]: servicesApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [trackingApi.reducerPath]: trackingApi.reducer,
        [petAPI.reducerPath]: petAPI.reducer,
        [adoptionApi.reducerPath]: adoptionApi.reducer,
        [contactUsApi.reducerPath]: contactUsApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productApi.middleware,
            categoryApi.middleware,
            blogApi.middleware,
            blogCategoryApi.middleware,
            adminApi.middleware,
            basketApi.middleware,
            wishlistApi.middleware,
            sellerApi.middleware,
            servicesApi.middleware,
            contactApi.middleware,
            trackingApi.middleware,
            petAPI.middleware,
            adoptionApi.middleware,
            contactUsApi.middleware
        ),
});
