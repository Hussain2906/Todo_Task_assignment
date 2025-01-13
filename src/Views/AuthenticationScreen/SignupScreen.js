import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {signup} from '../../services/Auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import {ThameFont} from '../../Constants/theme';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const validateName = name => /^[a-zA-Z\s]+$/.test(name);
  // const validateUsername = username => /^[a-zA-Z0-9_]{3,}$/.test(username);
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = password =>
    /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validatePhone = phone => /^[6-9][0-9]{9}$/.test(phone);

  const handleSubmit = async () => {
    // Form validation
    if (!name || !validateName(name)) {
      Alert.alert('Invalid Name', 'Please enter a valid name.');
      return;
    }

    if (!email || !validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!phone || !validatePhone(phone)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
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

    setLoading(true);

    try {
      // Create user data object
      const userData = {
        name,
        email,
        phone,
        address,
      };

      // Call signup function with userData
      await signup(email, password, userData);

      setLoading(false);
      Alert.alert('Success', 'Email verification link sent to your email.');
      navigation.replace('Login');
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setLoading(false);
      console.log('Error during signup:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'center',
        flex: 1,
        padding: 10,
        backgroundColor: '#D8C4B6 ',
      }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <View style={styles.signupContainer}>
            <View style={{marginTop: 50}}>
              <Text
                style={{
                  color: '#213555',
                  fontSize: 30,
                  fontFamily: ThameFont.PrimaryBold,
                }}>
                Welcome !
              </Text>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 20,
                  fontFamily: ThameFont.PrimaryExtraBold,
                  color: '#213555',
                  textAlign: 'center',
                }}>
                Create Account
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: ThameFont.PrimaryBold,
                  color: '#3E5879',
                  margin: '2.5%',
                }}>
                Name
              </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: ThameFont.PrimaryBold,
                  color: '#3E5879',
                  margin: '2.5%',
                }}>
                Email
              </Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: ThameFont.PrimaryBold,
                  color: '#3E5879',
                  margin: '2.5%',
                }}>
                Phone number
              </Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: ThameFont.PrimaryBold,
                  color: '#3E5879',
                  margin: '2.5%',
                }}>
                Address
              </Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: ThameFont.PrimaryBold,
                  color: '#3E5879',
                  margin: '2.5%',
                }}>
                Password
              </Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: ThameFont.PrimaryBold,
                  color: '#3E5879',
                  margin: '2.5%',
                }}>
                Confirm Password
              </Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginHorizontal: '5%',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: '#3E5879',
                    width: '90%',
                    justifyContent: 'center',
                    height: 55,
                    borderColor: 'black',
                    borderWidth: 3,
                    borderRadius: 30,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontFamily: ThameFont.PrimaryBold,
                      color: '#D8C4B6',
                    }}>
                    Signup
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginHorizontal: '5%',
                padding: 10,
              }}>
              <Text style={styles.link}>
                Already a user?{' '}
                <TouchableOpacity
                  style={{height: 21}}
                  onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: ThameFont.PrimarySemiBold,
                      color: '#213555',
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: '#D8C4B6 ',
  },
  inputContainer: {
    marginBottom: 20,
    width: '95%',
  },
  signupContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    width: '100%',
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
    color: '#3E5879',
    textAlign: 'center',
    fontFamily: ThameFont.PrimaryMeduim,
    fontSize: 18,
    padding: 10,
    marginLeft: 10,
  },
});
