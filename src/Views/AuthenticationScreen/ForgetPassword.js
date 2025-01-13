import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {sendPasswordResetEmail} from '../../services/Auth';
import {ThameFont} from '../../Constants/theme';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleSubmit = async () => {
    console.log('button clicked');

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setLoading(false);
      Alert.alert('Success', 'Password reset link sent to your email.');
      setEmail('');
      navigation.replace('Login');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.forgotPassCon}>
        <Text
          style={{
            color: '#213555',
            fontSize: 30,
            fontFamily: ThameFont.PrimaryBold,
          }}>
          Forgot Password ?
        </Text>
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: ThameFont.PrimaryExtraBold,
              color: '#213555',
            }}>
            Enter Email Below
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
            Email
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection:'column', justifyContent:'space-between', height:100}}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: '#3E5879',
                width: '100%',
                justifyContent: 'center',
                height: 55,
                borderColor: 'black',
                borderWidth: 3 ,
                borderRadius: 30,
                padding: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontFamily: ThameFont.PrimaryBold,
                  color: '#D8C4B6',
                }}>
                Send Reset Password link
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>navigation.replace('Login')}
              style={{
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontFamily: ThameFont.PrimaryBold,
                  color: '#16325B',
                }}>
                Go back to Login
              </Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 30,
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
    textDecorationLine: 'underline',
  },
  forgotPassCon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
