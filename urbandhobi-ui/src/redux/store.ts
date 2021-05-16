import { createStore } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import RootReducer from "./rootReducer";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
