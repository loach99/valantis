import { configureStore} from '@reduxjs/toolkit'
import productStore from './itemSlice'

export default configureStore({
    reducer:{
        product: productStore,
    }
})