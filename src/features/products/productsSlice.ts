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

const generateRandomDescription = (): string => {
  const descriptions = [
    'Почему коты так любят смотреть в окно? Они на страже… от мух и птичек!',
    'Какой у кота любимый фильм? "Кошачий квест: Найди свой корм!"',
    'Кот пытался стать йогом… но заснул прямо на коврике.',
    'Почему коты не любят интернет? Потому что там нет настоящих мышек.',
    'Кот с гордостью заявил: «Я не лентяй, я просто практикую отдых».',
    'Почему коты не боятся дождя? Потому что они всегда приземляются на лапки.',
    'Кот — это не животное, а философ в шёрстке.',
    'Сколько котов нужно, чтобы починить лампу? Один, но ему нужно сначала 5 часов поспать.',
    'Как коты открывают секреты? Притворяются, что не слышат, а потом рассказывают всем!',
    'Как коты проверяют, кто тут главный? Ласково и не спеша наступают на клавиатуру.'
  ]

  const randomIndex = Math.floor(Math.random() * descriptions.length)
  return descriptions[randomIndex]
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  const data = await response.json()

  return data.map((item: any) => ({
    id: item.id,
    image: item.url,
    liked: false,
    title: `Котик id ${item.id}`,
    description: generateRandomDescription(),
  }))
})

export const refreshProducts = createAsyncThunk('products/refreshProducts', async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  const data = await response.json()

  return data.map((item: any) => ({
    id: item.id,
    image: item.url,
    liked: false,
    title: `Котик id ${item.id}`,
    description: generateRandomDescription(),
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

