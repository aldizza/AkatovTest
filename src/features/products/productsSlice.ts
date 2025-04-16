import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: string
  image: string
  liked: boolean
  title: string
  description: string
}

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  const data = await response.json()
  return data.map((item: any, index: number) => ({
    id: item.id,
    image: item.url,
    liked: false,
    title: `Котик #${index + 1}`,
    description: `Милый котик id ${item.id}.`
  }))
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload)
      if (product) product.liked = !product.liked
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка при загрузке котиков'
      })
  },
})

export const { toggleLike, deleteProduct, addProduct } = productsSlice.actions
export default productsSlice.reducer
