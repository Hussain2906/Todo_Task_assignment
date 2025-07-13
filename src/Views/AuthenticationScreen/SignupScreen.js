/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, Text, TextInput,
  TouchableOpacity, ActivityIndicator,
  Alert, StyleSheet, View
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { signup } from '../../services/Auth';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = e =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePassword = p =>
    /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/.test(p);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      return Alert.alert('Invalid Email', 'Please enter a valid email.');
    }
    if (!validatePassword(password)) {
      return Alert.alert(
        'Weak Password',
        'Password must be 8+ chars and include a special character.'
      );
    }

    setLoading(true);
    try {
      // create + email‑verify
      await signup(email, password);
      // sign out so root stays on AuthStack
      await auth().signOut();

      Alert.alert(
        'Success',
        'Verification email sent. Please check your inbox.'
      );
      navigation.replace('Login');
      setEmail(''); setPassword('');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Let’s get started!</Text>
          <Text style={styles.subtitle}>
            Sign up to plan your tasks.
          </Text>
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

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <Text style={styles.linkLine}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
              >
                Log in
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
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 32
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8
  },
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
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  linkLine: {
    textAlign: 'center',
    marginTop: 16,
    color: 'rgba(255,255,255,0.8)'
  },
  link: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});
