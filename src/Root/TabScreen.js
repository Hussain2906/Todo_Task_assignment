import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Views/HomeScreens/HomeScreen';
import ProfileScreen from '../Views/HomeScreens/DownloadScreen';
import Name from '../Views/HomeScreens/Name';
import images from '../Constants/images';
import Icon, { Icons } from '../Constants/icons';
import DownloadScreen from '../Views/HomeScreens/DownloadScreen';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  
  // Custom tab bar style
  const customTabBarStyle = {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    style: { backgroundColor: 'black' },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold', // Bold labels
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
          backgroundColor: 'white',
          borderTopColor: 'transparent',
          borderRadius: 30,
          marginVertical: '4%',
        },
        headerShown: true,
        headerStyle: {
          height: 80,
          backgroundColor: '#001F3F',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      tabBarOptions={{
        ...customTabBarStyle,
        keyboardHidesTabBar: true, // Hide tab bar when keyboard is open
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: '',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Add logo in title */}
              <Image
                source={images.picLogo} // Adjust the path to your logo
                style={{ width: 50, height: 50, marginLeft: 5 }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarIcon: ({ color }) => (
            // <Icon name="controller-play" color={color} size={25} />
            <Icon type={Icons.Entypo} name={'home'} color={'black'} size={25}/>
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="DownloadScreen"
        options={{
          tabBarLabel: '',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Add logo in title */}
              <Image
                source={images.picLogo} // Adjust the path to your logo
                style={{ width: 50, height: 50, marginLeft: 5 }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="controller-play" color={color} size={25} />
          ),
        }}
        component={DownloadScreen}
      />

      <Tab.Screen
        name="Name"
        options={{
          tabBarLabel: '',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Add logo in title */}
              <Image
                source={images.picLogo
                } // Adjust the path to your logo
                style={{ width: 50, height: 50, marginLeft: 5 }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="controller-play" color={color} size={25} />
          ),
        }}
        component={Name}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
