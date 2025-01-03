import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Views/HomeScreens/HomeScreen';
import ProfileScreen from '../Views/HomeScreens/ProfileScreen';
import Icon from 'react-native-vector-icons/Entypo'
import Name from '../Views/HomeScreens/Name';


const TabNavigation = ({ navigation }) => {

  const Tab = createBottomTabNavigator();
  const customTabBarStyle = {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: { backgroundColor: 'white' },
      labelStyle: {
          fontSize: 12, // Change this to your desired font size
          fontWeight: 'bold', // You can add this line for bold labels if needed
      },
  }
  return (
      <Tab.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown:false,
              tabBarShowLabel: true,
              keyboardHidesTabBar: true,
              tabBarStyle: {
                  height: 70,
                  paddingBottom: 10,
                  paddingTop: 10,
                  backgroundColor: 'blue',
                  borderTopColor: "transparent",
              },
              showLabel: true,
              headerShown: true,
              headerStyle: {
                  height: 60,
                  backgroundColor: 'white',
                  elevation: 0,
                  shadowOpacity: 0,
              },
          }}
          tabBarOptions={{
              ...customTabBarStyle,
              keyboardHidesTabBar: true, // Add this line to hide the tab bar when the keyboard is open
          }}

      >
          <Tab.Screen
              name="HomeScreen"
              options={{
                  tabBarLabel: '',
                  headerTitle:()=>(
                    <Icon name="controller-play" color="grey" size={40} style={{ marginLeft: 5 }}  />
                  ),
                  headerRight:()=>(
                    <TouchableOpacity style={{backgroundColor:'#4682B4'}}>
                        <Text>Hussain</Text>
                    </TouchableOpacity>
                  ),
                //   headerShown:false,
                  tabBarIcon: ({ color }) => (
                      <View
                          style={{
                              position: 'absolute',
                              bottom: 0, // space from bottombar
                              height: 50,
                              width: 50,
                              borderRadius: 68,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'white',
                          }}
                      >
                          <Icon name="controller-play" color="grey" size={40} style={{ marginLeft: 5 }} />
                      </View>
                  )
              }}
              component={HomeScreen} />
              <Tab.Screen
              name="ProfileScreen"
              options={{
                  tabBarLabel: '',
                  headerShown:false,
                  tabBarIcon: ({ color }) => (
                      <Icon name="list" color={color} size={26} />
                  )
              }}
              component={ProfileScreen} />
          <Tab.Screen
              name="Name"
              options={{
                  tabBarLabel: '',
                  headerShown:false,
                  tabBarIcon: ({ color }) => (
                      <Icon name="message" color={color} size={26} />
                  )
              }}
              component={Name} />
         
      </Tab.Navigator>
  );
};
export default TabNavigation;