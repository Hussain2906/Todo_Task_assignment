import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const DeleteMenu = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await auth().signOut(); // Firebase sign out
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      navigation.replace('AuthStack'); // Redirect to AuthStack after logout
    } catch (error) {
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}

export default DeleteMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})