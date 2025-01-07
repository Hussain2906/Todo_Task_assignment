import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Views/HomeScreens/HomeScreen';
import ProfileScreen from '../Views/HomeScreens/ProfileScreen';
import Icon from 'react-native-vector-icons/Entypo';
import Name from '../Views/HomeScreens/Name';

const TabNavigation = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const customTabBarStyle = {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    style: {backgroundColor: 'black'},
    labelStyle: {
      fontSize: 12, // Change this to your desired font size
      fontWeight: 'bold', // You can add this line for bold labels if needed
    },
  };
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        keyboardHidesTabBar: true,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#F6E6CB',
          borderTopColor: 'transparent',
          borderRadius: 30,
          marginVertical: '4%',
        //   marginHorizontal: '3%',
        },
        showLabel: true,
        headerShown: true,
        headerStyle: {
          height: 70,
          backgroundColor: '#F6E6CB',
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      tabBarOptions={{
        ...customTabBarStyle,
        keyboardHidesTabBar: true, // Add this line to hide the tab bar when the keyboard is open
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: '',
          headerTitle: () => (
            <Icon
              name="controller-play"
              color="grey"
              size={40}
              style={{marginLeft: 5}}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{}}>
              <Text>Hussain</Text>
            </TouchableOpacity>
          ),
          //   headerShown:false,
          tabBarIcon: ({color}) => (
            
              <Icon name="controller-play" color="grey" size={25} />
            
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="ProfileScreen"
        options={{
          tabBarLabel: '',
          headerTitle: () => (
            <Icon
              name="controller-play"
              color="grey"
              size={40}
              style={{marginLeft: 5}}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{}}>
              <Text>Hussain</Text>
            </TouchableOpacity>
          ),
          //   headerShown:false,
          tabBarIcon: ({color}) => (
            <Icon
              name="controller-play"
              color="grey"
              size={25}
            />
          ),
        }}
        component={ProfileScreen}
      />
      <Tab.Screen
        name="Name"
        options={{
          tabBarLabel: '',
          headerTitle: () => (
            <Icon
              name="controller-play"
              color="grey"
              size={40}
              style={{marginLeft: 5}}
              
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{}}>
              <Text>Hussain</Text>
            </TouchableOpacity>
          ),
          //   headerShown:false,
          tabBarIcon: ({color}) => (
            <Icon
              name="controller-play"
              color="grey"
              size={25}
            />
          ),
        }}
        component={Name}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
