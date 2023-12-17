import AsyncStorage from "@react-native-async-storage/async-storage"
import SuperJSON from "superjson"
import { PersistStorage } from "zustand/middleware"

export const getStorage: <T>() => PersistStorage<T> = () => ({
  getItem: async <T>(name: string) => {
    const str = await AsyncStorage.getItem(name)
    if (!str) {
      return null
    }
    return SuperJSON.parse<T>(str)
  },
  setItem: async <T>(name: string, value: T) => {
    await AsyncStorage.setItem(name, SuperJSON.stringify(value))
  },
  removeItem: async (name: string) => AsyncStorage.removeItem(name),
})
