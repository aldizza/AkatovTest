import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface IProduct {
  id: string
  image: string
  liked: boolean
  title: string
  description: string
}

interface IProductsState {
  products: IProduct[]
  loading: boolean
  error: string | null
  initialized: boolean
}

const PRODUCTS_KEY = 'allProducts'

const saveProductsToLocalStorage = (products: IProduct[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

const loadProductsFromLocalStorage = (): IProduct[] => {
  const data = localStorage.getItem(PRODUCTS_KEY)
  return data ? JSON.parse(data) : []
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  const data = await response.json()
  return data.map((item: any, index: number) => ({
    id: item.id,
    image: item.url,
    liked: false,
    title: `Котик id ${item.id}`,
    description: `Милый котик принесет радость и удачу в ваш дом. Кошки, которых любят, приносят счастье.`,
  }))
})

export const refreshProducts = createAsyncThunk('products/refreshProducts', async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  const data = await response.json()
  return data.map((item: any, index: number) => ({
    id: item.id,
    image: item.url,
    liked: false,
    title: `Котик id ${item.id}`,
    description: `Милый котик принесет радость и удачу в ваш дом. Кошки, которых любят, приносят счастье.`,
  }))
})

const initialState: IProductsState = {
  products: loadProductsFromLocalStorage(),
  loading: false,
  error: null,
  initialized: false,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload)
      if (product) {
        product.liked = !product.liked
        saveProductsToLocalStorage(state.products)
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
      saveProductsToLocalStorage(state.products)
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.unshift(action.payload)
      saveProductsToLocalStorage(state.products)
    },
    updateProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
        saveProductsToLocalStorage(state.products)
      }
    }

  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (!state.initialized) {
          state.products = action.payload
          state.initialized = true
          saveProductsToLocalStorage(state.products)
        }
      })
      .addCase(refreshProducts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(refreshProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = false
        saveProductsToLocalStorage(state.products)
      })
      .addCase(refreshProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка при обновлении карточек'
      })
  },
})

export const { toggleLike, deleteProduct, addProduct, updateProduct } = productsSlice.actions
export default productsSlice.reducer

