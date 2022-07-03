import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import AppReducer from './reducer.js'

const persistConfig = {
    key: 'root',
    storage,
}
   
const persistedReducer = persistReducer(persistConfig, AppReducer)
   
const store = createStore(persistedReducer)
let persistor = persistStore(store)

export  {store, persistor}

