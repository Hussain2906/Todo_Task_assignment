import { SafeAreaView, Button, Alert, StyleSheet, Text } from 'react-native';
import React from 'react'

const Name = () => {
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

export default Name

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