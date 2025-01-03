import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import LoginScreen from '../Views/AuthenticationScreen/LoginScreen';

const MainRout = () => {
    const Stack  = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}
        initialRouteName='AuthStack'>
            <Stack.Screen name='AuthStack' component={AuthStack}/>
            <Stack.Screen name='MainStack' component={MainStack} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainRout

const styles = StyleSheet.create({})