import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { sendPasswordResetEmail } from '../../services/Auth';

const ForgetPassword = ({navigation}) => {

    const [email, setEmail] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleSubmit = async () => {
        console.log("button clicked");
        
        if (!validateEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
          }
          setLoading(true);
          try { 
            await sendPasswordResetEmail(email);
            setLoading(false);
            Alert.alert('Success', 'Password reset link sent to your email.');
            setEmail('')
            navigation.replace('Login');
          } catch (error) {
            setLoading(false);
            Alert.alert('Error', error.message);
          }
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
        />
        <Button title="Send Reset Email" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  )
}

export default ForgetPassword

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
        textDecorationLine: 'underline',
      },
})