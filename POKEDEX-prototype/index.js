// index.js -- the very first file Expo runs.

// Import the function that tells Expo which component is the main one.
import { registerRootComponent } from 'expo'
// Import our App (the class in App.js).
import App from './App'

// Tell Expo: "start the app by drawing App".
registerRootComponent(App)
