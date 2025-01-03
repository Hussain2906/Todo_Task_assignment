import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './TabScreen';
import HomeScreen from '../Views/HomeScreens/HomeScreen';
import ProfileScreen from '../Views/HomeScreens/ProfileScreen';
import Name from '../Views/HomeScreens/Name';


const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='TabNavigation'>
      <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown:false}}/>
      
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      <Stack.Screen name='Name' component={Name}/>
    </Stack.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({})