import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Views/AuthenticationScreen/LoginScreen';
import SignupScreen from '../Views/AuthenticationScreen/SignupScreen';
import ForgetPassword from '../Views/AuthenticationScreen/ForgetPassword';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}
