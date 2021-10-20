import { configureStore } from "@reduxjs/toolkit";
import pagesReducer from './pages-slice'
const store = configureStore({
    reducer: {
        pages: pagesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store