import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MainStack from '../../Root/MainStack';
import {login} from '../../services/Auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // const HandleLogin = () => {
  //   if(Name === '' || Name === undefined){
  //     Alert.alert("" , "Please Enter You Name")

  //   } else {
  //     HandleLogin()
  //   }
  // }
  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = password => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long and contain at least one special character.',
      );
      return;
    }
    setLoading(true);
    try {
      const {emailVerified} = await login(email, password);
      if (emailVerified) {
        setLoading(false);
        Alert.alert('Success', 'Login Successful');
        navigation.reset({index: 0, routes: [{name: 'MainStack'}]});
        return;
      } else {
        Alert.alert('Error', 'Please verify your email');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
          <View>
            <Text style={styles.link}>
              Not a user?{' '}
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                style={{}}>
                <Text>Signup</Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View>
            <Text style={styles.link}>
              Forgot Password ?{' '}
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}
                style={{}}>
                <Text>Click here</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  link: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
  },
});
