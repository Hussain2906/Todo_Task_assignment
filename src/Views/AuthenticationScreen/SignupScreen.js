import React, {useState} from 'react';
import {SafeAreaView, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import { signup } from '../../services/Auth';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateName = name => /^[a-zA-Z\s]+$/.test(name);
  const validateUsername = username => /^[a-zA-Z0-9_]{3,}$/.test(username);
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = password =>
    /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = async () => {
    if (!name || !validateName(name)) {
      Alert.alert('Invalid Name', 'Please enter a valid name.');
      return;
    }

    if (!username || !validateUsername(username)) {
      Alert.alert(
        'Invalid Username',
        'Username must be at least 3 characters long and can contain letters, numbers, and underscores.',
      );
      return;
    }

    if (!email || !validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!password || !validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long and contain at least one special character.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    setLoading(true)
    try {
      await signup(email, password);
      setLoading(false)
      Alert.alert('Success', 'Email verification link sent to your email.');
      navigation.replace('Login');
      setName("")
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      setEmail("")
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ?
      (<ActivityIndicator size="large" color="#0000ff" />)
      :(
        <View>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Sign Up" onPress={handleSubmit} />
      </View>
      <View>
          <Text
            style={styles.link}>
            Already a user? <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{}}><Text>Login</Text></TouchableOpacity>
          </Text>
      </View>
        </View>
      )}
      
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
  },
});
