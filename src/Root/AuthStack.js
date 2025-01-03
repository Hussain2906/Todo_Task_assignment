import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from '../Views/AuthenticationScreen/LoginScreen';
import SignupScreen from '../Views/AuthenticationScreen/SignupScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ForgetPassword from '../Views/AuthenticationScreen/ForgetPassword';




const Stack = createStackNavigator();
const AuthStack = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Signup">
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
  </Stack.Navigator>  
  )
}

export default AuthStack

const styles = StyleSheet.create({})