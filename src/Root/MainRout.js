// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

// Import the different stacks
import AuthStack from './AuthStack'; // Ensure these paths are correct
import MainStack from './MainStack';
import AdminStack from './AdminStack';

// MainRout component
const MainRout = () => {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const AdminUid = 'upty9ZVvykMStCrjUGZifHwwHJO2';
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        setIsAdmin(user.uid === AdminUid ); // Replace with actual admin UID
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });
    return unsubscribe;
  }, []);

  if (isLoggedIn === null) {
    return <Text>Loading...</Text>; // You can replace with a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? (isAdmin ? 'AdminStack' : 'MainStack') : 'AuthStack'}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown:false}} />
        <Stack.Screen name="MainStack" component={MainStack} options={{headerShown:false}} />
        <Stack.Screen name="AdminStack" component={AdminStack} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export the MainRout component
export default MainRout;
