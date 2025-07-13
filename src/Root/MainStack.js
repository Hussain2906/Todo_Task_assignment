/* eslint-disable jsx-quotes */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from './TabScreen';
import TaskForm from '../Views/HomeTabs/TaskForm';
import TaskList from '../Views/HomeTabs/TaskList';


const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='TabNavigation'>
      <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown:false}}/>
      <Stack.Screen name='TaskForm' component={TaskForm} />
      <Stack.Screen name='TaskList' component={TaskList}/>
    </Stack.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({})