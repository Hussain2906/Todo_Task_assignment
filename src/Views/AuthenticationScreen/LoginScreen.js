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
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {login} from '../../services/Auth';
import {ThameFont} from '../../Constants/theme';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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
        const user = auth().currentUser;

        // Check the user ID and navigate to a specific page based on it
        if (user) {
          const userId = user.uid;
          if (userId === 'upty9ZVvykMStCrjUGZifHwwHJO2') {
            // Navigate to page 1 if the user ID matches
            navigation.reset({index: 0, routes: [{name: 'AdminStack'}]});
          } else {
            // Default navigation if user ID doesn't match
            navigation.reset({index: 0, routes: [{name: 'MainStack'}]});
          }
        }

        setLoading(false);
        Alert.alert('Success', 'Login Successful');
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
        <View style={styles.Logincontainer}>
          <Text style={{color:'#213555', fontSize:30, fontFamily:ThameFont.PrimaryBold}}>Welcome back !</Text>
          <View style={{}}>
            <Text style={{fontSize:20, fontFamily:ThameFont.PrimaryExtraBold, color:'#213555'}}>Login to Continue</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: ThameFont.PrimaryBold,
                color: '#3E5879',
                margin: '3%',
              }}>
              Email
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              fontFamily={ThameFont.PrimaryRegular}
              fontSize={18}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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
              value={password}
              fontFamily={ThameFont.PrimaryRegular}
              fontSize={18}
              onChangeText={setPassword}
              secureTextEntry
              color={'black'}
            />
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                marginHorizontal: '5%',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={handleLogin}
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
                    fontSize: 18,
                    fontFamily: ThameFont.PrimaryBold,
                    color: '#D8C4B6',
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginHorizontal: '5%',
                marginTop: 10,
                padding: 10,
              }}>
              <Text style={styles.link}>
                Not a user?{' '}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Signup')}
                  style={{}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: ThameFont.PrimarySemiBold,
                      color: '#213555',
                    }}>
                    Signup
                  </Text>
                </TouchableOpacity>
              </Text>
              <Text style={styles.link}>
                Forgot Password ?{' '}
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}
                  style={{}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: ThameFont.PrimarySemiBold,
                      color: '#213555',
                    }}>
                    Click here
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
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
    backgroundColor: '#D8C4B6 ',
    // margin:'5%'
  },
  Logincontainer:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',

  },
  inputContainer: {
    width: '80%',
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
  link: {
    color: '#3E5879',
    textAlign: 'center',
    fontFamily: ThameFont.PrimaryMeduim,
    fontSize: 18,
    // marginHorizontal:'15%',
    padding: 10,
    // marginTop: 20,
  },
});
