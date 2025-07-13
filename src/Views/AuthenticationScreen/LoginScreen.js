/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View,
  Text, TextInput, TouchableOpacity,
  ActivityIndicator, Alert, StyleSheet
} from 'react-native';
import { login } from '../../services/Auth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = e =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePassword = p =>
    /^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d@$!%*?&]{8,}$/.test(p);

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      return Alert.alert('Invalid Email', 'Please enter a valid email.');
    }
    if (!validatePassword(password)) {
      return Alert.alert(
        'Invalid Password',
        'Must be ≥8 chars and contain a number.'
      );
    }
    setLoading(true);
    try {
      const { user, emailVerified } = await login(email, password);
      navigation.replace('MainStack'); 
      if (!emailVerified) {
        await auth().signOut();
        Alert.alert('Please verify your email before logging in.');
        return;
      }
      // success: root onAuthStateChanged will detect user and switch to MainStack
      Alert.alert('Login successful!');
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Log in to continue.</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : (
          <>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#DDD"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#DDD"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            <Text style={styles.linkLine}>
              Don't have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Signup')}
              >
                Sign up
              </Text>
            </Text>

            <Text style={styles.linkLine}>
              Forgot password?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('ForgetPassword')}
              >
                Reset here
              </Text>
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#A993FE' },
  container: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  subtitle: { color: 'rgba(255,255,255,0.8)', marginTop: 8 },
  input: {
    backgroundColor: '#F3E5FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    color: '#333'
  },
  button: {
    backgroundColor: '#5D5FEF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  linkLine: { textAlign: 'center', marginTop: 16, color: 'rgba(255,255,255,0.8)' },
  link: { color: '#FFF', fontWeight: 'bold' }
});
