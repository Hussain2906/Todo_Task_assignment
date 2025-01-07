import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AdminDashboard from '../Views/AdminScreens/AdminDashboard';
import AddMenu from '../Views/AdminScreens/AddMenu';
import DeleteMenu from '../Views/AdminScreens/DeleteMenu';


const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName='AdminDashboard'>
        <Stack.Screen name = "AdminDashboard" component = {AdminDashboard} options={{headerShown:false}} />
        <Stack.Screen name = "Addmenu" component = {AddMenu} options={{headerShown:false}} />
        <Stack.Screen name = "Deletemenu" component = {DeleteMenu} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default AdminStack

const styles = StyleSheet.create({})