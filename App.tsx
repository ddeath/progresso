import { NavigationContainer } from '@react-navigation/native'
import { PaperProvider } from 'react-native-paper'

import { Routes } from './src/routes'

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
