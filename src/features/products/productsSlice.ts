import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Интерфейсы для данных
interface Product {
  id: string
  image: string
  liked: boolean
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

// Асинхронный запрос для получения продуктов
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // Имя экшн-криэйтора
  async () => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    const data = await response.json()

    // Формируем продукты
    return data.map((item: any) => ({
      id: item.id,
      image: item.url,
      liked: false,
    }))
  }
)

// Слайс с состоянием продуктов
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload)
      if (product) {
        product.liked = !product.liked
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load products'
      })
  },
})

export const { toggleLike, removeProduct } = productsSlice.actions
export default productsSlice.reducer
