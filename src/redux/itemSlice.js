import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import md5 from 'md5'
import moment from 'moment'

export const fetchGetProductCount = createAsyncThunk(
    'product/fetchGetProductCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                referrerPolicy: "unsafe-url",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth': md5('Valantis_' + moment().format('YYYYMMDD'))
                },
                body: JSON.stringify({ "action": "get_ids" })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchGetProduct = createAsyncThunk(
    'product/fetchGetProduct',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                referrerPolicy: "unsafe-url",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth': md5('Valantis_' + moment().format('YYYYMMDD'))
                },
                body: JSON.stringify({ "action": "get_items", "params": { "ids": productId } })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchGetId = createAsyncThunk(
    'product/fetchGetId',
    async ({ currentPage, pageSize }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                referrerPolicy: "unsafe-url",
                headers: {
                    'User-agent': 'learning app',
                    'Content-Type': 'application/json',
                    'X-Auth': md5('Valantis_' + moment().format('YYYYMMDD'))
                },
                body: JSON.stringify({ "action": "get_ids", "params": { "offset": currentPage, "limit": pageSize } })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchGetFields = createAsyncThunk(
    'product/fetchGetFields',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                referrerPolicy: "unsafe-url",
                headers: {
                    'User-agent': 'learning app',
                    'Content-Type': 'application/json',
                    'X-Auth': md5('Valantis_' + moment().format('YYYYMMDD'))
                },
                body: JSON.stringify({ "action": "get_fields", "params": { "field": "brand" } })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchGetProductByBrand = createAsyncThunk(
    'product/fetchGetProductByBrand',
    async (value, { rejectWithValue }) => {
        try {
            const response = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                referrerPolicy: "unsafe-url",
                headers: {
                    'User-agent': 'learning app',
                    'Content-Type': 'application/json',
                    'X-Auth': md5('Valantis_' + moment().format('YYYYMMDD'))
                },
                body: JSON.stringify({ "action": "filter", "params": { "brand": value } })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchGetProductByPrice = createAsyncThunk(
    'product/fetchGetProductByPrice',
    async (value, { rejectWithValue }) => {
        try {
            const response = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                referrerPolicy: "unsafe-url",
                headers: {
                    'User-agent': 'learning app',
                    'Content-Type': 'application/json',
                    'X-Auth': md5('Valantis_' + moment().format('YYYYMMDD'))
                },
                body: JSON.stringify({ "action": "filter", "params": { "price": value } })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchGetProductByName = createAsyncThunk(
    'product/fetchGetProductByName',
    async (value, { rejectWithValue }) => {
        try {
            const response = await fetch('http://api.valantis.store:40000/', {
                method: 'POST',
                referrerPolicy: "unsafe-url",
                headers: {
                    'User-agent': 'learning app',
                    'Content-Type': 'application/json',
                    'X-Auth': md5('Valantis_' + moment().format('YYYYMMDD'))
                },
                body: JSON.stringify({ "action": "filter", "params": { "product": value } })
            })
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const productStore = createSlice({
    name: 'product',
    initialState: {
        status: null,
        error: null,
        pageSize: 50,
        totalPageCount: '',
        currentPage: 1,
        products: [],
        productsId: [],
        brands: []
    },
    reducers: {
        getCurrentPage(state, actions) {
            state.currentPage = actions.payload;
        }
    }, extraReducers: builder => {
        builder
            .addCase(fetchGetProductCount.pending, (state) => {
                state.error = null
            })
            .addCase(fetchGetProductCount.fulfilled, (state, action) => {
                state.error = null;
                state.totalPageCount = Math.ceil(action.payload.result.length / state.pageSize)
            })
            .addCase(fetchGetProductCount.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                throw Error(action.payload);
            })

            .addCase(fetchGetProduct.pending, (state) => {
                state.error = null;
                state.status = 'loading';
            })
            .addCase(fetchGetProduct.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.products = action.payload.result;
            })
            .addCase(fetchGetProduct.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                throw Error(action.payload);
            })

            .addCase(fetchGetId.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchGetId.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                const uniqueProduct = {};
                action.payload.result.forEach(product => {
                    if (!uniqueProduct[product]) {
                        uniqueProduct[product] = product
                    }
                })
                state.productsId = Object.values(uniqueProduct);
            })
            .addCase(fetchGetId.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                throw Error(action.payload);
            })

            .addCase(fetchGetProductByBrand.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchGetProductByBrand.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.productsId = action.payload.result;
            })
            .addCase(fetchGetProductByBrand.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                throw Error(action.payload);
            })

            .addCase(fetchGetProductByPrice.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchGetProductByPrice.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.productsId = action.payload.result;
            })
            .addCase(fetchGetProductByPrice.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                throw Error(action.payload);
            })

            .addCase(fetchGetProductByName.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchGetProductByName.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.productsId = action.payload.result;
            })
            .addCase(fetchGetProductByName.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                throw Error(action.payload);
            })

            .addCase(fetchGetFields.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchGetFields.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                const uniqueProduct = {};
                action.payload.result.forEach(product => {
                    if (!uniqueProduct[product]) {
                        uniqueProduct[product] = product
                    }
                })
                state.brands = Object.values(uniqueProduct);
            })
            .addCase(fetchGetFields.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
                throw Error(action.payload);
            })
    }
})
export const { getCurrentPage } = productStore.actions;

export default productStore.reducer;